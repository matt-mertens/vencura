import Avatar from "./ui/Avatar"
import { Menu, Transition } from "@headlessui/react"
import { Fragment } from "react"
import Button from "./ui/Button"
import { useDynamicContext } from "@dynamic-labs/sdk-react"

export default function AccountDropdown() {
  const { user, handleLogOut } = useDynamicContext()

  const handleSignout = async () => {
    handleLogOut()
  }

  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex items-center w-full justify-center text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 space-x-2">
            <Avatar size="md" text={user?.email || user?.alias || user?.userId || ""} />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-bottom-right divide-y divide-slate-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                <div className="flex space-x-2 text-sm p-2">
                  <Avatar size="sm" text={user?.email || user?.alias || user?.userId || ""} />
                  <div className="flex flex-col text-left justify-start">
                    <div>{user?.userId}</div>
                    <div className="text-slate-500 dark:text-slate-300">{user?.email}</div>
                  </div>
                </div>
              </Menu.Item>
            </div>
            <div className="px-2 py-2">
              <Menu.Item>
                <Button className="w-full" onClick={handleSignout}>
                  Sign out
                </Button>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  )
}
