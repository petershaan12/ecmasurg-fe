export const FETCH_DATA_BEGIN = "FETCH_DATA_BEGIN";
export const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_FAILURE = "FETCH_DATA_FAILURE";

interface FetchDataBegin {
  type: typeof FETCH_DATA_BEGIN;
}

interface FetchDataSuccess<T> {
  type: typeof FETCH_DATA_SUCCESS;
  payload: T;
}

interface FetchDataFailure {
  type: typeof FETCH_DATA_FAILURE;
  payload: { error: string };
}

export type GeneralActionTypes<T = any> =
  | FetchDataBegin
  | FetchDataSuccess<T>
  | FetchDataFailure;
