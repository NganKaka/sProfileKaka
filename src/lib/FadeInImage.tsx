import { useEffect, useState } from 'react';

export type FadeInImageProps = {
  src: string;
  alt: string;
  className: string;
  loading?: 'eager' | 'lazy';
  decoding?: 'sync' | 'async' | 'auto';
  fetchPriority?: 'high' | 'low' | 'auto';
};

export default function FadeInImage({ src, alt, className, loading = 'lazy', decoding = 'async', fetchPriority }: FadeInImageProps) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
  }, [src]);

  return (
    <span
      className="block h-full w-full overflow-hidden"
      style={{
        clipPath: loaded ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)',
        transition: 'clip-path 900ms cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      <img
        key={src}
        src={src}
        alt={alt}
        className={className}
        loading={loading}
        decoding={decoding}
        fetchPriority={fetchPriority}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
      />
    </span>
  );
}
