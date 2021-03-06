import axios from "axios";
import * as actions from "../api";
import { getJwt } from "../../services/authService";

const api = ({ dispatch }) => (next) => async (action) => {
  if (action.type !== actions.apiCallBegan.type) return next(action);

  const { url, method, data, onStart, onSuccess, onError } = action.payload;

  if (onStart) dispatch({ type: onStart });
  next(action);

  try {
    axios.defaults.headers.common["Authorization"] = getJwt();

    const response = await axios.request({
      baseURL: process.env.REACT_APP_API,
      url,
      method,
      data,
    });
    //general
    dispatch(actions.apiCallSuccess(response.data));
    //specific
    if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
  } catch (error) {
    //general
    dispatch(actions.apiCallFailed(error.message));
    //specific
    if (onError) dispatch({ type: onError, payload: error.message });
  }
};

export default api;
