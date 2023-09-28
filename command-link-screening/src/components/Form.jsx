import { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components"; // Import styled-components
import { useDispatch, useSelector } from "react-redux";
import { getForm, setUserRecord } from "../../redux/formReducer";
import { validateSelect, validateText, validateTextarea } from "../utils/validations";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

// Define styled-components
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  flex-wrap: wrap;
  overflow: hidden;
  .row {
    width: 100%;
    display: flex;

    justify-content: center;
  }
  form {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  div {
    margin-bottom: 10px;
  }

  select,
  textarea,
  input {
    display: flex;
    padding: 5px;
    width: 100%;
    box-sizing: border-box;
  }
  .selectContainer {
    width: 100%;
  }
  .textareaContainer {
    width: 100%;
  }
  .textContainer {
    width: 100%;
  }
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const RegisterTitle = styled.h3`
  font-weight: bold;
  text-align: center;
  align-self: center;
  color: white;
`;

const Form = () => {
  //Hook for navigation to the ThankYou component
  const navigate = useNavigate();
  //FormValues brings the JSON file to render from the back-end.
  const formValues = useSelector((state) => state.form.formValues);
  //States for the Errors and Input values
  const [formErrors, setFormErrors] = useState({});
  const [formState, setFormState] = useState({});
  console.log(formState, "form state");

  console.log(formErrors, "form errors");
  const dispatch = useDispatch();
  //Auxiliary functions to make the initialState for the dynamic form
  function extractIds(data) {
    if (Array.isArray(data)) {
      // If it's an array, map and concatenate IDs
      return data.reduce((acc, item) => {
        return acc.concat(extractIds(item));
      }, []);
    } else if (typeof data === "object" && data !== null && "id" in data) {
      // If it's an object with an 'id' property, extract the ID
      return [data.id.toLowerCase()];
    }
    return []; // Return an empty array for other cases
  }
  useEffect(() => {
    //First I have to fetch all the dynamic json information. Then that same action dispatches the action to the store. And when that state updates, the render does the same.
    dispatch(getForm());
  }, [dispatch]);

  useEffect(() => {
    // Get all the IDs from the JSON
    const allIds = extractIds(formValues);

    // Create an initial state object with empty values for each ID
    const initialState = allIds.reduce((acc, id) => {
      acc[id] = "";
      return acc;
    }, {});
    setFormState(initialState);
    setFormErrors(initialState);
  }, [formValues]);
  //Function that handles the changes
  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;

      // Perform validation based on the input type
      let error = "";
      if (formValues) {
        const field = formValues.find((field) => {
          if (Array.isArray(field)) {
            const fieldArray = field.find((el) => el.id.toLowerCase() === name);
            return fieldArray;
          } else return field.id.toLowerCase() === name;
        });
        const trueField = Array.isArray(field) ? field.find((el) => el.id.toLowerCase() === name) : field;
        const trueFieldId = trueField.id.toLowerCase();
        if (trueField) {
          switch (trueField.type) {
            case "text":
              error = validateText(value, trueField.required, trueFieldId);
              break;
            case "select":
              error = validateSelect(value);
              break;
            case "textarea":
              error = validateTextarea(value, trueField.required, trueFieldId);
              break;
            // Add more cases for other input types if needed
            default:
              error = "";
          }
        }
      }

      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [name]: error,
      }));

      setFormState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [formValues]
  );

  // Function to render fields based on the JSON structure
  const renderFields = useMemo(() => {
    const renderField = (field) => {
      const placeholder = field?.placeholder
        ? field.placeholder.slice(0, 1).toUpperCase() + field.placeholder.slice(1)
        : field.id.slice(0, 1).toUpperCase() + field.id.slice(1);
      if (field.type === "select") {
        return (
          <div key={field.id} className="selectContainer">
            <select name={field.id.toLowerCase()} onChange={handleChange} id={field.id}>
              <option value={"placeholder"}>{placeholder}</option>
              {field.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {formErrors[field.id.toLowerCase()]}
          </div>
        );
      } else if (field.type === "textarea") {
        return (
          <div key={field.id} className="textareaContainer">
            <textarea
              name={field.id.toLowerCase()}
              onChange={handleChange}
              id={field.id}
              placeholder={placeholder}
            ></textarea>
            {formErrors[field.id.toLowerCase()]}
          </div>
        );
      } else {
        return (
          <div key={field.id} className="textContainer">
            <input
              onChange={handleChange}
              type={field.type}
              name={field.id.toLowerCase()}
              id={field.id}
              placeholder={placeholder}
              required={field.required || true} //This is because I wanted every field in the form to be required for the sake of the exercise.
            />
            {formErrors[field.id.toLowerCase()]}
          </div>
        );
      }
    };
    return formValues?.map((fieldGroup, index) => {
      // Check if the field group is an array (multiple columns)
      if (Array.isArray(fieldGroup)) {
        return (
          <div key={index} className="row">
            {fieldGroup.map((field) => renderField(field))}
          </div>
        );
      } else {
        return renderField(fieldGroup);
      }
    });
  }, [formValues, formErrors, handleChange]);
  const handleSubmit = (e, form) => {
    console.log(
      Object.values(formErrors).every((error) => error === ""),
      "LO QUE BUSCO"
    );
    e.preventDefault();
    if (Object.values(formErrors).every((error) => error === "")) {
      dispatch(setUserRecord(form));
      navigate("/thankyou", { replace: true });
    } else Swal.fire({ title: "Form validation", text: "Please fill the remaining values", icon: "error" });
  };
  return (
    <FormContainer>
      <RegisterTitle>Please fill the form to continue!</RegisterTitle>
      <form onSubmit={(e) => handleSubmit(e, formState)}>
        {renderFields} <button type="submit">Send</button>
      </form>
    </FormContainer>
  );
};

export default Form;
