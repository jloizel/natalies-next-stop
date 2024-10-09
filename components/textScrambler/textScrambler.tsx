"use client"

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import styles from "./textScrambler.module.css"

interface TextScramblerProps {
    phrases: string[];
    scrambleDuration?: number;
    displayDuration?: number;
}

const TextScrambler: React.FC<TextScramblerProps> = ({ phrases, scrambleDuration = 2, displayDuration = 2 }) => {
  const [count, setCount] = useState(0);
  const [scrambledText, setScrambledText] = useState('');
  const textRef = useRef<HTMLDivElement>(null);
  const chars = '!<>-_\\/[]{}—=+*^?#________';

  useEffect(() => {
      const scrambleIt = () => {
          const newText = phrases[count];
          const oldText = textRef.current?.innerText || '';
          const length = Math.max(oldText.length, newText.length);
          const queue: Array<{ from: string; to: string; start: number; end: number; char?: string }> = [];

          for (let i = 0; i < length; i++) {
              const from = oldText[i] || '';
              const to = newText[i] || '';
              const start = Math.floor(Math.random() * 40);
              const end = start + Math.floor(Math.random() * 40);
              queue.push({ from, to, start, end });
          }

          const update = (frame: number) => {
              let output = '';
              let complete = 0;

              for (let i = 0, n = queue.length; i < n; i++) {
                  let { from, to, start, end, char } = queue[i];

                  if (frame >= end) {
                      complete++;
                      output += to;
                  } else if (frame >= start) {
                      if (!char || Math.random() < 0.28) {
                          char = chars[Math.floor(Math.random() * chars.length)];
                          queue[i].char = char;
                      }
                      const colorClass = i % 2 === 0 ? styles.scrambleColor1 : styles.scrambleColor2;
                      output += `<span class="${styles.scramble} ${colorClass}">${char}</span>`;

                  } else {
                      output += from;
                  }
              }

              setScrambledText(output);

              if (complete === queue.length) {
                  cancelAnimationFrame(frameRef.current!);
              } else {
                  frameRef.current = requestAnimationFrame(() => update(frame + 1));
              }
          };

          cancelAnimationFrame(frameRef.current!);
          frameRef.current = requestAnimationFrame(() => update(0));

          gsap.to(textRef.current, {
              duration: scrambleDuration,
              onComplete: () => {
                  setScrambledText(newText);
                  setTimeout(() => {
                      setCount((prevCount) => (prevCount + 1) % phrases.length);
                  }, displayDuration * 1000);
              }
          });
      };

      scrambleIt();
  }, [count, phrases, scrambleDuration, displayDuration]);

  const frameRef = useRef<number>();

  return (
      <div className={styles.textContainer}>
          <div ref={textRef} dangerouslySetInnerHTML={{ __html: scrambledText }}></div>
      </div>
  );
};

export default TextScrambler;
