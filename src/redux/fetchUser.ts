import { Dispatch } from "redux";
import { GeneralActionTypes } from "./actionTypes";
import { fetchDataBegin, fetchDataFailure, fetchDataSuccess } from "./action";

const apiURL = process.env.REACT_PUBLIC_API_KEY;


export function fetchUsers() {
  const token = localStorage.getItem("token");

  return async (dispatch: Dispatch<GeneralActionTypes>): Promise<any> => {
    dispatch(fetchDataBegin());
    console.log("Fetching user data... Loading set to true");

    try {
      const response = await fetch(`${apiURL}/api/profile/me`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // Handle errors from the response (e.g., non-200 status codes)
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to fetch data");
      }

      const json = await response.json();
      dispatch(fetchDataSuccess(json.data));
      console.log("Data fetched successfully. Loading set to false");
      return json.data;
    } catch (error: any) {
      // Handle fetch errors and dispatch the failure action
      dispatch(fetchDataFailure(error));
      console.error("Error fetching user data:", error);
      console.log("Loading set to false due to error");
      throw error; // re-throw if you need to handle it outside
    }
  };
}
