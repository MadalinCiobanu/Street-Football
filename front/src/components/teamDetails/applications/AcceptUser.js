import { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

export default function AcceptUser() {

    const history = useHistory();
    let { id } = useParams();

    let user = {};
    let team = {};
    let error = null;

    useEffect(() => {
        console.log(id);

        axios.get(`http://localhost:8080/user/id/${id}`, {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            }
        })
        .then(res => {
            user = res.data;
            console.log(user);

            team = {
                id: window.localStorage.getItem("teamId")
            }

            // get team

            axios.get(`http://localhost:8080/team/${window.localStorage.getItem("teamId")}`, {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem("token")}`,
                }
            })
            .then(res => {
                console.log(res.data);
                team = res.data;
                team.players = [];

                //check if user have team
                !user.team ? user.team = team : error = "Error";

                //check for error and add team in user
                !error && axios.put(`http://localhost:8080/user`, user, {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem("token")}`,
                }
                })
                .then(() => {
                    history.push("/team");
                    window.location.reload();
                })

            });

        })
    }, [])

    return null;
}
