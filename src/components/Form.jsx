import { useCallback, useEffect, useMemo, useState } from "react";
import styled, { keyframes } from "styled-components"; // Import styled-components
import { useDispatch, useSelector } from "react-redux";
import { getForm, setUserRecord } from "../../redux/formReducer";
import { validateSelect, validateText, validateTextarea } from "../utils/validations";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

// Define styled-components

const glowAnimation = keyframes`
  0%, to {
    color: #009d71;
    text-shadow: 0 0 12px #009d71, 0 0 50px #009d71, 0 0 100px #009d71;
  }
  `;

const FormContainer = styled.div`
  display: flex;
  background-color: black;
  min-height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
  overflow: hidden;
  align-self: center;
  height: 100%;
  .row {
    width: 100%;
    display: flex;

    justify-content: center;
  }
  form {
    display: flex;
    max-width: 600px;
    align-self: center;
    flex-direction: column;
  }
  div {
    margin-bottom: 10px;
  }
  label {
    display: flex;
    flex-direction: column;
    font-size: 24px;
    font-weight: 600;
    color: white;
    gap: 5px;
    @media (max-width: 450px) {
      font-size: 20px;
    }
  }
  textarea {
    display: flex;
    padding: 5px;
    width: 100%;
    color: #2823bc;
    font-weight: 600;
    font-size: 16px;
    box-sizing: border-box;
    background-color: rgb(240, 240, 240);
    min-height: 200px;
    @media (max-width: 450px) {
      min-height: 150px;
    }
    &::placeholder {
      color: #2823bc;
      font-weight: 600;
    }
  }

  input {
    border: 2px solid black;
    color: #2823bc;
    font-weight: 600;
    background-color: rgb(240, 240, 240);
    display: flex;
    padding: 10px;
    font-size: 16px;
    border-radius: 6px;
    overflow-x: scroll;
    overflow-y: hidden;
    scrollbar-width: thin;
    scrollbar-color: #ccc #f0f0f0;
    -webkit-overflow-scrolling: touch;
    width: 100%;
    box-sizing: border-box;

    &::-webkit-scrollbar {
      width: 10px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #ccc;
      border-radius: 5px;
    }
    &::-webkit-scrollbar-thumb:hover {
      background-color: #999;
    }
    &:focus {
      background-color: rgb(68, 85, 111);
      border: 2px solid #c8ff00;
      color: #8ed8f8;
      &::placeholder {
        color: #8ed8f8;
      }
    }
    &::placeholder {
      color: #2823bc;
      font-weight: 600;
    }
  }

  select {
    border: 2px solid black;
    color: #2823bc;
    font-weight: 600;
    background-color: rgb(240, 240, 240);
    display: flex;
    padding: 10px;
    font-size: 16px;
    border-radius: 6px;
    overflow-x: scroll;
    overflow-y: hidden;
    scrollbar-width: thin;
    scrollbar-color: #ccc #f0f0f0;
    -webkit-overflow-scrolling: touch;
    width: 100%;
    box-sizing: border-box;

    &::-webkit-scrollbar {
      width: 10px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #ccc;
      border-radius: 5px;
    }
    &::-webkit-scrollbar-thumb:hover {
      background-color: #999;
    }
    &:focus {
      background-color: rgb(68, 85, 111);
      border: 2px solid #c8ff00;
      color: #8ed8f8;
      &::placeholder {
        color: #8ed8f8;
      }
    }
    &::placeholder {
      color: #2823bc;
      font-weight: 600;
    }
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

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px rgb(68, 85, 111) inset !important;
    -webkit-text-fill-color: #8ed8f8 !important;
    -webkit-font-smoothing: antialiased !important;
  }
  .Error {
    color: #ff7c39;
  }
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const RegisterTitle = styled.h1`
  font-weight: bold;
  text-align: center;
  align-self: center;
  font-weight: 900;
  color: transparent;
  @media (max-width: 450px) {
    font-size: 28px;
    margin-left: 15px;
    margin-right: 15px;
  }
`;

const WelcomeLetter = styled.span`
  animation: ${glowAnimation} 2s ease-in-out infinite;
  text-shadow: 1px 1px 2px #009d71;
  color: transparent;
`;
const SubmitButton = styled.button`
  background-color: #009d71;
  margin-bottom: 40px;
  color: black;
  float: bottom;
  &:hover {
    font-weight: bold;
    color: white;
    border: 1px solid rgb(68, 85, 111);
    box-shadow: 2px 3px 20px #009d71;
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;

  align-self: center;
  background-color: #4c007d;
  min-height: 400px;
  min-width: 150px;
  border-radius: 16px;
  border: 2px solid white;
  margin-left: 15px;
  margin-right: 15px;
  margin-bottom: 50px;
  padding: 10px;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
`;
const Title = styled.h3`
  text-align: center;
  font-size: 24px;
`;
const Message = styled.span`
  font-size: 16px;
  text-align: center;
`;
const Form = () => {
  //Hook for navigation to the ThankYou component
  const navigate = useNavigate();
  //FormValues brings the JSON file to render from the back-end.
  const formValues = useSelector((state) => state.form.formValues);
  //States for the Errors and Input values
  const [formErrors, setFormErrors] = useState({});
  const [formState, setFormState] = useState({});
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
  }, []);

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

  const RenderFields = useMemo(() => {
    const renderField = (field) => {
      const placeholder = field?.placeholder
        ? field.placeholder.slice(0, 1).toUpperCase() + field.placeholder.slice(1)
        : field.id.slice(0, 1).toUpperCase() + field.id.slice(1);
      if (field.type === "select") {
        return (
          <div key={field.id} className="selectContainer">
            <label id={`label-${field.id}`} htmlFor={`select-${field.id}`}>
              {placeholder}
              <select
                name={field.id.toLowerCase()}
                onChange={handleChange}
                id={`select-${field.id}`}
                aria-labelledby={`label-${field.id}`}
                aria-describedby={`${field.id}Error`}
              >
                <option className="optionStyle" value={"placeholder"}>
                  {placeholder}
                </option>
                {field.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <div id={`${field.id}Error`} className="Error">
              {formErrors[field.id.toLowerCase()]}
            </div>
          </div>
        );
      } else if (field.type === "textarea") {
        return (
          <div key={field.id} className="textareaContainer">
            <label id={`label-${field.id}`} htmlFor={`textarea-${field.id}`}>
              {placeholder}
              <textarea
                name={field.id.toLowerCase()}
                onChange={handleChange}
                placeholder="Please enter your message here..."
                id={`textarea-${field.id}`}
                aria-labelledby={`label-${field.id}`}
                aria-describedby={`${field.id}Error`}
              ></textarea>
            </label>
            <div id={`${field.id}Error`} className="Error">
              {formErrors[field.id.toLowerCase()]}
            </div>
          </div>
        );
      } else {
        return (
          <div key={field.id} className="textContainer">
            <label id={`label-${field.id}`} htmlFor={`input-${field.id}`}>
              {placeholder}
              <input
                onChange={handleChange}
                type={field.type}
                name={field.id.toLowerCase()}
                id={`input-${field.id}`}
                placeholder={placeholder}
                required={field.required || true}
                aria-labelledby={`label-${field.id}`}
                aria-describedby={`${field.id}Error`}
                data-testid={`input-${field.id}`}
              />
            </label>
            <div id={`${field.id}Error`} className="Error">
              {formErrors[field.id.toLowerCase()]}
            </div>
          </div>
        );
      }
    };
    return formValues?.map((fieldGroup, index) => {
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
    e.preventDefault();
    if (Object.values(formErrors).every((error) => error === "")) {
      dispatch(setUserRecord(form));
      navigate("/thankyou", { replace: true });
    } else {
      Swal.fire({ title: "Form validation", text: "Please fill the remaining values", icon: "error" });
    }
  };
  const welcomeAnimation = Array.from("Welcome to Command Link's Screening Dynamic form!");
  const NoElementsTitle = "Oops...";
  const NoElementsSpan = "We are sorry, but there are no elements to render.";
  return (
    <FormContainer>
      <RegisterTitle>
        {welcomeAnimation.map((el, index) => (
          <WelcomeLetter key={index} style={{ animationDelay: `${index * 0.25}s` }}>
            {el}
          </WelcomeLetter>
        ))}
      </RegisterTitle>
      <StyledForm
        style={{ justifyContent: formValues.length === 0 ? "space-between" : "center" }}
        onSubmit={(e) => handleSubmit(e, formState)}
      >
        {formValues.length > 0 ? (
          RenderFields
        ) : (
          <Container>
            <Title>{NoElementsTitle}</Title>
            <Message>{NoElementsSpan}</Message>
          </Container>
        )}
        <SubmitButton type="submit" aria-label="Submit Form">
          Send
        </SubmitButton>
      </StyledForm>
    </FormContainer>
  );
};

export default Form;
