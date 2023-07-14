import clsx from 'clsx'
import { ReactNode } from 'react'

const BUTTON_MAP = {
  primary: 'text-white bg-indigo-600 border border-transparent hover:bg-indigo-700 focus:ring-indigo-500',
  secondary:
    'text-white bg-whiteborder border border-slate-300 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 focus:ring-indigo-500',
  danger: 'text-white bg-red-600 border border-transparent hover:bg-red-700 focus:ring-red-500',
}

const SIZE_MAP: { [key: string]: string } = {
  sm: 'py-1 px-3',
  md: 'py-2 px-4 ',
  lg: 'py-3 px-4',
}

export default function Button({
  children,
  variant = 'primary',
  type = 'button',
  size = 'md',
  onClick,
  className,
}: {
  children: ReactNode
  size?: string
  variant?: 'primary' | 'secondary' | 'danger'
  type?: 'button' | 'submit' | 'reset' | undefined
  onClick?: any
  className?: string
}) {
  return (
    <button
      type={type}
      className={clsx(
        'inline-flex rounded-md shadow-sm text-center justify-center text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2',
        BUTTON_MAP[variant],
        SIZE_MAP[size],
        className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
