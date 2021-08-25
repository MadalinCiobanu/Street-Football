import React from 'react';
import { useHistory } from 'react-router-dom';

export default function ApplicationCards(props) {

    const history = useHistory();

    const items = props.applications;

    return <div className="full-width">
        <div className="columns is-centred">
            {items.map(app => {
                return <div className="card column is-4">
                    <div className="card-content">
                        {/* <div className="card-image">
                            <figure className="image is-4by3">
                                {team.teamImage && <img src={"data:image/png;base64," + team.teamImage.data} className="is-4by3"/>}
                            </figure>
                        </div> */}
                        <div className="content">
                            <p className="title is-5 text-color-blue">{app.user.firstName + " " + app.user.lastName}</p>
                            <p className="text-color-blue">Message: {app.description}</p>
                            <button onClick={ () => history.push("accept/" + app.user.id) }
                            className="button is-light is-medium">Accept</button>
                        </div>
                    </div>
                </div>
            })}
        </div>
    </div>
}