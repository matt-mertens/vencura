import {
  PlusSmallIcon,
} from "@heroicons/react/20/solid"
import Blockies from "react-blockies"
import Button from "../components/ui/Button"
import Badge from "../components/ui/Badge"
import { useAccounts } from "../hooks/useAccounts"
import { Link } from "react-router-dom"
import AccountActionsMenu from "../components/AccountActionsMenu"

export default function Home() {
  const { accounts, createAccount } = useAccounts()

  return (
    <>
      <div className="relative isolate overflow-hidden pt-16">
        {/* Secondary navigation */}
        <header className="pb-4 pt-6 sm:pb-6">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-6 px-4 sm:flex-nowrap sm:px-6 lg:px-8">
            <h1 className="text-base font-semibold leading-7 text-gray-900">Home</h1>
            <Button
              onClick={createAccount}
              className="ml-auto flex items-center gap-x-1 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <PlusSmallIcon className="-ml-1.5 h-5 w-5" aria-hidden="true" />
              New Wallet
            </Button>
          </div>
        </header>

        <div
          className="absolute left-0 top-full -z-10 mt-96 origin-top-left translate-y-40 -rotate-90 transform-gpu opacity-20 blur-3xl sm:left-1/2 sm:-ml-96 sm:-mt-10 sm:translate-y-0 sm:rotate-0 sm:transform-gpu sm:opacity-50"
          aria-hidden="true"
        >
          <div
            className="aspect-[1154/678] w-[72.125rem] bg-gradient-to-br from-[#FF80B5] to-[#9089FC]"
            style={{
              clipPath:
                "polygon(100% 38.5%, 82.6% 100%, 60.2% 37.7%, 52.4% 32.1%, 47.5% 41.8%, 45.2% 65.6%, 27.5% 23.4%, 0.1% 35.3%, 17.9% 0%, 27.7% 23.4%, 76.2% 2.5%, 74.2% 56%, 100% 38.5%)",
            }}
          />
        </div>
      </div>

      <div className="space-y-16 py-16 xl:space-y-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold leading-7 text-gray-900">Wallets</h2>
              <a href="#" className="text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                View all<span className="sr-only">wallets</span>
              </a>
            </div>
            <ul role="list" className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
              {accounts.map((account: any) => (
                <li key={account.id} className="rounded-xl border border-gray-200">
                  <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                    <Blockies className="rounded-lg ring-1 ring-gray-900/10" seed={account.address} size={12} />
                    <Link to={`/accounts/${account.address}`} className="text-sm font-medium leading-6 text-gray-900 truncate">
                      {account.name?.slice(0, 5)}...{account.name?.slice(37, 42)}
                    </Link>
                    {account.type === "custodial" && <Badge>{account.type}</Badge>}
                    <AccountActionsMenu account={account} />
                  </div>
                  <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
                    <div className="flex justify-between gap-x-4 py-3">
                      <dt className="text-gray-500">Balance</dt>
                      <dd className="text-gray-700">
                        {account.address && account?.balance
                          ? Number(account?.balance).toFixed(4)
                          : 0}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-x-4 py-3">
                      <dt className="text-gray-500">Type</dt>
                      <dd className="flex items-start gap-x-2">{account.type}</dd>
                    </div>
                  </dl>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
