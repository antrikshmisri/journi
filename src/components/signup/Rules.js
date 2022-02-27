const validate = ({ firstName, lastName, email, password }) => {
  let errors = {};

  if (!firstName) {
    errors.firstName = "First name is required";
  }
  if (!lastName) {
    errors.lastName = "Last name is required";
  }
  if (!email) {
    errors.email = "Email is required";
  }
  if (!password) {
    errors.password = "Password is required";
  }
  if (password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }
  if (password.length > 20) {
    errors.password = "Password must be less than 20 characters";
  }
  if (password.search(/\d/) === -1) {
    errors.password = "Password must contain at least one number";
  }
  if (password.search(/[a-z]/) === -1) {
    errors.password = "Password must contain at least one lowercase letter";
  }
  if (password.search(/[A-Z]/) === -1) {
    errors.password = "Password must contain at least one uppercase letter";
  }
  if (password.search(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/) === -1) {
    errors.password = "Password must contain at least one special character";
  }

  return errors;
};


export default validate;