import React from 'react';

const Spinner = ({ height, width, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={width}
      height={height}
      viewBox="0 0 100 100"
      style={{ margin: 'auto', background: 'none', display: 'block', shapeRendering: 'auto', animationPlayState: 'running', animationDelay: '0s' }}
    >
      <circle
        cx="50"
        cy="50"
        fill="none"
        stroke={color}
        strokeWidth="10"
        r="35"
        strokeDasharray="164.93361431346415 56.97787143782138"
        style={{ animationPlayState: 'running', animationDelay: '0s' }}
      >
        <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1" style={{ animationPlayState: 'running', animationDelay: '0s' }} />
      </circle>
    </svg>
  );
};

export default Spinner;
