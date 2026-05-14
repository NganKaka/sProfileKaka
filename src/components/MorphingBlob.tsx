import { useEffect, useState } from 'react';

const blobPaths = [
  'M44.6,-77.1C56.5,-69.6,63.5,-54.6,69.5,-40.1C75.5,-25.6,80.5,-11.6,79.5,2C78.5,15.6,71.5,28.7,62.5,40.4C53.5,52.1,42.5,62.4,29.5,69.5C16.5,76.6,1.5,80.5,-13.7,78.6C-28.9,76.7,-44.3,69,-56.4,58.2C-68.5,47.4,-77.3,33.5,-80.5,18.3C-83.7,3.1,-81.3,-13.4,-74.7,-27.6C-68.1,-41.8,-57.3,-53.7,-44.6,-61.3C-31.9,-68.9,-17.3,-72.2,-1.4,-70C14.5,-67.8,29,-60.1,44.6,-77.1Z',
  'M48.4,-73.3C62.6,-66.4,73.5,-52.4,79.4,-36.7C85.3,-21,86.2,-3.6,82.6,12.4C79,28.4,70.9,43,59.4,54.5C47.9,66,33,74.4,17.1,77.7C1.2,81,-15.7,79.2,-30.7,72.7C-45.7,66.2,-58.8,55,-67.5,41.4C-76.2,27.8,-80.5,11.8,-79.4,-3.7C-78.3,-19.2,-71.8,-34.2,-61.3,-44.5C-50.8,-54.8,-36.3,-60.4,-22.1,-66.5C-7.9,-72.6,6,-79.2,21.5,-79.5C37,-79.8,34.2,-80.2,48.4,-73.3Z',
  'M40.2,-66.7C53.6,-59.7,67.4,-52.6,73.7,-41.1C80,-29.6,78.8,-13.7,77.4,2C76,17.7,74.4,33.3,66.5,44.7C58.6,56.1,44.5,63.3,30.4,67.8C16.3,72.3,2.3,74.1,-12.9,72.3C-28.1,70.5,-44.5,65.1,-56.7,54.8C-68.9,44.5,-76.9,29.3,-79.6,13C-82.3,-3.3,-79.7,-20.7,-72.9,-35.6C-66.1,-50.5,-55.1,-62.9,-41.7,-69.5C-28.3,-76.1,-12.5,-76.9,1.7,-79.7C15.9,-82.5,26.8,-73.7,40.2,-66.7Z',
];

interface MorphingBlobProps {
  className?: string;
  color?: string;
  size?: number;
  duration?: number;
}

export default function MorphingBlob({
  className = '',
  color = 'rgba(233, 195, 73, 0.15)',
  size = 400,
  duration = 8,
}: MorphingBlobProps) {
  const [pathIndex, setPathIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPathIndex((prev) => (prev + 1) % blobPaths.length);
    }, duration * 1000);
    return () => clearInterval(interval);
  }, [duration]);

  return (
    <div
      className={`absolute pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        transition: `transform ${duration}s ease-in-out, opacity ${duration}s ease-in-out`,
      }}
    >
      <svg
        viewBox="-100 -100 200 200"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        style={{
          filter: 'blur(40px)',
          transition: `opacity ${duration}s ease-in-out`,
        }}
      >
        <path fill={color} d={blobPaths[pathIndex]} />
      </svg>
    </div>
  );
}
