import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import validate from "./RegValidation"

export default function Register() {

  const history = useHistory();

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
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
        axios.post("http://localhost:8080/user/", values)
        .then( res => {
          if (res.status == 200) {
            history.push("/login");
          }
        }, () => {
          setErrors({email: "Email taken"})
        });
    }
  }, [errors]);

  return { values, handleChange, handleSubmit, errors };
}
