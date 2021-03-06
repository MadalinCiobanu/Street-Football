import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function LoginFunctionality() {
    
    const [values, setValues] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({ message: "" });

    const history = useHistory();

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setValues({
        ...values,
        [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
    };

    useEffect(() => {
    if (isSubmitting) {
        console.log("in useEffect");

        // Axios POST on the "/authenticate" endpoint of the api
        // The server checks if the credentials (email & password) are valid
        // And returns the JWT token, the user's name and ID
        axios.post("http://localhost:8080/auth/login", {
            email: values.email,
            password: values.password,
        })
        .then((res) => {

            console.log(res.data)

            // Store user info and the token in localStorage
            window.localStorage.setItem("id", res.data.id);
            window.localStorage.setItem("email", res.data.email);
            window.localStorage.setItem("token", res.data.token);
            window.localStorage.setItem("roles", res.data.roles);
            window.localStorage.setItem("name", res.data.firstName);
            window.localStorage.setItem("lastName", res.data.lastName);
            window.localStorage.setItem("phone", res.data.phone);
            res.data.team && window.localStorage.setItem("team", res.data.team.name);
            res.data.team && window.localStorage.setItem("teamId", res.data.team.id);

            history.push("/user");
            window.location.reload();
        })
        .catch(() => {
            setErrors({ message: "Invalid Email or Password" });
            setIsSubmitting(false);
        });
    }
    }, [isSubmitting]);

    return { values, handleChange, handleSubmit, errors };

}
