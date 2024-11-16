import { useState } from "react";
import { getJournalsList, createJournal } from "../../../shared/actions/journals/journals.action";

export const useJournals = () => {
  const [journals, setJournals] = useState({});
  const [journal, setJournal] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const loadJournals = async (searchTerm, page) => {
    setIsLoading(true);
    const result = await getJournalsList(searchTerm, page);
    setJournals(result);
    setIsLoading(false);
  };

  const createJournals = async (journalData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const result = await createJournal(journalData);
      setJournal(result);
    } catch (error) {
      setError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    // Properties
    journals,
    journal,
    isLoading,
    isSubmitting,
    error,
    // Methods
    loadJournals,
    createJournals,
  };
};
