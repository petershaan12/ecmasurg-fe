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

      if (response.status !== 200) {
        const error = response.data;
        if (response.status === 404) {
          localStorage.removeItem("token");
          dispatch(fetchDataFailure("Token invalid atau data tidak ditemukan"));
          return;
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
