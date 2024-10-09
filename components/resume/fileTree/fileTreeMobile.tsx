"use client";

import { useEffect, useState } from "react";
import File from "./file";
import { files } from "./files";
import styles from "./filetreeMobile.module.css";
import resumeSections from '../../../public/data/resume.json';
import OrbitingCircles from "../../orbitingCircles/orbitingCircles";
import { FaFileDownload } from "react-icons/fa";
import { Modal } from "@mui/material";
import { IoCloseOutline } from "react-icons/io5";

interface ResumeSection {
  subHeader: string;
  company?: string;
  content: string[];
  description?: string[];
}

const FileTreeMobile = () => {
  const [selectedFile, setSelectedFile] = useState<string | null>("README.md");
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  

  const handleClick = (fileName: string) => {
    setOpen(true)
    setSelectedFile(fileName);
  };

  const resumeSection = resumeSections.find(section => section.fileName === selectedFile) as {
    fileName: string;
    header: string;
    sections: ResumeSection[];
  };

  const timeline = selectedFile === "education.tsx" || selectedFile === "workExperience.tsx";
  const skills = selectedFile === "technicalSkills.tsx" || selectedFile === "softwareAndTools.tsx" || selectedFile === "languagesAndSoftSkills.tsx" || selectedFile === "about.tsx";

  console.log(selectedFile)

  return (
    <div className={styles.container}>
      <div className={styles.fileContainer}>
        {files.children?.map((file) => (
          <File
            key={file.name}
            file={file}
            depth={1}
            selectedFile={selectedFile}
            handleClick={handleClick}
            resumeSection={resumeSection}
          />
        ))}
      </div>
      {selectedFile && resumeSection && (
        <Modal
          open={open}
          onClose={handleClose}
          className={styles.modalContainer}
          >
          <div className={styles.selectedFileContainer}>
            <IoCloseOutline className={styles.closeIcon} onClick={handleClose} />
            <div className={styles.header}>
              {resumeSection.header}
            </div>
            <div className={timeline ? styles.contentContainer2 : styles.contentContainer}>
              {selectedFile === "package.json" ? (
                <div className={styles.jsonContent}>
                  {resumeSection.sections?.[0]?.content.join('\n')}
                </div>
              ) : (
                resumeSection.sections?.map((section, index) => (
                  <div key={index} className={skills || timeline ? styles.section2 : styles.section}>
                    <div className={timeline ? styles.subHeaderWithCircle : styles.subHeader}>
                      {section.subHeader}
                    </div>
                    <div className={styles.contentBox}>
                      {section.content.map((line: string, lineIndex: number) => (
                        <div key={lineIndex} className={section.subHeader ? styles.contentLine : ""}>
                          {section.company && <span className={styles.companyName}>{section.company} </span>}
                          {line}
                        </div>
                      ))}
                      {section.description && (
                        <ul className={styles.descriptionList}>
                          {section.description.map((descLine, descIndex) => (
                            <li key={descIndex} className={styles.descriptionItem}>
                              {descLine}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ))
              )}
              {selectedFile === "portrait.jpg" && (
                <img src="/images/pp.png" alt="portrait picture" className={styles.image}/>
              )}
              {selectedFile === "technicalSkills.tsx" && (
                <OrbitingCircles />
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default FileTreeMobile;
