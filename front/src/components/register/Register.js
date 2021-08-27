import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import validate from "./RegValidation"
import { useNotification } from "../../notifications/NotificationProvider";

export default function Register() {

  const history = useHistory();
  const dispatch = useNotification();

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    roles: ["USER_ROLE"],
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      axios.post("http://localhost:8080/user", values)
      .then( () => {
          history.push("/login");
          dispatch({
            type: "SUCCESS",
            message: "User Registration Successful!",
          })
        }, error => {
        console.log({error}.error.response);
        if ({error}.error.response) {
          setErrors({email: "Email taken"});
          setIsSubmitting(false);
        } else {
          setIsSubmitting(false);
          dispatch({
            type: "ERROR",
            message: "Server Connection Failed!",
          })
        }
      });
    }
  }, [errors]);

  return { values, handleChange, handleSubmit, errors };
}
