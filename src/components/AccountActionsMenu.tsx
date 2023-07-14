import { Menu, Transition } from "@headlessui/react"
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid"
import copy from "copy-to-clipboard"
import { Fragment } from "react"
import Button from "./ui/Button"
import { useAccounts } from "../hooks/useAccounts"

export default function AccountActionsMenu({ account }: any) {
  const { deleteAccount, fetchAccountBalance } = useAccounts()
  return (
    <Menu as="div" className="relative ml-auto">
      <Menu.Button className="-m-2.5 block p-2.5 text-gray-400 hover:text-gray-500">
        <span className="sr-only">Open options</span>
        <EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true" />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-0.5 w-52 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
          <Menu.Item>
            <div
              className="block px-3 py-1 text-sm leading-6 text-gray-900 cursor-pointer"
              onClick={() => copy(account.address)}
            >
              Copy address
            </div>
          </Menu.Item>
          <Menu.Item>
            <div
              className="block px-3 py-1 text-sm leading-6 text-gray-900 cursor-pointer"
              onClick={() => fetchAccountBalance(account.address)}
            >
              Refresh Balance
            </div>
          </Menu.Item>
          {account.type === "custodial" && (
            <Menu.Item>
              <Button className="mx-3 mt-2" variant="danger" size="sm" onClick={() => deleteAccount(account.id)}>
                Delete Account
              </Button>
            </Menu.Item>
          )}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
