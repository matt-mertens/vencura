import clsx from 'clsx'
import Skeleton from './Skeleton'

const SIZE_MAP: { [key: string]: string } = {
  sm: 'h-6 w-6',
  md: 'h-8 w-8',
  lg: 'h-10 w-10',
  xl: 'h-12 w-12',
  '2xl': 'h-16 w-16',
  '3xl': 'h-20 w-20',
}

const getHashOfString = (str: string) => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  hash = Math.abs(hash)
  return hash
}

const normalizeHash = (hash: number, min: number, max: number) => {
  return Math.floor((hash % (max - min)) + min)
}

const generateHSL = (name: string, saturationRange: any[], lightnessRange: any[]) => {
  const hash = getHashOfString(name)
  const h = normalizeHash(hash, 0, 360)
  const s = normalizeHash(hash, saturationRange[0], saturationRange[1])
  const l = normalizeHash(hash, lightnessRange[0], lightnessRange[1])
  return { h, s, l }
}

function hslToHex(h: number, s: number, l: number) {
  l /= 100
  const a = (s * Math.min(l, 1 - l)) / 100
  const f = (n: number) => {
    const k = (n + h / 30) % 12
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0') // convert to Hex and prefix "0" if needed
  }
  return `#${f(0)}${f(8)}${f(4)}`
}

const generateColorHex = (id: string, saturationRange: number[], lightnessRange: number[]) => {
  const { h, s, l } = generateHSL(id, saturationRange, lightnessRange)
  return hslToHex(h, s, l)
}

export default function Avatar({
  text,
  imageUrl,
  title,
  subtitle,
  size = 'md',
  variant = 'circle',
  isLoading = false,
}: {
  text: string | undefined
  title?: string
  subtitle?: string
  imageUrl?: string
  size?: string
  variant?: 'circle' | 'square'
  isLoading?: boolean
}) {
  const initials = text?.charAt(0)?.toUpperCase()
  const color = text ? generateColorHex(text, [45, 65], [45, 65]) : '#f1f5f9'

  const classes = clsx(
    'inline-flex whitespace-nowrap shrink-0 items-center justify-center bg-slate-100',
    SIZE_MAP[size],
    { 'rounded-full': variant === 'circle' },
    { 'rounded-lg': variant === 'square' },
  )

  if (isLoading) {
    return (
      <Skeleton
        className={clsx(
          `${SIZE_MAP[size]}`,
          { '!rounded-full': variant === 'circle' },
          { '!rounded-lg': variant === 'square' },
        )}
      />
    )
  }

  return (
    <div className="flex items-center flex-shrink-0">
      {imageUrl ? (
        <img src={imageUrl} alt={text} className={classes} referrerPolicy="no-referrer" />
      ) : (
        <span className={classes} style={{ backgroundColor: color }}>
          <span className="text-xs font-medium leading-none text-white">{initials}</span>
        </span>
      )}
      {title && (
        <div className={clsx('ml-3 space-y-1', { '!ml-2': size === 'sm' })}>
          <p className="text-sm font-medium text-slate-700 group-hover:text-slate-900 dark:text-slate-200 dark:group-hover:text-slate-50">
            {title}
          </p>
          <p className="text-sm font-medium text-slate-500 group-hover:text-slate-700 dark:text-slate-400 dark:group-hover:text-slate-200">
            {subtitle}
          </p>
        </div>
      )}
    </div>
  )
}
