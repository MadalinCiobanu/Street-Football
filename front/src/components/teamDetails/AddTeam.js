import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function AddTeam() {

    const history = useHistory();

    const email = localStorage.getItem("email");

    const [ user, setUser ] = useState({});

    const [ image, setImage ] = useState({
        file: null,
        id: ""
    });

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
        teamAdminEmail: ""
    });

    const [errors, setErrors] = useState({});

    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        setTeam({
            ...team,
            [e.target.name]: e.target.value,
        });
    };

    const uploadImage = (e) => {
        setImage({
            file : e.target.files[0]
        })
    }

    const validate = (team) => {

        let errors = {};

        if (team.name.length < 3 || team.name.length > 20) {
            errors.name = "Invalid name (size: 3-20)";
        }

        return errors;

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(validate(team));
        setIsSubmitted(true);
    };

    useEffect(() => {
        team.teamAdminEmail = user.email;
        console.log(team);
        if (Object.keys(errors).length === 0 && isSubmitted) {

            // add image

            const formData = new FormData();
            formData.append("image", image.file, team.name)

            console.log(image.file);

            axios.post(`http://localhost:8080/team/image`, formData, {
                headers: {
                        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
                    }
            }).then( res => {
                if (res.status === 200) {

                    // add team
                    
                    const fullTeam = {
                        name: team.name,
                        teamAdminEmail: team.teamAdminEmail,
                        players: team.players,
                        teamImage: res.data
                    }

                    console.log(fullTeam);

                    user.team = fullTeam;
                    console.log(user);

                    axios.put(`http://localhost:8080/user`, user, {
                        headers: {
                        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
                        }
                    })
                    .then( res => {
                        if (res.status === 200) {
                            console.log(res.data);
                            window.localStorage.setItem("team", res.data.team.name);
                            window.localStorage.setItem("teamId", res.data.team.id);

                            // add team id in team image

                            const fullImage = {
                                id: res.data.team.teamImage.id,
                                data: res.data.team.teamImage.data,
                                team: {
                                    id: res.data.team.id
                                }
                            }

                            axios.put(`http://localhost:8080/team/image`, fullImage, {
                                headers: {
                                        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
                                    }
                            })
                            .then( res => {
                                console.log(res.data);

                                history.push("/team");
                                window.location.reload();
                            })
                        }
                    });

                }
            })
    }}, [errors]);

    return { team, handleChange, handleSubmit, errors, uploadImage };
}
