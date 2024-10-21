export const FETCH_DATA_BEGIN = "FETCH_DATA_BEGIN";
export const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_FAILURE = "FETCH_DATA_FAILURE";

interface FetchDataBegin {
  type: typeof FETCH_DATA_BEGIN;
}

interface FetchDataSuccess {
  type: typeof FETCH_DATA_SUCCESS;
  payload: { data: any[] | null }; // Allow data to be an array or null
}

interface FetchDataFailure {
  type: typeof FETCH_DATA_FAILURE;
  payload: { error: string };
}

export type GeneralActionTypes =
  | FetchDataBegin
  | FetchDataSuccess
  | FetchDataFailure;
