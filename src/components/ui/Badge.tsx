import { ReactElement, ReactNode } from "react";

export default function Badge({ children }: { children: ReactElement | ReactNode | string }) {
  return <div className="px-2 py-1 bg-indigo-100 rounded-lg text-sm text-indigo-700">{children}</div>
}
