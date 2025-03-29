// import "./spinner.css";

// const Spinner = () => (
//   <div className="fallback-spinner">
//     <div className="loading component-loader">
//       <div className="effect-1 effects" />
//       <div className="effect-2 effects" />
//       <div className="effect-3 effects" />
//     </div>
//   </div>
// );
// export default Spinner;
import React from 'react';
import styles from './spinner.module.css';

const Spinner = () => (
  <div className={styles.fallbackspinner}>
    <div className={styles.loading}>
      <div className={styles.effect1} />
      <div className={styles.effect2} />
      <div className={styles.effect3} />
    </div>
  </div>
);

export default Spinner;

