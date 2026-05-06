import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Skeleton = ({ className, ...props }) => {
  return (
    <div
      className={twMerge("animate-pulse rounded-md bg-slate-200", className)}
      {...props}
    />
  );
};

export const CardSkeleton = () => (
  <div className="card space-y-4">
    <Skeleton className="h-8 w-3/4" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-5/6" />
    <div className="flex space-x-2 pt-2">
      <Skeleton className="h-10 w-24 rounded-xl" />
      <Skeleton className="h-10 w-24 rounded-xl" />
    </div>
  </div>
);

export const PortfolioSkeleton = () => (
  <div className="max-w-4xl mx-auto py-12 px-6 space-y-12">
    <div className="text-center space-y-4">
      <Skeleton className="h-12 w-48 mx-auto rounded-xl" />
      <Skeleton className="h-6 w-96 mx-auto rounded-lg" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </div>
  </div>
);
