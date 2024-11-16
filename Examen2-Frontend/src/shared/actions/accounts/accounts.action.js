import { journalsApi } from "../../../config/api";

export const getAccountsList = async (searchTerm = "", page = 1) => {
  try {
    const { data } = await journalsApi.get(
      `/accounts?searchTerm=${searchTerm}&page=${page}`
    );
    return data;
  } catch (error) {
    console.error(error);
    return error.response;
  }
};

export const createAccount = async (accountData) => {
  try {
    const { data } = await journalsApi.post(`/accounts`, accountData);
    return data;
  } catch (error) {
    console.error(error);
    return error.response;
  }
};