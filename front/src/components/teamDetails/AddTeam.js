import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function AddTeam() {

    const history = useHistory();

    const email = localStorage.getItem("email");

    const [ user, setUser ] = useState({});

    // const [ image, setImage ] = useState({
    //     file: null
    // });

    useEffect(() => {
        axios.get(`http://localhost:8080/user/${email}`, {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            }
            })
        .then(res => {
            console.log(res.data);
            setUser(res.data);
        })
    }, []);

    const [team, setTeam] = useState({
        name: "",
        teamAdminEmail: "",
        players: []
    });

    const [errors, setErrors] = useState({});

    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        setTeam({
            ...team,
            [e.target.name]: e.target.value,
        });
    };

    // const uploadImage = (e) => {
    //     setImage({
    //         file : e.target.files[0]
    //     })
    // }

    const validate = (team) => {

        let errors = {};

        if (team.name.length < 3 || team.name.length > 20) {
            errors.name = "Invalid name (size: 3-20)";
        }

        return errors;

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // setErrors(validate(values));
        setErrors(validate(team));
        setIsSubmitted(true);
    };

    useEffect(() => {
        team.teamAdminEmail = user.email;
        console.log(team);
        if (Object.keys(errors).length === 0 && isSubmitted) {
            console.log(user.id);
            // team.players[0].id = user.id;
            console.log(team);
            axios.post(`http://localhost:8080/team`, team, {
                headers: {
                Authorization: `Bearer ${window.localStorage.getItem("token")}`,
                }
            })
            .then( res => {
                if (res.status === 200) {
                    console.log(res);
                    user.team = res.data;
                    console.log(user);
                    axios.put(`http://localhost:8080/user`, user, {
                        headers: {
                        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
                        }
                    })
                    .then( res => {
                        if (res.status === 200) {
                        history.push("/team");
                        console.log("ok")
                        }
                    });
                    // axios.get(`http://localhost:8080/team/${res.data.id}`, {
                    //     headers: {
                    //     Authorization: `Bearer ${window.localStorage.getItem("token")}`,
                    //     }
                    // }).then(res => console.log(res))
                }
            });
        }
    }, [errors])

    return { team, handleChange, handleSubmit, errors };
}
