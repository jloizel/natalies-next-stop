import React from 'react'
import styles from "./search.module.css"
import { IoSearch } from "react-icons/io5";

const Search = () => {
  return (
    <div>
      <IoSearch className={styles.searchIcon}/>
    </div>
  )
}

export default Search