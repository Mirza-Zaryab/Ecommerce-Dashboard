/**
 * AUTHOR: MUGHEES ABBAS
 * ALL THE API CALLS FUNCTIONS
 * getRequest, postRequest, patchRequest, putRequest, deleteRequest
 * payload: BODY THAT WILL SEND IN REQUEST
 * route and baseurl:
    * IF YOU WANT TO SEND YOUR OWN REQUEST WITH YOUR OWN URL LIKE https://anyurl.com THEN SET baseurl TO FALSE AND route to your own URL. 
    * IF baseurl SET TO TRUE THEN IT WILL USE YOUR APP BASE_URL AND THE ROUTE WILL THE API.
 * onSuccess and onError 
    *  THESE FUNCTIONS WILL HANDLE THE ERRORS AND SUCCESS, 
    *  IF REQUEST FULFILS THEN onSuccess CALLBACK FUNCTION WILL CALL AND RETURN THE RESPONSE 
    *  ELSE onError CALLBACK FUNCTION WILL CALLED AND RETURN the error
    *  WE ARE NOTIFYING USER THE ERROR MESSAGE WHEN ERROR COMES BY SIMPLE TOAST, ERASE IF YOU DONOT WANT TO SHOW ALERTS HERE
* stopLoader: DISPATCH AND STOPS THE LOADER. IF YOU DONOT WANT TO STOP LOADER THEN PASS FALSE
* getToken: RELACE THE getToken FUNCTION WITH YOUR OWN CODE. THIS FUNCTION GETS THE TOKEN FROM REDEX AND PASS IN HEADERS
* putRequestFormData, postRequestFormData : SENDS PUT REQUEST IN FORM DATA AND CONVERTS YOUR payload in FORM DATA OBJECT

USAGE: 
const anyApiCall = () => {
    const onSuccess = (res) => {
      setAnyState(res.)
    }
    const onError = (err: any) => {
      console.log('err___', err)
      handle error
    }

    const body = {
      phone_number: value,
      channel: 'sms'
    };
    dispatch(setLoader(true))
    await postRequest(body, routes.sendsmsCode, true, onSuccess, onError)
}
 */

// import SimpleToast from 'react-native-simple-toast';
import { BASE_URL } from "./constants";
import axios from "axios";
import store from "../../Redux/store";
import { setLoader } from "../../Redux/Reducers/gernalSlice";

function getUrl(route, baseurl) {
  if (baseurl == false) {
    return route;
  } else {
    return `${BASE_URL}${route}`;
  }
}

function getToken() {
  return store.getState().authReducer?.token;
}

// HANDLE ALL THE REQUESTS AND RETURNS THE RESPONSE
const apiCall = async (
  method,
  payload,
  route,
  baseurl,
  onSuccess,
  onError,
  stopLoader
) => {
  try {
    const url = getUrl(route, baseurl);
    let response = null;
    const token = getToken();
    let config = {
      method: method,
      maxBodyLength: Infinity,
      data: payload,
      url: url,
      headers: token ? { "x-sh-auth": token } : null,
    };
    response = await axios.request(config);
    if (response?.data?.code == 200) {
      onSuccess(response.data);
      stopLoader && store.dispatch(setLoader(false));
      return { status: 200, response: response.data };
    } else {
      onError(response.response.data);
      stopLoader && store.dispatch(setLoader(false));
      return response;
    }
  } catch (e) {
    onError(e.response.data);
    store.dispatch(setLoader(false));
    return {
      status: 400,
      response: e?.response?.data
        ? e?.response?.data
        : { message: e.toString() },
    };
  }
};

// FOR GET METHOD
export const getRequest = async (
  payload,
  route,
  baseurl,
  onSuccess = (res) => {},
  onError = (err) => {},
  stopLoader = true
) => {
  const response = await apiCall(
    "get",
    payload,
    route,
    baseurl,
    onSuccess,
    onError,
    stopLoader
  );
  return response;
};

// FOR POST METHOD
export const postRequest = async (
  payload,
  route,
  baseurl,
  onSuccess = (res) => {},
  onError = (err) => {},
  stopLoader = true
) => {
  const response = await apiCall(
    "post",
    payload,
    route,
    baseurl,
    onSuccess,
    onError,
    stopLoader
  );
  return response;
};

// FOR PATCH METHOD
export const patchRequest = async (
  payload,
  route,
  baseurl,
  onSuccess = (res) => {},
  onError = (err) => {},
  stopLoader = true
) => {
  const response = await apiCall(
    "patch",
    payload,
    route,
    baseurl,
    onSuccess,
    onError,
    stopLoader
  );
  return response;
};

// FOR PUT METHOD
export const putRequest = async (
  payload,
  route,
  baseurl,
  onSuccess = () => {},
  onError = () => {},
  stopLoader = true
) => {
  const response = await apiCall(
    "put",
    payload,
    route,
    baseurl,
    onSuccess,
    onError,
    stopLoader
  );
  return response;
};

// FOR DELETE METHOD
export const deleteRequest = async (
  payload,
  route,
  baseurl,
  onSuccess = (res) => {},
  onError = (err) => {}
) => {
  try {
    const url = getUrl(route, baseurl);
    const token = getToken();
    let response = null;
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      data: payload,
      url: url,
      headers: token ? { "x-sh-auth": token } : null,
    };
    response = await axios.request(config);

    if (response?.data?.code == 200) {
      onSuccess(response.data);
      store.dispatch(setLoader(false));
      return { status: 200, response: response.data };
    } else {
      onError(response);
      store.dispatch(setLoader(false));
      return response;
    }
  } catch (e) {
    onError(e.response?.data);
    store.dispatch(setLoader(false));
    return {
      status: 400,
      response: e?.response?.data
        ? e?.response?.data
        : { message: e.toString() },
    };
  }
};

// FOR FORM DATA PUT REQUEST METHOD
export const putRequestFormData = async (
  payload,
  route,
  baseurl,
  onSuccess = (res) => {},
  onError = (res) => {},
  stopLoader = true
) => {
  try {
    const url = getUrl(route, baseurl);
    const formData = new FormData();
    const token = getToken();
    let response = null;
    const headers = {
      "Content-Type": "multipart/form-data",
      "x-sh-auth": token,
    };
    for (let key in payload) {
      formData.append(key, payload[key]);
    }
    response = await axios.put(url, formData, { headers });
    if (response?.data?.code == 200) {
      onSuccess(response.data);
      stopLoader && store.dispatch(setLoader(false));
      return { status: 200, response: response.data };
    } else {
      // console.log('error___', response)
      onError(response);
      stopLoader && store.dispatch(setLoader(false));
      return response;
    }
  } catch (e) {
    onError(e);
    console.log("__post request form data error", e.response?.data);
    return {
      status: 400,
      response: e?.response?.data
        ? e?.response?.data
        : { message: e.toString() },
    };
  }
};

// FOR FORM DATA POST REQUEST METHOD
export const postRequestFormData = async (
  payload,
  route,
  baseurl,
  onSuccess = (res) => {},
  onError = (res) => {},
  stopLoader = true
) => {
  try {
    const url = getUrl(route, baseurl);
    const formData = new FormData();
    const token = getToken();
    let response = null;

    for (let key in payload) {
      console.log(payload, " payload");

      if (key == "images") {
        let images = payload.images;
        console.log(payload.images, " api payload images");
        for (let key1 of images) {
          console.log("_______________KEY_+_____________", key1);
          console.log("appending", key1);
          formData.append("images[]", key1);
        }
      } else formData.append(key, payload[key]);
    }
    console.log("form_data", formData);
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      data: formData,
      url: url,
      headers: {
        "Content-Type": "multipart/form-data",
        "x-sh-auth": token,
      },
    };
    console.log("configs are", config);

    response = await axios.request(config);

    if (response?.data?.code == 200) {
      onSuccess(response.data);
      stopLoader && store.dispatch(setLoader(false));
      return { status: 200, response: response.data };
    } else {
      onError(response);
      stopLoader && store.dispatch(setLoader(false));
      return response;
    }
  } catch (e) {
    onError(e);
    console.log("__post request form data error", e.response?.data);
    stopLoader && store.dispatch(setLoader(false));
    return {
      status: 400,
      response: e?.response?.data
        ? e?.response?.data
        : { message: e.toString() },
    };
  }
};
