import axios from "axios";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function ApplicationFunc(props) {

    const history = useHistory();

    const [values, setValues] = useState({
        description: "",
        user: {
            id: window.localStorage.getItem("id")
        },
        team: {}
    })

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };

    const validate = (values) => {

        let errors = {};

        if(values.description.length < 5 || values.description.length > 50) {
            errors.description = "Invalid description (size: 5-50)";
        }

        return errors;

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("in handle subbmit")
        setErrors(validate(values));
        setIsSubmitting(true);
    };

    useEffect(() => {
        if(Object.keys(errors).length === 0 && isSubmitting) {
            values.team = {
                id: props
            }
            console.log(values)
            axios.post("http://localhost:8080/application", values, {
                headers: {
                        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
                    }
            })
                .then(res => {
                    console.log(res);

                    history.push("/team-search");
                }, () => {
                    setErrors({description: "Application failed"});
                    setIsSubmitting(false);
                });
        }
    }, [errors]);

    return { values, handleChange, handleSubmit, errors };
}
