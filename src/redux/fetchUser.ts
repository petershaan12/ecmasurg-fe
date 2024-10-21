import { Dispatch } from "redux";
import { GeneralActionTypes } from "./actionTypes";
import { fetchDataBegin, fetchDataFailure, fetchDataSuccess } from "./action";
import axios from "axios";

const apiURL = process.env.REACT_PUBLIC_API_KEY;

export function fetchUsers() {
  const token = localStorage.getItem("token");

  return async (dispatch: Dispatch<GeneralActionTypes>): Promise<any> => {
    dispatch(fetchDataBegin());
    try {
      const response = await axios.get(`${apiURL}/api/profile`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // Handle errors from the response (e.g., non-200 status codes)
      if (response.status !== 200) {
        const error = response.data;
        if (response.status === 404) {
          // Jika data tidak ditemukan, hapus token dari local storage
          localStorage.removeItem("token");
          dispatch(
            fetchDataFailure(
              new Error("Token invalid atau data tidak ditemukan")
            )
          );
          return; // Hentikan eksekusi lebih lanjut
        }
        throw new Error(error.message || "Failed to fetch data");
      }

      const json = response.data;
      dispatch(fetchDataSuccess(json.data));
      console.log("fetch user done");
      return json.data;
    } catch (error: any) {
      // Handle fetch errors and dispatch the failure action
      dispatch(fetchDataFailure(error));
      throw error; // re-throw if you need to handle it outside
    }
  };
}
