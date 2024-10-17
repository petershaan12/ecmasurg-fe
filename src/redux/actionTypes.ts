export const FETCH_USERS_BEGIN = "FETCH_USERS_BEGIN";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

// Define action type interfaces
export interface FetchUsersBeginAction {
  type: typeof FETCH_USERS_BEGIN;
}

export interface FetchUsersSuccessAction {
  type: typeof FETCH_USERS_SUCCESS;
  payload: { users: any[] }; // Adjust this type based on your user data structure
}

export interface FetchUsersFailureAction {
  type: typeof FETCH_USERS_FAILURE;
  payload: { error: string };
}

// Union type for actions
export type UserActionTypes =
  | FetchUsersBeginAction
  | FetchUsersSuccessAction
  | FetchUsersFailureAction;
