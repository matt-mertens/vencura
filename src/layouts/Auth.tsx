import { ReactElement } from "react"

export default function Main({ children }: { children: ReactElement }) {
  return <div className="h-full dark:bg-gray-900">{children}</div>
}
