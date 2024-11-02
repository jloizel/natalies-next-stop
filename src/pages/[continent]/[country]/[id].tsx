"use client"

import React, { useEffect, useRef, useState } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { getPostById, getAllPosts, getCommentsByPostId, addComment, deleteComment } from '@/app/API';
import { ParsedUrlQuery } from 'querystring';
import styles from './blog.module.css';
import { IoShareSocialOutline } from "react-icons/io5";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import ShareMenu from '@/components/shareMenu/shareMenu';
import { FaRegComment } from "react-icons/fa";
import Link from 'next/link';

interface IContentBlock {
  type: 'text' | 'image' | 'subheader' | 'list';
  content: string;
  subContent?: string[];
  images?: string[];
  imageCaption: string;
  nestedBlocks?: INestedContentBlock[];
}

interface INestedContentBlock extends IContentBlock {
  nestedNestedBlocks?: INestedContentBlock[]; // Include nestedNestedBlocks here
}

interface ISubsection {
  header: string;
  text: string;
  images: string[];
  imageCaption: string;
  contentBlocks: INestedContentBlock[];
}

interface IPost {
  _id: string;
  countryImage: string;
  title: string;
  desc: string;
  introText: string;
  introImage: string;
  introImageLink: string;
  introImageCaption: string;
  previewImage: string;
  subsections: ISubsection[];
  continent: string;
  country: string;
  createdAt: string;
  updatedAt: string;
}

interface BlogPostProps {
  post: IPost | null;
}

interface Params extends ParsedUrlQuery {
  country: string;
  id: string;
}

interface IComment {
  _id: string;
  postId: string;
  name: string;
  content: string;
  createdAt: string;
}

const BlogPost: React.FC<BlogPostProps> = ({ post }) => {  
  const [showShareMenu, setShowShareMenu] = useState<string | null>(null);
  const shareMenuRef = useRef<HTMLDivElement>(null);
  const [comments, setComments] = useState<IComment[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const [commenterName, setCommenterName] = useState<string>('');
  const [disablebutton, setDisableButton] = useState(true)

  const { data: session, status } = useSession();
  const router = useRouter();

  // if (typeof document !== 'undefined') {
  //   return null;
  // }

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const handleClickOutside = (event: MouseEvent) => {
        if (shareMenuRef.current && !shareMenuRef.current.contains(event.target as Node)) {
          setShowShareMenu(null); 
        }
      };
  
      // Attach the event listener
      document.addEventListener('mousedown', handleClickOutside);
  
      return () => {
        // Clean up the event listener on component unmount
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [shareMenuRef]);

  useEffect(() => {
    const fetchComments = async () => {
      if (post) {
        const fetchedComments = await getCommentsByPostId(post._id);
        setComments(fetchedComments);
      }
    };

    fetchComments();
  }, [post]);

  useEffect(() => {
    setDisableButton(newComment.trim() === '');
  }, [newComment]);

  if (!post) {
    return <div>Post not found.</div>;
  }

  const renderIntroText = (introText: string | undefined) => {
    if (!introText) return null;
  
    return introText.split(/\n+/).map((line, index) => (
      <p key={index} className={styles.introText}>
        {line.trim()}
      </p>
    ));
  };

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const renderSubsectionImages = (images: string[], imageCaption: string) => {
    return (
      <div className={styles.subsectionImagesContainer}>
        <div className={styles.subsectionImages}>  {/* Removed layoutClass for testing */}
          {images.map((imageUrl, index) => (
            <div key={index} className={styles.imageContainer}>
              <img 
                src={imageUrl.trim()} 
                alt={`Subsection Image ${index + 1}`} 
                className={styles.subsectionImage} 
              />
            </div>
          ))}
        </div>
        {imageCaption && (
          <div className={styles.imageCaption}>{imageCaption}</div>
        )}
      </div>
    );
  };
  
  const renderTextContent = (content: string | undefined) => {
    if (!content) return null;
  
    return content.split(/",\s*"/).map((text, index) => (
      <div
        key={index}
        className={styles.contentText}
        suppressHydrationWarning={true}
        dangerouslySetInnerHTML={{ __html: text.trim().replace(/^"|"$/g, '') }}
      />
    ));
  }

  const renderListContent = (listText: string | undefined, listType: 'block' | 'nestedBlock' | 'nestedNestedBlock') => {
    if (!listText) return null;
  
    // Split the text into individual list items by the period followed by a newline or other delimiter.
    const listItems = listText.split(/<\/p><p>/g).map(item => item.trim().replace(/^"|"$/g, ''));
  
    // Determine the class based on the listType
    let listClass = '';
    if (listType === 'block') listClass = styles.contentList;
    if (listType === 'nestedBlock') listClass = styles.nestedContentList;
    if (listType === 'nestedNestedBlock') listClass = styles.nestedNestedContentList;
  
    return (
      <ul className={listClass}>
        {listItems.map((item, index) => (
          <li
            key={index}
            className={styles.listItem}
            dangerouslySetInnerHTML={{ __html: item }}  // Safely render the HTML
          />
        ))}
      </ul>
    );
  }; 
  
  const renderListBlock = (block: INestedContentBlock) => {
    return (
      <div className={styles.contentList}>
        {block.subContent && block.subContent.length > 0 && block.subContent.map((item, idx) => (
          <span key={idx} className={styles.listItem}>
            {renderListContent(item, 'block')}
          </span>
        ))}
      </div>
    );
  };

  const renderNestedListBlock = (block: INestedContentBlock) => {
    return (
      <div className={styles.nestedContentList}>
        {block.subContent && block.subContent.length > 0 && block.subContent.map((item, idx) => (
          <span key={idx} className={styles.nestedListItem}>
            {renderListContent(item, 'nestedBlock')}
          </span>
        ))}
      </div>
    );
  };
  
  const renderNestedNestedListBlock = (block: INestedContentBlock) => {
    return (
      <div className={styles.nestedNestedContentList}>
        {block.subContent && block.subContent.length > 0 && block.subContent.map((item, idx) => (
          <span key={idx} className={styles.nestedNestedListItem}>
            {renderListContent(item, 'nestedNestedBlock')} 
          </span>
        ))}
      </div>
    );
  };

  const renderContentBlock = (block: INestedContentBlock) => {
    return (
      <div className={styles.contentBlock}>
        {block.type === 'text' && renderTextContent(block.content)}
        {block.type === 'image' && block.images && renderSubsectionImages(block.images, block.imageCaption)}
        {block.type === 'subheader' && <h2 className={styles.contentSubheader}>{block.content}</h2>}
        {block.type === 'list' && renderListBlock(block)}
  
        {/* Nested blocks */}
        {block.nestedBlocks && block.nestedBlocks.length > 0 && (
          <div className={styles.nestedBlocks}>
            {block.nestedBlocks.map((nestedBlock, idx) => (
              <div key={idx} className={styles.contentBlock}>
                {nestedBlock.type === 'list' && renderNestedListBlock(nestedBlock)}
                {/* {nestedBlock.type === 'image' && block.images && renderSubsectionImages(nestedBlock.images, block.imageCaption)} */}
                {nestedBlock.type === 'subheader' && <h2 className={styles.contentSubheader}>{nestedBlock.content}</h2>}
                {nestedBlock.type === 'text' && renderTextContent(nestedBlock.content)}
                
                {/* Now we handle nestedNestedBlocks correctly */}
                {nestedBlock.nestedNestedBlocks && nestedBlock.nestedNestedBlocks.length > 0 && (
                  <div className={styles.nestedNestedBlocks}>
                    {nestedBlock.nestedNestedBlocks.map((nestedNestedBlock, nestedNestedIdx) => (
                      <div key={nestedNestedIdx} className={styles.contentBlock}>
                        {nestedNestedBlock.type === 'list' && renderNestedNestedListBlock(nestedNestedBlock)}
                        {nestedNestedBlock.type === 'subheader' && <h2 className={styles.contentSubheader}>{nestedNestedBlock.content}</h2>}
                        {nestedNestedBlock.type === 'text' && renderTextContent(nestedNestedBlock.content)}
                    </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
  

  const renderNestedContentBlocks = (blocks: INestedContentBlock[]) => {
    return blocks.map((block, blockIndex) => (
      <div key={blockIndex} className={styles.contentBlock}>
        {renderContentBlock(block)}
      </div>
    ));
  };

  const formatCreatedAt = (createdAt: string) => {
    const date = new Date(createdAt);
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  const calculateReadingTime = (text: string) => {
    const wordsPerMinute = 200;
    const wordCount = text.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return minutes;
  };

  const getFullText = () => {
    let text = post.introText || '';
    post.subsections.forEach(subsection => {
      text += ' ' + subsection.text;
      subsection.contentBlocks.forEach(block => {
        if (block.type === 'text' && block.content) {
          text += ' ' + block.content;
        }
      });
    });
    return text;
  };

  const fullText = getFullText();
  const readingTime = calculateReadingTime(fullText); 

  const handleShare = async (postId: string, postTitle: string) => {
    try {
      // Use native sharing on supported mobile devices
      if (navigator.share && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        await navigator.share({
          title: postTitle,
          text: `Check out this blog post: ${postTitle}`,
          url: window.location.href,
        });
      } else {
        // Toggle custom share menu
        setShowShareMenu((prev) => (prev === postId ? null : postId));
      }
    } catch (error) {
      // console.error('Error sharing:', error);
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/admin/dashboard/edit/${id}`);
  };

  
  const formatForURL = (string: string) => string.toLowerCase().replace(/\s+/g, '');

  

  const handleCommentSubmit = async () => {
    if (newComment.trim() === '') return; 

    try {
      const commentData = await addComment(post._id, commenterName, newComment);
      setComments((prev) => [...prev, commentData]); 
      setNewComment('');
      setCommenterName('');
    } catch (error) {
      // console.error('Error adding comment:', error);
    }
  };

  const handleCommentDelete = async (commentId: string) => {
    try {
      const response = await deleteComment(commentId);
      setComments(comments.filter(comment => comment._id !== commentId));
    } catch (error) {
      // console.error('Failed to delete comment:', error);
    }
  };

  const handleClearInputs = () => {
    setNewComment('');
    setCommenterName('');
  };

  
  const renderComments = () => {
    return (
      <div className={styles.commentsContainer}>
        {comments.length === 0 ? (
          ''
        ) : (
          comments.map((comment) => (
            <div key={comment._id} className={styles.comment}>
              <FaRegComment className={styles.icon}/>
              <div className={styles.commentContent}>
                <div className={styles.commentInfo}>
                  <span className={styles.commenter}>{comment.name}</span>
                  <span className={styles.commentDate}>{formatCreatedAt(comment.createdAt)}</span>
                </div>
              <span>{comment.content}</span>
              </div>
              {status === 'authenticated' && session && (
                <button onClick={() => handleCommentDelete(comment._id)} className={styles.deleteCommentButton}>
                  X
                </button>
              )}
            </div>
          ))
        )}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.topInfo}>
        <Link href={`/${formatForURL(post.continent)}`} className={styles.link}>
          {post.continent}
        </Link>
        <Link href={`/${formatForURL(post.continent)}/${formatForURL(post.country)}`} className={styles.link}>
          {post.country}
        </Link>
      </div>
      <div className={styles.blogPost}>
        <div className={styles.blogDetails}>
          <div className={styles.blogDetailsLeft}>
            <span>{formatCreatedAt(post.createdAt)}</span>
            <span>•</span>
            <span>{readingTime} min read</span>
          </div>
          <div className={styles.shareButtonContainer}>
            {status === 'authenticated' && session && (
              <button onClick={() => handleEdit(post._id)} className={styles.editButton}>
                Edit
              </button>
            )}
            <button onClick={() => handleShare(post._id, post.title)} className={styles.shareButton}>
              <IoShareSocialOutline/>
            </button>
            {showShareMenu === post._id && (
              <ShareMenu
                postTitle={post.title}
                showShareMenu={showShareMenu === post._id}
                toggleShareMenu={() => setShowShareMenu(null)}
              />
            )}
          </div>
        </div>
        <div className={styles.title}>
          {post.title}
        </div>
        <div className={styles.updated}>
          Updated: {formatCreatedAt(post.updatedAt)}
        </div>
        {renderIntroText(post.introText)}
        <a href={post.introImageLink} target='_blank'>
          <img src={encodeURI(post.introImage)} alt={post.title} className={styles.introImage} />
        </a>
        <div className={styles.introImageCaption}>
          {post.introImageCaption}
        </div>
        <div className={styles.navigator}>
          <div className={styles.navigatorHeader}>Click to jump to a section</div>
          <div className={styles.navigationButtons}>
            {post.subsections.map((subsection, index) => (
              <div key={index} className={styles.navigationButton}>
                <span onClick={() => handleScrollTo(`subsection-${index}`)}>{subsection.header}</span>
                {index < post.subsections.length - 1 && <span className={styles.bullet}> • </span>}
              </div>
            ))}
          </div>
        </div>
        {post.subsections.map((subsection, index) => (
          <div key={index} className={styles.subsection} id={`subsection-${index}`}>
            <div className={styles.subsectionHeader}>
              {subsection.header}
            </div>
            {renderTextContent(subsection.text)} 
            <div className={styles.subsectionImages}>
              {renderSubsectionImages(subsection.images, subsection.imageCaption)} 
            </div>
            <span>{subsection.imageCaption}</span>
            <div className={styles.contentBlocks}>
              {renderNestedContentBlocks(subsection.contentBlocks)}
            </div>
          </div>
        ))}
        <div className={styles.blogBottom}> 
          <Link href={`/${formatForURL(post.continent)}/${formatForURL(post.country)}`} className={styles.link}>
            {post.country}
          </Link>
          <div className={styles.shareButtonContainer}>
            {status === 'authenticated' && session && (
              <button onClick={() => handleEdit(post._id)} className={styles.editButton}>
                Edit
              </button>
            )}
            <button onClick={() => handleShare(post._id, post.title)} className={styles.shareButton}>
              <IoShareSocialOutline/>
            </button>
            {showShareMenu === post._id && (
              <ShareMenu
                postTitle={post.title}
                showShareMenu={showShareMenu === post._id}
                toggleShareMenu={() => setShowShareMenu(null)}
              />
            )}
            </div>
          </div>
        </div>
      
      <div className={styles.commentSection}>
        <div className={styles.commentHeader}>Comments</div>
        <div className={styles.commentInputsContainer}>
          <textarea
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className={styles.commentInput}
          />
          <input
            type="text"
            placeholder="Your name"
            value={commenterName}
            onChange={(e) => setCommenterName(e.target.value)}
            className={styles.nameInput}
          />
        </div>
        <div className={styles.commentbuttonsContainer}>
          <button onClick={handleClearInputs} className={styles.commentClearButton}>
            Clear
          </button>
          <button onClick={handleCommentSubmit} className={`${styles.commentSubmitButton} ${disablebutton ? styles.disabled : ''}`} disabled={disablebutton}>
            Submit
          </button>
        </div>
        {renderComments()}
      </div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPosts();

  const paths = posts
    .filter((post) => post.continent && post.country) 
    .map((post) => ({
      params: {
        continent: post.continent,
        country: post.country,
        id: post._id.toString(),
      },
    }));

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as Params;
  const post = await getPostById(id);

  if (!post) {
    return { notFound: true };
  }

  return {
    props: { post },
    revalidate: 10,
  };
};

export default BlogPost;
