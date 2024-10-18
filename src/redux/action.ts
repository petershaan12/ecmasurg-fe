// generalActions.ts

import {
  FETCH_DATA_BEGIN,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
  GeneralActionTypes,
} from "./actionTypes";

export const fetchDataBegin = (): GeneralActionTypes<any> => ({
  type: FETCH_DATA_BEGIN,
});

export const fetchDataSuccess = <T>(data: T): GeneralActionTypes<T> => ({
  type: FETCH_DATA_SUCCESS,
  payload: data,
});

export const fetchDataFailure = (error: string): GeneralActionTypes<any> => ({
  type: FETCH_DATA_FAILURE,
  payload: { error },
});
