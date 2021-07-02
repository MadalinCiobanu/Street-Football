import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function DetailsChanger() {

    const history = useHistory();

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

    const [detailsErrors, setDetailsErrors] = useState({});

    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleDetails = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };

    const validate = (values) => {

        let errors = {};

        if (!values.firstName.trim()) {
            errors.firstName = "First Name required";
        } else if (values.firstName.length < 2) {
            errors.firstName = "The First Name must have at least 2 chars";
        }
        
        if (!values.lastName.trim()) {
            errors.lastName = "Last Name required";
        } else if (values.lastName.length < 2) {
            errors.lastName = "The Last Name must have at least 2 chars";
        }
    
        if (!values.phone.trim()) {
            errors.phone = "Phone required";
        } else if (values.phone.length < 7 || values.phone.length > 15) {
            errors.phone = "The size must be 7-15 chars";
        }

        return errors;

    }

    const handleSubmitDetails = (e) => {
        e.preventDefault();
        // setErrors(validate(values));
        setDetailsErrors(validate(values));
        console.log(detailsErrors);
        console.log(values);
        setIsSubmitted(true);
    };

    useEffect(() => {
        console.log(detailsErrors);
        if (Object.keys(detailsErrors).length === 0 && isSubmitted) {
            if (values.team) {
                values.team = {
                    id: values.team.id
                }
            }
            console.log(values);
            axios.put(`http://localhost:8080/user`, values, {
                headers: {
                Authorization: `Bearer ${window.localStorage.getItem("token")}`,
                }
            })
            .then( res => {
                if (res.status === 200) {
                    console.log("ok");
                    history.push("/user");
                }
            });
        }
    }, [detailsErrors])

    return { values, handleDetails, handleSubmitDetails, detailsErrors };
}
