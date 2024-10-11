"use client" /* dashboard is client side component */

import React, { useEffect, useState } from 'react'
import styles from './page.module.css'
import useSWR from 'swr'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export const Dashboard = () => {

  // Old way to fetch data
  // const [data, setData] = useState([]);
  // const [error, setErr] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   const getData = async () => {
  //     setIsLoading(true)
  //     const res = await fetch("https://jsonplaceholder.typicode.com/posts/", { 
  //       cache: "no-store", 
  //     });
  //     if (!res.ok) {
  //       setErr(true) ;
  //     }
      
  //     const data = await res.json();

  //     setData(data);
  //     setIsLoading(false);
  //   };
  //   getData();
  // }, []);
  
  // New way to fetch data below

  const session = useSession();

  const router = useRouter()

  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, mutate, error, isLoading } = useSWR(`/api/posts?username=${session?.data?.user?.name}`, fetcher); //this will fetch the user's personal posts

  if (session.status === "loading") {
    return <p>Loading...</p>;
  }

  if (session.status === "unauthenticated") {
    router?.push("/dashboard/login") //if not logged in, clicking on dashboard will redirect to login page
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); //prevents from refreshing the page
    const title = e.target[0].value;
    const desc = e.target[1].value;
    const img = e.target[2].value;
    const content = e.target[3].value;

    try {
      await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({
          title,
          desc,
          img,
          content,
          username: session.data.user.name,
        })
      });
      mutate()
    } catch (err) {
      console.log(err)
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });
      mutate();
      e.target.reset();
    } catch (err) {

    }
  }

  if (session.status === "authenticated") { //if the person is logged in, dashboard is accessible
    return (
      <div className={styles.container}>
        <div className={styles.posts}>
          {isLoading 
            ? "loading" 
            : data?.map((post) => (
                <div className={styles.post} key={post._id}>
                  <div className={styles.imgContainer}>
                    <Image src={post.img} alt="" width={200} height={100}/>
                  </div>
                  <h2 className={styles.postTitle}>{post.title}</h2>
                  <span 
                    className={styles.delete} 
                    onClick={() => handleDelete(post._id)}
                  >
                    X
                  </span>
                </div>
              ))}
        </div>
          <form className={styles.new} onSubmit={handleSubmit}>
            <h1>Add New Post</h1>
            <input type="text" placeholder="Title" className={styles.input} />
            <input type="text" placeholder="Desc" className={styles.input} />
            <input type="text" placeholder="Image" className={styles.input} />
            <textarea 
              placeholder="Content" 
              className={styles.textArea}
              cols="30"
              rows="10"
            ></textarea>
            <button className={styles.button}>Send</button>
          </form>
      </div>
    )
  }

}

export default Dashboard