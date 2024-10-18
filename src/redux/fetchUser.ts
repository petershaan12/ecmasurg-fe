import { Dispatch } from "redux";
import { GeneralActionTypes } from "./actionTypes";
import { fetchDataBegin, fetchDataFailure, fetchDataSuccess } from "./action";

const apiURL = process.env.REACT_PUBLIC_API_KEY;

export function fetchUsers() {
  const token = localStorage.getItem("token");

  return (dispatch: Dispatch<GeneralActionTypes>): Promise<any> => {
    dispatch(fetchDataBegin());
    return fetch(`${apiURL}/api/profile/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(handleErrors)
      .then((res) => res.json())
      .then((json) => {
        dispatch(fetchDataSuccess(json.data));
        return json.data;
      })
      .catch((error: any) => dispatch(fetchDataFailure(error)));
  };
}

// Helper function for error handling
function handleErrors(response: Response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
