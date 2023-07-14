import { useEffect, useState } from "react"
import axios from "axios"

const statuses = {
  Confirmed: "text-green-700 bg-green-50 ring-green-600/20",
  "In progress": "text-gray-600 bg-gray-50 ring-gray-500/10",
  Pending: "text-yellow-800 bg-yellow-50 ring-yellow-600/20",
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

export default function ActivityList({ accountAddress }: { accountAddress: string }) {
  const [activity, setActivity] = useState<any>(undefined)

  useEffect(() => {
    axios
      .get(
        `https://api-goerli.etherscan.io/api?module=account&action=txlist&address=${accountAddress}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=98M2XSQPDZTGEI27Y2PPT8W1AW315RMPUY`
      )
      .then(({ data }) => setActivity(data.result))
  }, [accountAddress])

  return (
    <ul role="list" className="divide-y divide-gray-100">
      {activity?.map((tx: any) => (
        <li key={tx.hash} className="flex items-center justify-between gap-x-6 py-5">
          <div className="min-w-0">
            <div className="flex items-start gap-x-3">
              <p className="text-sm font-semibold leading-6 text-gray-900">{tx.hash}</p>
              <p
                className={classNames(
                  statuses[tx.confirmations !== "0" ? "Confirmed" : "Pending"],
                  "rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset"
                )}
              >
                {tx.confirmations !== "0" ? "Confirmed" : "Pending"}
              </p>
            </div>
            <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
              <p className="whitespace-nowrap">Timestamp {new Date(Number(tx.timeStamp) * 1000).toUTCString()}</p>
              <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                <circle cx={1} cy={1} r={1} />
              </svg>
              <p className="truncate">Block Number {tx.blockNumber}</p>
            </div>
          </div>
          <div className="flex flex-none items-center gap-x-4">
            <a
              href={`https://goerli.etherscan.io/tx/${tx.hash}`}
              target="_blank"
              rel="noreferrer"
              className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
            >
              View tx
            </a>
          </div>
        </li>
      ))}
    </ul>
  )
}
