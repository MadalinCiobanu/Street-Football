import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function PasswordChanger() {

    const history = useHistory();

    const email = localStorage.getItem("email");

    const [password, setPassword] = useState({
        old: "",
        password: "",
        confirmPassword: ""
    })

    const [errors, setErrors] = useState({});

    const [isSubmitted, setIsSubmitted] = useState(false);

    const handlePassword = (e) => {
        setPassword({
            ...password,
            [e.target.name]: e.target.value,
        });
    };

    const validate = (password) => {

        let errors = {};

        if(password.old.length < 5 || password.old.length > 20) {
            errors.old = "Invalid password (size: 5-20)";
        }

        if (password.password.length < 5 || password.password.length > 20) {
            errors.password = "Invalid password (size: 5-20)";
        }
    
        if (!(password.password === password.confirmPassword) || (password.confirmPassword.length < 5 || password.confirmPassword.length > 20)) {
            errors.confirmPassword = "Invalid password";
        }

        return errors;

    }
    
    const handleSubmitPassword = (e) => {
        e.preventDefault();
        // setErrors(validate(values));
        setErrors(validate(password));
        console.log(errors);
        console.log(password);
        setIsSubmitted(true);
    };

    useEffect(() => {
        console.log(errors);
        if (Object.keys(errors).length === 0 && isSubmitted) {
            console.log("in useEffect");
            axios.put(`http://localhost:8080/user/${email}`, password, {
                headers: {
                Authorization: `Bearer ${window.localStorage.getItem("token")}`,
                }
            })
            .then( res => {
                if (res.status === 200) {
                console.log("ok");
                history.push("/user");
                }
            }, () => {
                setErrors({old: "Wrong password"});
            });
        }
    }, [errors])

    return {handlePassword, handleSubmitPassword, errors };
}
