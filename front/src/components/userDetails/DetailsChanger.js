import { useState, useEffect } from "react";
import axios from "axios";

export default function DetailsChanger() {

    const email = localStorage.getItem("email");

    const [values, setValues] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:8080/user/${email}`, {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            }
            })
        .then(res => {
            console.log(res.data);
            setValues(res.data);
        })
    }, []);

    const [errors, setErrors] = useState({});

    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleDetails = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };

    const validate = (values) => {

        let errors = {};

        if(values.firstName.length < 2) {
            errors.firstName = "Invalid name";
        }

        if (values.lastName.length < 2) {
            errors.lastName = "Invalid name";
        }
    
        if (values.phone.length < 7 || values.phone.length > 15) {
            errors.phone = "Invalid phone (size: 7-15)";
        }

        return errors;

    }

    const handleSubmitDetails = (e) => {
        e.preventDefault();
        // setErrors(validate(values));
        setErrors(validate(values));
        console.log(errors);
        console.log(values);
        setIsSubmitted(true);
    };

    useEffect(() => {
        console.log(errors);
        if (Object.keys(errors).length === 0 && isSubmitted) {
            console.log("in useEffect");
            axios.put(`http://localhost:8080/user`, values, {
                headers: {
                Authorization: `Bearer ${window.localStorage.getItem("token")}`,
                }
            })
            .then( res => {
                if (res.status === 200) {
                console.log("ok")
                }
            });
        }
    }, [errors])

    return { values, handleDetails, handleSubmitDetails, errors };
}
