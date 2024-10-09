import React from 'react';
import styles from './toggle.module.css';
import { FaMoon } from "react-icons/fa";
import { IoSunny } from "react-icons/io5";


interface ToggleProps {
  handleModeChange: () => void;
  mode: string;
}

const Toggle: React.FC<ToggleProps> = ({ handleModeChange, mode }) => {
  return (
    <div className={styles.container} onClick={handleModeChange}>
      <div className={mode === 'dark' ? styles.darkIcon : styles.lightIcon}>Dark</div>
      <div className={mode === 'light' ? styles.darkIcon : styles.lightIcon}>Light</div>
      {/* <FaMoon className={styles.icon}/>
      <IoSunny className={styles.icon}/> */}
      <div
        className={styles.ball}
        style={mode === 'light' ? { transform: 'translateX(100%)' } : { transform: 'translateX(0)' }}
      />
    </div>
  );
};

export default Toggle;
