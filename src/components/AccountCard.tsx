import { Link } from "react-router-dom"
import AccountActionsMenu from "../components/AccountActionsMenu"
import Badge from "../components/ui/Badge"
import Blockies from "react-blockies"

export default function AccountCard({ account }: any) {
  return (
    <li key={account.id} className="rounded-xl border border-gray-200">
      <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
        <Blockies className="rounded-lg ring-1 ring-gray-900/10" seed={account.address} size={12} />
        <Link to={`/accounts/${account.address}`} className="text-sm font-medium leading-6 text-indigo-500 truncate">
          {account.name?.slice(0, 5)}...{account.name?.slice(37, 42)}
        </Link>
        {account.type === "custodial" && <Badge>{account.type}</Badge>}
        <AccountActionsMenu account={account} />
      </div>
      <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
        <div className="flex justify-between gap-x-4 py-3">
          <dt className="text-gray-500">Balance</dt>
          <dd className="text-gray-700">
            {account.address && account?.balance ? Number(account?.balance).toFixed(4) : 0}
          </dd>
        </div>
        <div className="flex justify-between gap-x-4 py-3">
          <dt className="text-gray-500">Type</dt>
          <dd className="flex items-start gap-x-2">{account.type}</dd>
        </div>
      </dl>
    </li>
  )
}
