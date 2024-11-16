import { journalsApi } from "../../../config/api";

export const getJournalsList = async (searchTerm = "", page = 1) => {
  try {
    const { data } = await journalsApi.get(`/journal_entries?searchTerm=${searchTerm}&page=${page}`);
    return data;
  } catch (error) {
    console.error(error);
    return error.response;
  }
};

export const createJournal = async (journalData) => {
  try {
    const { data } = await journalsApi.post(`/journal_entries`, journalData);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
