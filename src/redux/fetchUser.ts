import { Dispatch } from "redux";
import { GeneralActionTypes } from "./actionTypes";
import { fetchDataBegin, fetchDataFailure, fetchDataSuccess } from "./action";
import axios from "axios";
import Cookies from "js-cookie";

const apiURL = process.env.REACT_PUBLIC_API_KEY;

export function fetchUsers() {
  return async (dispatch: Dispatch<GeneralActionTypes>): Promise<any> => {
    dispatch(fetchDataBegin());
    try {
      const response = await axios.get(`${apiURL}/api/profile`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });

      if (response.status !== 200) {
        const error = response.data;
        throw new Error(error.message || "Failed to fetch data");
      }

      const json = response.data;
      dispatch(fetchDataSuccess(json.data));
      return json.data;
    } catch (error: any) {
      dispatch(fetchDataFailure(error));
      throw error; // re-throw if you need to handle it outside
    }
  };
}
