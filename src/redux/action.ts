import {
  FETCH_DATA_BEGIN,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
  GeneralActionTypes,
} from "./actionTypes";

export const fetchDataBegin = (): GeneralActionTypes => ({
  type: FETCH_DATA_BEGIN,
});

export const fetchDataSuccess = (data: any[] | null): GeneralActionTypes => ({
  type: FETCH_DATA_SUCCESS,
  payload: { data },
});

export const fetchDataFailure = (error: string): GeneralActionTypes => ({
  type: FETCH_DATA_FAILURE,
  payload: { error },
});
