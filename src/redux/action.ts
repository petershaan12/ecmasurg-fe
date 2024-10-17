// action.ts

import {
  FETCH_USERS_BEGIN,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  UserActionTypes,
} from "./actionTypes";

export const fetchUsersBegin = (): UserActionTypes => ({
  type: FETCH_USERS_BEGIN,
});

export const fetchUsersSuccess = (users: any[]): UserActionTypes => ({
  type: FETCH_USERS_SUCCESS,
  payload: { users },
});

export const fetchUsersFailure = (error: string): UserActionTypes => ({
  type: FETCH_USERS_FAILURE,
  payload: { error },
});
