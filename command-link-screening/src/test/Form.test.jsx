import { cleanup, render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { getForm } from "../../redux/formReducer";
import Form from "../components/Form";
import { describe, beforeEach, afterEach, it, expect } from "@jest/globals";
import { MemoryRouter } from "react-router-dom";
import thunk from "redux-thunk";
import fieldSet from "./__ mocks __/field-set-js.json";

const mockStore = configureStore([thunk]);

describe("Form Component", () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      form: {
        formValues: fieldSet,
      },
    });
  });
  afterEach(() => {
    cleanup();
  });

  it("renders the form correctly", async () => {
    await store.dispatch(getForm());
    const actions = store.getActions();

    const expectedType = { type: "form/makeFormInitialState" };
    const { type } = actions[0];
    expect(type).toEqual(expectedType.type);

    const { getByLabelText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Form />
        </MemoryRouter>
      </Provider>
    );

    //Get the store state and then Iterate over each placeholder or ID to test if it is rendering correctly.
    const storeState = store.getState();
    //Here we verify that all the labels are rendering
    storeState.form.formValues.forEach((formValueGroup) => {
      if (Array.isArray(formValueGroup)) {
        formValueGroup.forEach((field) => {
          const placeholder = field?.placeholder
            ? field.placeholder.slice(0, 1).toUpperCase() + field.placeholder.slice(1)
            : field.id.slice(0, 1).toUpperCase() + field.id.slice(1);
          expect(getByLabelText(placeholder)).toBeInTheDocument();
        });
      } else {
        const placeholder = formValueGroup?.placeholder
          ? formValueGroup.placeholder.slice(0, 1).toUpperCase() + formValueGroup.placeholder.slice(1)
          : formValueGroup.id.slice(0, 1).toUpperCase() + formValueGroup.id.slice(1);
        expect(getByLabelText(placeholder)).toBeInTheDocument();
      }
    });
  });
  it("handles user input correctly and submits the form when validation passes", async () => {
    await store.dispatch(getForm());

    const { getByLabelText, rerender, getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Form />
        </MemoryRouter>
      </Provider>
    );
    const state = store.getState();
    // console.log(state, "el state", state.form);

    if (state.form.formValues.length > 0) {
      fireEvent.change(getByLabelText("First name"), { target: { value: "John" } });
      fireEvent.change(getByLabelText("Last name"), { target: { value: "Doe" } });
      fireEvent.change(getByLabelText("Email"), { target: { value: "jtest@example.com" } });
      fireEvent.change(getByLabelText("Address 1"), { target: { value: "Washington street 329" } });
      fireEvent.change(getByLabelText("State"), { target: { value: "USA" } });
      fireEvent.change(getByLabelText("City"), { target: { value: "Chicago" } });
      fireEvent.change(getByLabelText("Zip"), { target: { value: "1181" } });
      fireEvent.change(getByLabelText("Phone"), { target: { value: "1138292076" } });
      fireEvent.change(getByLabelText("Please select job title"), { target: { value: "Engineer - lead" } });
      fireEvent.change(getByLabelText("Describe why you are a good fit for the job you are applying for."), {
        target: {
          value:
            "This is a text that I'm writing. It needs to be at least 50 characters long or it will never pass when i press to send. Please keep this in mind for the test.",
        },
      });
      // Trigger the form submission
      fireEvent.submit(getByText("Send"));
      fireEvent.click(getByText("Send"));
      await waitFor(() => {
        const expectedPayload = {
          address1: "Washington street 329",
          city: "Chicago",
          email: "jtest@example.com",
          firstname: "John",
          jobtitle: "Engineer - lead",
          lastname: "Doe",
          phone: "1138292076",
          reason:
            "This is a text that I'm writing. It needs to be at least 50 characters long or it will never pass when i press to send. Please keep this in mind for the test.",
          state: "USA",
          zip: "1181",
        };
        const actions = store.getActions();
        const setUserRecordAction = actions[1];
        const { type, payload } = setUserRecordAction;

        const expectedAction = { type: "form/setUserRecord" };
        expect(payload).toEqual(expectedPayload);
        expect(type).toEqual(expectedAction.type);
      });
    }
  });
});

afterEach(() => cleanup());
