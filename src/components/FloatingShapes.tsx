import { motion } from 'framer-motion';

interface FloatingShapesProps {
  count?: number;
  colors?: string[];
}

export default function FloatingShapes({
  count = 6,
  colors = ['rgba(233, 195, 73, 0.1)', 'rgba(34, 211, 238, 0.08)', 'rgba(168, 85, 247, 0.06)'],
}: FloatingShapesProps) {
  const shapes = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 100 + 50,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 15,
    color: colors[i % colors.length],
    type: i % 3, // 0: circle, 1: square, 2: triangle
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            width: shape.size,
            height: shape.size,
          }}
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -40, 20, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {shape.type === 0 && (
            <div
              className="w-full h-full rounded-full blur-2xl"
              style={{ backgroundColor: shape.color }}
            />
          )}
          {shape.type === 1 && (
            <div
              className="w-full h-full rounded-2xl blur-2xl"
              style={{ backgroundColor: shape.color }}
            />
          )}
          {shape.type === 2 && (
            <div
              className="w-full h-full blur-2xl"
              style={{
                backgroundColor: shape.color,
                clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}
