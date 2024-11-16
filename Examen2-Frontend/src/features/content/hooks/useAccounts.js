import { useState } from "react";
import { getAccountsList } from "../../../shared/actions/accounts/accounts.action";

export const useAccounts = () => {
  const [accounts, setAccounts] = useState({});
  const [account, setAccount] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const loadAccounts = async (searchTerm, page) => {
    setIsLoading(true);
    const result = await getAccountsList(searchTerm, page);
    setAccounts(result);
    setIsLoading(false);
  };

  const createAccount = async (accountData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const result = await createAccount(accountData);
      setAccount(result);
    } catch (error) {
      setError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    // Properties
    accounts,
    account,
    isLoading,
    isSubmitting,
    error,
    // Methods
    loadAccounts,
    createAccount,
  };
};
