import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
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
      const APIURL = "http://localhost:3001";

      const formData = await axios({
        method: "get",
        url: `${APIURL}/getDynamicForm`,
        responseType: "json",
      });
      if (!formData.data.Error) {
        await dispatch(makeFormInitialState(formData.data));
      } else alert("An error happened while fetching the form");
    } catch (err) {
      console.error(err, "el error de los banners");
      alert("An unexpected error happened while fetching the form: " + err?.message || err?.code);
    }
  };
};

export const { makeFormInitialState, setUserRecord } = formSlice.actions;
export default formSlice.reducer;
