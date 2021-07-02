import validator from "validator";

export default function RegValidation(values) {
    let errors = {};
  
    if (!values.firstName.trim()) {
      errors.firstName = "First Name required";
    } else if (values.firstName.length < 2) {
      errors.firstName = "The name must have at least 2 characters";
    }
  
    if (!values.lastName.trim()) {
      errors.lastName = "Last Name required";
    } else if (values.lastName.length < 2) {
      errors.lastName = "The name must have at least 2 characters";
    }
  
    if (!validator.isEmail(values.email)) {
      errors.email = "Incorrect email";
    }
  
    if (!values.phone.trim()) {
      errors.phone = "Phone required";
    } else if (values.phone.length < 7 || values.phone.length > 15) {
      errors.phone = "The size must be 7-15 chars";
    }

    if (!values.password.trim()) {
        errors.password = "Password required";
    } else if (values.password.length < 5 || values.password.length > 20) {
      errors.password = "The size must be 5-20 chars";
    }

    if (!(values.password === values.confirmPassword) || !values.confirmPassword.trim()) {
        errors.confirmPassword = "Incorrect password";
    } else if (values.confirmPassword.length < 5 || values.confirmPassword.length > 20) {
      errors.confirmPassword = "The size must be 5-20 chars";
    }
  
    return errors;
  }
