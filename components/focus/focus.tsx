"use client"

import React, { useEffect, useState } from 'react';
import styles from "./focus.module.css"
import { HiOutlineComputerDesktop } from "react-icons/hi2";
import { FaReact } from "react-icons/fa";
import { HiOutlineServerStack } from "react-icons/hi2";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import { createTheme, useMediaQuery } from '@mui/material';
import { IoIosArrowForward } from 'react-icons/io';
import Slide from '../scrollAnimations/slide';
import Bounce from '../scrollAnimations/bounce';

interface CustomCSSProperties extends React.CSSProperties {
  '--underline-color'?: string;
}

const Focus: React.FC = () => {
  const [data, setData] = useState([
    {
      id: "",
      icon: "",
      header: "",
      subheader: "",
      content: "",
      color: ""
    },
  ]);

  const getData=()=>{
    fetch('/data/focusItems.json',{
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    )
      .then(function(response){
        return response.json();
      })
      .then(function(myJson) {
        setData(myJson)
      });
    }

  useEffect(()=>{
    getData()
  },[])

  const iconComponents: { [key: string]: React.ElementType } = {
    FaReact: FaReact,
    HiOutlineServerStack: HiOutlineServerStack,
  };

  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 768,
        md: 1024,
        lg: 1200,
        xl: 1536,
      },
    },
  });

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const customButtonStyles = {
    color: 'red',
    background: '#6F6B71',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
  };

  return (
    <div className={styles.focusContainer} id="focus">
      <div className={styles.headerContainer}>
        <div className={styles.header}>
          <Slide>
            {/* <IoIosArrowForward className={styles.icon}/> */}
            Areas of Focus
            <span className={styles.cursor}/>
          </Slide>
        </div>
        {!isMobile && (<div className={styles.line}/>)}
      </div>
      {isMobile ? (
        <div className={styles.swiperContainer}>
          <Swiper
            slidesPerView={1}
            centeredSlides={true}
            initialSlide={0}
            spaceBetween={32}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className={styles.swiper}
            speed={800}
          >
            {data.map((item, index) => {
              const IconComponent = iconComponents[item.icon];
              if (!IconComponent) {
                return null;
              }
              return (
              <SwiperSlide key={item.id || index} className={styles.swiperSlide}>
                <div className={styles.focus}>
                  <div className={styles.focusHeader}>
                    <IconComponent className={styles.icon} />
                    <span>
                      <div className={styles.underline} style={{ '--underline-color': item.color } as CustomCSSProperties}>
                        {item.header}
                      </div>
                      {item.subheader}
                    </span>
                  </div>
                  <div className={styles.focusContent}>
                    <pre>&lt;body&gt;</pre>
                    <Slide>
                      <div className={styles.focusContentText}>
                        {item.content}
                      </div>
                    </Slide>
                    <pre>&lt;/body&gt;</pre>
                  </div>
                </div>
              </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
      ) : (
        <Bounce>
        <div className={styles.box}>
          {data.map((item, index) => {
              const IconComponent = iconComponents[item.icon];
              if (!IconComponent) {
                return null;
              }
              return (
                <div key={item.id || index} className={styles.focus}>
                  <div className={styles.focusHeader}>
                    <IconComponent className={styles.icon} />
                    <span>
                      <div className={styles.underline} style={{ '--underline-color': item.color } as CustomCSSProperties}>{item.header}
                      </div>
                      {item.subheader}
                    </span>
                  </div>
                  <div className={styles.focusContent}>
                    <pre>&lt;body&gt;</pre>
                      <div className={styles.focusContentText}>
                        {item.content}
                      </div>
                    <pre>&lt;/body&gt;</pre>
                  </div>
                </div>
              )
            })}
        </div>
        </Bounce>
      )}
    </div>
  );
}

export default Focus;
