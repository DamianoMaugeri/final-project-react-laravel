

import React, { useRef } from 'react';
import HouseCard from '../HouseCard/HouseCard';
import styles from './CardCarousel.module.css';
import { Link } from 'react-router-dom';

export default function CardCarousel({ content }) {
  const carouselRef = useRef(null);

  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 250 + 16;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className={styles.carouselWrapper}>
      {/* Bottoni visibili solo su desktop */}
      <button
        onClick={() => scroll('left')}
        className={`${styles.navButton} ${styles.leftButton}`}
        aria-label="Scroll Left"
      >
        ‹
      </button>

      <button
        onClick={() => scroll('right')}
        className={`${styles.navButton} ${styles.rightButton}`}
        aria-label="Scroll Right"
      >
        ›
      </button>

      <div ref={carouselRef} className={styles.carouselContainer}>
        {content.map((item, index) => (
          <div key={index} className= {styles.carouselItem}>
            
                 <Link className="text-decoration-none text-dark" to={`/${item.id}`} >
                                <HouseCard content={item} />
                            </Link>
            
          </div>
        ))}
      </div>
    </div>
  );
}