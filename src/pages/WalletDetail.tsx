import { useParams } from "react-router-dom"
import AccountActionsMenu from "../components/AccountActionsMenu"
import { useAccounts } from "../hooks/useAccounts"
import { useState } from "react"
import ActivityList from "../components/ActivityList"

export default function WalletDetail() {
  const { accountAddress } = useParams()
  const { accounts, signMessage, sendTransaction } = useAccounts()
  const [message, setMessage] = useState<string | undefined>(undefined)
  const [toAddress, setToAddress] = useState<string | undefined>(undefined)
  const [amount, setAmount] = useState<string | undefined>(undefined)
  const [currentSignedMessage, setCurrentSignedMessage] = useState<{ [key: string]: any } | undefined>(undefined)
  const [transactionRespose, setTransactionResponse] = useState<any>(undefined)

  const account = accounts.find((a: any) => a?.address?.toLowerCase() === accountAddress?.toLowerCase())

  const handleSignMessage = async () => {
    const data = await signMessage(accountAddress, message)
    setCurrentSignedMessage(data)
  }

  const handleSendTransaction = async () => {
    if (toAddress && amount) {
      const data = await sendTransaction(accountAddress, toAddress, amount)
      setTransactionResponse(data)
    }
  }  

  return (
    <>
      <div className="relative isolate overflow-hidden pt-16 min-h-screen">
        {/* Secondary navigation */}
        <header className="pb-4 pt-6 sm:pb-6 flex justify-between px-4 sm:flex-nowrap sm:px-6 lg:px-8">
          <div className="flex max-w-7xl flex-wrap items-center gap-6 ">
            <h1 className="text-base font-semibold leading-7 text-gray-900">
              {accountAddress?.slice(0, 5)}...{accountAddress?.slice(37, 42)}
            </h1>
          </div>
          {account && <AccountActionsMenu account={account} />}
        </header>
        <div className="lg:col-start-3 lg:row-end-1">
          <h2 className="sr-only">Summary</h2>
          <div className="rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5 pb-20">
            <dl className="flex flex-wrap">
              <div className="flex-auto pl-6 pt-6">
                <dt className="text-sm font-semibold leading-6 text-gray-900">Balance</dt>
                <dd className="mt-1 text-base font-semibold leading-6 text-gray-900">{account?.balance}</dd>
              </div>
              <div className="flex-none self-end px-6 pt-4">
                <dt className="sr-only">Status</dt>
                <dd className="rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-600 ring-1 ring-inset ring-green-600/20">
                  {account?.type}
                </dd>
              </div>
            </dl>
            <div className="px-6 py-3 max-w-lg">
              <div className="sm:flex sm:items-start">
                <div className="mt-2 w-full">
                  <textarea
                    rows={4}
                    name="comment"
                    id="comment"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                    onClick={(e) => e.preventDefault()}
                    onChange={(e) => {
                      e.preventDefault()
                      setMessage(e.target.value)
                    }}
                  />
                </div>
              </div>

              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                  onClick={handleSignMessage}
                >
                  Sign message
                </button>
              </div>
            </div>
            <div className="flex space-between px-6 py-3 min-h-full">
              <div className="mt-6 border-t border-gray-900/5 pt-6 sm:pr-4">
                <dt className="font-semibold text-gray-900">Message</dt>
                <dd className="mt-2 text-gray-500">{currentSignedMessage?.message}</dd>
              </div>
              <div className="mt-8 sm:mt-6 sm:border-t sm:border-gray-900/5 sm:pl-4 sm:pt-6">
                <dt className="font-semibold text-gray-900">signedMessage</dt>
                <dd className="mt-2 text-gray-500">{currentSignedMessage?.signedMessage}</dd>
              </div>
            </div>
            <div className="mt-2 max-w-lg px-6 py-3">
              <label htmlFor="toAddress" className="block text-sm font-medium leading-6 text-gray-900">
                To Address
              </label>
              <div className="mt-2">
                <input
                  name="toAddress"
                  id="toAddress"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="To address"
                  value={toAddress}
                  onChange={(e) => setToAddress(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-2 max-w-lg px-6 py-3">
              <label htmlFor="amount" className="block text-sm font-medium leading-6 text-gray-900">
                Amount
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="amount"
                  id="amount"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="0.0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-end mt-4 max-w-lg pb-10 px-6">
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                onClick={handleSendTransaction}
              >
                Send transaction
              </button>
            </div>
            {transactionRespose ? (
              <a
                href={`https://goerli.etherscan.io/tx/${transactionRespose.transactionHash}`}
                target="_blank"
                rel="noreferrer"
                className="px-3"
              >
                {`https://goerli.etherscan.io/tx/${transactionRespose.transactionHash}`}{" "}
              </a>
            ) : null}
          </div>
          <div className="mt-3 px-6 pb-20">
            <div className="text-xl">Activity</div>
            {accountAddress && <ActivityList accountAddress={accountAddress} />}
          </div>
        </div>
      </div>
    </>
  )
}
