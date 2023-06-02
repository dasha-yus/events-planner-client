import { getPlainValue } from "../../utils/localStorage";

export const URL = process.env.REACT_APP_API_BASE_PATH;

export const setHeaders = () => {
  const headers = {
    headers: {
      "x-auth-token": getPlainValue("token"),
    },
  };

  return headers;
};
