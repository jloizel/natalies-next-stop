import Link from 'next/link';
// import NavBar from '../../components/navbar/navbar'
import styles from "./europe.module.css"

const blogPosts = [
  { title: 'Exploring Paris', slug: 'exploring-paris' },
  { title: 'Backpacking through Spain', slug: 'backpacking-through-spain' }
];

const Europe = () => {
  return (
    <div className={styles.page}>
      <div className={styles.headerImageContainer}>
        <img className={styles.headerImage} src="/images/europe.jpg"/>
        <div className={styles.headerContainer}>
          <div className={styles.header}>
            <span>EUROPE</span>
            <span>TRAVEL BLOGS</span>
          </div>
        </div>
      </div>
      <ul>
        {blogPosts.map((post) => (
          <li key={post.slug}>
            <Link href={`/europe/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
      <div>
        Coming soon...
      </div>
    </div>
  );
};

export default Europe;
