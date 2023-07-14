import clsx from 'clsx'

export default function Skeleton({ className }: { className?: string }) {
  return <div className={clsx('animate-pulse bg-slate-300 dark:bg-slate-600 rounded-md', className)} />
}
