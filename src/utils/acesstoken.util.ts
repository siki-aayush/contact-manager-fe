import axios from "axios";
import {
  addUserLoginToLocalStorage,
  getUserIdFromLocalStorage,
  getUserTokensFromLocalStorage,
} from "./localstorage.util";

export const refreshAccessToken = async () => {
  const { refreshToken } = getUserTokensFromLocalStorage();
  const id = getUserIdFromLocalStorage();

  try {
    const res = await axios.post("/refresh", { refreshToken, id });
    if (res.data) {
      const data = res.data.data;
      addUserLoginToLocalStorage(
        "true",
        data.accessToken,
        data.refreshToken,
        data.user.id
      );
    }
  } catch (error) {
    console.log(error);
  }
};
