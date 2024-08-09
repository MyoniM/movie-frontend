import React from 'react';

import Lottie from 'lottie-react';

import loader from '../assets/loader.json';

export default function Loading({ height }: { height?: string }) {
  return <Lottie style={{ height: `${height || 200}px` }} animationData={loader} loop={true} />;
}
