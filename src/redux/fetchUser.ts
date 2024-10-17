import { Dispatch } from "redux";
import {
  fetchUsersBegin,
  fetchUsersSuccess,
  fetchUsersFailure,
} from "./action";
import { UserActionTypes } from "./actionTypes";

const apiURL = process.env.REACT_PUBLIC_API_KEY;

export function fetchUsers() {
  const token = localStorage.getItem("token");

  return (dispatch: Dispatch<UserActionTypes>): Promise<any> => {
    dispatch(fetchUsersBegin());
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
        dispatch(fetchUsersSuccess(json.data));
        return json.data;
      })
      .catch((error: any) => dispatch(fetchUsersFailure(error)));
  };
}

// Helper function for error handling
function handleErrors(response: Response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
