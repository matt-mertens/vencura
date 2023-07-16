import { PlusSmallIcon } from "@heroicons/react/20/solid"
import Button from "../components/ui/Button"
import { useAccounts } from "../hooks/useAccounts"
import AccountCard from "../components/AccountCard"

export default function Wallets() {
  const { accounts, createAccount } = useAccounts()

  return (
    <>
      <div className="relative isolate overflow-hidden pt-16">
        {/* Secondary navigation */}
        <header className="pb-4 pt-6 sm:pb-6">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-6 px-4 sm:flex-nowrap sm:px-6 lg:px-8">
            <h1 className="text-xl font-semibold leading-7 text-gray-900">Wallets</h1>
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
            <ul role="list" className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
              {accounts.map((account: any) => (
                <AccountCard account={account} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
