import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";
export const initialState = {
  formValues: [],
  userRecord: {},
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    makeFormInitialState: (state, action) => {
      return { ...state, formValues: action.payload };
    },
    setUserRecord: (state, action) => {
      return { ...state, userRecord: action.payload };
    },
  },
});

export const getForm = () => {
  return async function (dispatch) {
    try {
      //APIURL IS LOCALHOST FOR DEVELOPMENT
      const APIURLLOCALHOST = "http://localhost:3001";
      const APIURL = "http://192.168.0.26:3001";

      const formData = await axios({
        method: "get",
        url: `${APIURL}/getDynamicForm`,
        responseType: "json",
      });
      if (!formData.data.Error) {
        await dispatch(makeFormInitialState(formData.data));
      } else
        Swal.fire({
          title: "Error",
          text: "An unexpected error happened while fetching the form.",
          icon: "error",
        });
    } catch (err) {
      console.error(err, "el error de los banners");
      Swal.fire({
        title: "Error",
        text: "An unexpected error happened while fetching the form: " + err?.message || err?.code,
        icon: "error",
      });
    }
  };
};

export const { makeFormInitialState, setUserRecord } = formSlice.actions;
export default formSlice.reducer;
