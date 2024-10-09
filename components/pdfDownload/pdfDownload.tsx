import React from 'react'
import styles from "./pdfDownload.module.css"
import { FaFileDownload } from "react-icons/fa";

const PDFDownload = () => {
  return (
    <div className={styles.downloadContainer}>
      <a href="/resume.pdf" download className={styles.downloadButton}>
        <FaFileDownload /> Download Résumé
      </a>
    </div>
    
  )
}

export default PDFDownload