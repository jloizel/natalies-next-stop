import { FC, useState } from "react";
import { TFiles } from "./files";
import styles from "./filetree.module.css";
import { FaRegFolder } from "react-icons/fa";
import { LuFolderOpen } from "react-icons/lu";

type FileProps = {
  file: TFiles;
  depth: number;
  isExpanded?: boolean;
  selectedFile: string | null;
  handleClick: (fileName: string) => void;
  resumeSection: any;
}

const File: FC<FileProps> = ({ file, depth, isExpanded = false, selectedFile, handleClick, resumeSection }) => {
  const [localIsExpanded, setLocalIsExpanded] = useState<boolean>(isExpanded);

  const handleLocalClick = () => {
    handleClick(file.name);
    setLocalIsExpanded(prev => !prev);
  };

  return (
    <>
      <button onClick={handleLocalClick} className={styles.file}>
        {file.children && (
          <div className={styles.fileIcon}>
            {localIsExpanded ? <LuFolderOpen /> : <FaRegFolder />}
          </div>
        )}
        <span
          className={`${styles.fileName} ${selectedFile === file.name && resumeSection ? styles.fileSelected : ""}`}
          style={{ paddingLeft: file.children ? "" : "20px" }}
        >
          {file.name}
          {selectedFile === file.name && resumeSection && (
            <div className={styles.horizontalLine}></div>
          )}
        </span>
        {/* {selectedFile === "education" && resumeSection?.sections && (
            <div className={styles.verticalLine}>
              {resumeSection.sections.map((_:any, index:any) => (
                <div
                  key={index}
                  className={styles.circle}
                  style={{ top: `${index * 500 + 40}px` }}
                />
              ))}
            </div>
          )} */}
      </button>
      <div className={styles.subFileContainer}>
        {localIsExpanded && (
          <div className={styles.subFile}>
            {file.children?.map((childFile) => (
              <File
                key={childFile.name}
                file={childFile}
                depth={depth + 1}
                isExpanded={isExpanded}
                selectedFile={selectedFile}
                handleClick={handleClick}
                resumeSection={resumeSection}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default File;
