export function validateText(value, required, id) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const nameRegex = /^[a-zA-Z]+$/;
  const zipRegex = /^[a-zA-Z0-9]+$/;
  const locationRegex = /^[a-zA-Z0-9 ]+$/;
  const phoneRegex = /^(?:\+1|1)?[-. ]?\(?\d{3}\)?[-. ]?\d{3}[-. ]?\d{4}$/;
  if (required && !value) {
    return "This field is required.";
  }
  if ((id === "lastname" || id === "firstname") && !nameRegex.test(value)) {
    return "Please enter a valid name.";
  }
  if (id === "email" && !emailRegex.test(value)) {
    return "Please enter a valid email address.";
  }
  if (id === "address1" && !locationRegex.test(value)) {
    return "Please enter a valid address.";
  }
  if (id === "city" && !locationRegex.test(value)) {
    return "Please enter a valid city.";
  }
  if (id === "state" && !locationRegex.test(value)) {
    return "Please enter a valid state.";
  }
  if (id === "zip" && !zipRegex.test(value)) {
    return "Please enter a valid zip code.";
  }
  if (id === "phone" && !phoneRegex.test(value)) {
    return "Please enter a valid North American phone number.";
  }
  // You can add more specific validation rules here if needed
  return "";
}

// Validation function for select inputs
export function validateSelect(value) {
  if (value === "placeholder") {
    return "Please select an option.";
  }

  return "";
}

// Validation function for textarea inputs
export function validateTextarea(value) {
  if (!value) {
    return "This field is required.";
  } else if (value.length < 50) {
    return "Please provide a self-introduction of at least 50 characters.";
  }
  // You can add more specific validation rules here if needed
  return "";
}
