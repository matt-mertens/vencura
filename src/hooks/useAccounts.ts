import { useDynamicContext } from "@dynamic-labs/sdk-react"
import axios from "axios"
import { useCallback, useEffect, useState } from "react"

export const useAccounts = (): any => {
  const { authToken, user } = useDynamicContext()
  const [custodialAccounts, setCustodialAccounts] = useState<{ [key: string]: any }>({})
  const [nonCustodialAccounts, setNonCustodialAccounts] = useState<{ [key: string]: any }>({})

  const accounts = [...Object.values(nonCustodialAccounts), ...Object.values(custodialAccounts)]

  const fetchAccountBalance = useCallback(
    async (accountAddress: string) => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_BASE_API}/accounts/${accountAddress}`, {
          headers: { Authorization: `Bearer ${authToken}` },
        })
        return data
      } catch (e) {
        console.error(e)
      }
    },
    [authToken]
  )

  useEffect(() => {
    const connectedAccounts = user?.verifiedCredentials.filter(({ address }) => typeof address === "string")
    if (connectedAccounts?.length) {
      let accounts: { [key: string]: any } = {}
      Promise.all(
        connectedAccounts.map(async ({ address }) => {
          if (address) {
          const { balance } = await fetchAccountBalance(address)
            accounts[address.toLowerCase()] = {
              id: address,
              address: address?.toLowerCase(),
              name: address,
              balance,
              type: "non-custodial",
            }
          }
        })
      ).then(() => setNonCustodialAccounts(accounts))
    }
  }, [fetchAccountBalance, user?.verifiedCredentials])

  const createAccount = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_API}/accounts`,
        {},
        { headers: { Authorization: `Bearer ${authToken}` } }
      )

      const { balance } = await fetchAccountBalance(data.address)
      const newAccount = {
        id: data.id,
        address: data.address?.toLowerCase(),
        name: data.address,
        balance,
        type: "custodial",
      }
      const accounts = { [data.address]: newAccount, ...custodialAccounts }
      setCustodialAccounts(accounts)
    } catch (e) {
      console.error(e)
    }
  }

  const fetchAccounts = useCallback(async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_BASE_API}/accounts`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      let accounts: { [key: string]: any } = {}
      await Promise.all(
        data.map(async (acct: { address: string; id: string }) => {
          const { balance } = await fetchAccountBalance(acct.address)
          accounts[acct.address.toLowerCase()] = {
            id: acct.id,
            address: acct.address?.toLowerCase(),
            name: acct.address,
            balance,
            type: "custodial",
          }
        })
      )
      setCustodialAccounts(accounts)
      return accounts
    } catch (e) {
      console.error(e)
    }
  }, [authToken, fetchAccountBalance])

  const deleteAccount = async (accountAddress: string) => {
    try {
      const { data } = await axios.delete(`${process.env.REACT_APP_BASE_API}/accounts/${accountAddress}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      fetchAccounts()
      return data
    } catch (e) {
      console.error(e)
    }
  }

  const signMessage = async (accountAddress: string, message: string) => {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BASE_API}/accounts/${accountAddress}/signMessage`,
      { message },
      {
        headers: { Authorization: `Bearer ${authToken}` },
      }
    )
    return data
  }

  const sendTransaction = async (accountAddress: string, toAddress: string, amount: number) => {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BASE_API}/accounts/${accountAddress}/sendTransaction`,
      { toAddress, amount },
      {
        headers: { Authorization: `Bearer ${authToken}` },
      }
    )
    return data
  }

  useEffect(() => {
    fetchAccounts()
  }, [fetchAccounts])

  return { accounts, custodialAccounts, nonCustodialAccounts, createAccount, fetchAccountBalance, deleteAccount, signMessage, sendTransaction }
}
