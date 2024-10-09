import React, { Suspense } from 'react';
import styles from "./spline.module.css"

const Spline = React.lazy(() => import('@splinetool/react-spline'));

export default function SplineScene() {
  return (
    // <Spline scene="https://prod.spline.design/9nxhJkCellODUkIn/scene.splinecode" />
    // <div className={styles.container}>
      // <Suspense fallback={<div>Loading...</div>}>
      <Suspense>
        <Spline scene="https://prod.spline.design/bI6wGt069uMkN3el/scene.splinecode" />
      </Suspense>
    // </div>
  );
}

