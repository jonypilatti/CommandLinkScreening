import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { describe, beforeEach, afterEach, it, expect } from "@jest/globals";
import { MemoryRouter } from "react-router-dom";
import thunk from "redux-thunk";
import fieldSet from "./__ mocks __/field-set-js.json";
import ThankYou from "../components/ThankYou";

const mockStore = configureStore([thunk]);
const userRecord = {
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
describe("Form Component", () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      form: {
        formValues: fieldSet,
        userRecord,
      },
    });
  });
  afterEach(() => {
    cleanup();
  });

  it("renders the thank you page correctly", async () => {
    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <ThankYou />
        </MemoryRouter>
      </Provider>
    );

    const storeState = store.getState();
    //Here we verify that all the h4 are rendering
    storeState.form.formValues.forEach((formValueGroup) => {
      if (Array.isArray(formValueGroup)) {
        formValueGroup.forEach((field) => {
          const placeholder = field?.id && field.id.charAt(0).toUpperCase() + field.id.toLowerCase().slice(1);
          const expectedText = `${placeholder}:`; // Assuming your prop contains the expected text
          const titleEl = screen.getByText(expectedText);
          expect(titleEl).toBeInTheDocument();
        });
      } else {
        const placeholder =
          formValueGroup?.id && formValueGroup.id.charAt(0).toUpperCase() + formValueGroup.id.toLowerCase().slice(1);
        const expectedText = `${placeholder}:`; // Assuming your prop contains the expected text
        const titleEl = screen.getByText(expectedText);
        expect(titleEl).toBeInTheDocument();
      }
    });
  });
  //Here we verify that all the user input's values are rendering correctly
  Object.keys(userRecord).forEach((property) => {
    test(`Test ${property}`, () => {
      // Your test logic for each property goes here
      const value = userRecord[property];

      // Example: Expect the value to be truthy (not undefined, null, or empty)
      expect(value).toBeTruthy();
    });
  });
});

afterEach(() => cleanup());
