import React from 'react';
import { useHistory } from 'react-router-dom';

export default function TeamCards(props) {

    const history = useHistory();

    const items = props.teams;

    return <div className="full-width">
        <div className="columns is-centred">
            {items.map(team => {
                return <div className="card column is-4">
                    <div className="card-content">
                        <div className="card-image">
                            <figure className="image is-4by3">
                                {team.teamImage && <img src={"data:image/png;base64," + team.teamImage.data} className="is-4by3"/>}
                            </figure>
                        </div>
                        <div className="content">
                            <p className="title is-5 text-color-blue">{team.name}</p>
                            <p className="text-color-blue">Members: {team.players.length}</p>
                            {window.localStorage.getItem("email") && !window.localStorage.getItem("team") && <button
                            onClick={
                                () => history.push("application/" + team.id)
                            } className="button is-light is-medium">Apply</button>}
                        </div>
                    </div>
                </div>
            })}
        </div>
    </div>
}
