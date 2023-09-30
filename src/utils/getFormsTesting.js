import axios from "axios";
import Swal from "sweetalert2";

export const getFormTesting = async () => {
  try {
    //APIURL IS LOCALHOST FOR DEVELOPMENT
    const APIURL = "http://localhost:3001";

    const formData = await axios({
      method: "get",
      url: `${APIURL}/getDynamicForm`,
      responseType: "json",
    });
    if (!formData.data.Error) {
      return formData.data;
    } else
      Swal.fire({
        title: "Error",
        message: "An unexpected error happened while fetching the form: " + err?.message || err?.code,
        icon: "error",
      });
  } catch (err) {
    console.error(err, "el error de los banners");
    Swal.fire({
      title: "Error",
      message: "An unexpected error happened while fetching the form: " + err?.message || err?.code,
      icon: "error",
    });
  }
};
