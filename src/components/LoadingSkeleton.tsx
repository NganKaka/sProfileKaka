import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
}

function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <motion.div
      className={`rounded-lg dark:bg-white/5 light:bg-black/10 ${className}`}
      animate={{
        opacity: [0.5, 0.8, 0.5],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

export function ProjectCardSkeleton() {
  return (
    <div className="group relative rounded-2xl border dark:border-white/10 light:border-black/10 dark:bg-white/5 light:bg-black/5 backdrop-blur-sm p-6 overflow-hidden">
      <Skeleton className="w-full h-48 mb-4" />
      <Skeleton className="h-6 w-3/4 mb-3" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-5/6 mb-4" />
      <div className="flex gap-2 mb-4">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-6 w-16" />
      </div>
      <Skeleton className="h-10 w-32" />
    </div>
  );
}

export function ExperienceCardSkeleton() {
  return (
    <div className="relative pl-8 pb-12">
      <div className="absolute left-0 top-2 w-4 h-4 rounded-full dark:bg-white/10 light:bg-black/20" />
      <Skeleton className="h-5 w-32 mb-2" />
      <Skeleton className="h-6 w-2/3 mb-2" />
      <Skeleton className="h-4 w-1/2 mb-4" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-5/6" />
    </div>
  );
}

export function AcademicCardSkeleton() {
  return (
    <div className="relative rounded-xl border dark:border-white/10 light:border-black/10 dark:bg-white/5 light:bg-black/5 backdrop-blur-sm p-6">
      <Skeleton className="h-5 w-24 mb-3" />
      <Skeleton className="h-6 w-3/4 mb-2" />
      <Skeleton className="h-4 w-1/2 mb-4" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-5/6 mb-4" />
      <div className="grid grid-cols-3 gap-2">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    </div>
  );
}

export function TimelineSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-8">
      {Array.from({ length: count }).map((_, i) => (
        <ExperienceCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function ProjectGridSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProjectCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function AcademicTimelineSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="space-y-6">
      {Array.from({ length: count }).map((_, i) => (
        <AcademicCardSkeleton key={i} />
      ))}
    </div>
  );
}
