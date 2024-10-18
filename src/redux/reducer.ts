import {
  FETCH_DATA_BEGIN,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
} from "./actionTypes";

// Definisikan initialState yang lebih umum
const initialState = {
  data: null,
  loading: false,
  error: null,
};

// General reducer untuk menangani berbagai jenis data
export default function generalReducer(state = initialState, action: any) {
  switch (action.type) {
    case FETCH_DATA_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload, // Simpan payload yang lebih umum
      };

    case FETCH_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error, // Pastikan untuk mengakses error dengan benar
        data: null, // Reset data jika ada error
      };

    default:
      return state;
  }
}
