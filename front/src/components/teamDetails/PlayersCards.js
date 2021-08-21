import React from 'react'
import { useState, useEffect } from "react";
import paginate from 'jw-paginate';
import UsernameImageCreator from '../UsernameImageCreator';

export default function PlayersCards(props) {

    console.log(props.players);

    const pag = paginate(props.players.length, 1, 2, 5);

    console.log(pag);

    const items = props.players.slice(pag.startIndex, (pag.endIndex + 1));

    console.log(items);

    const [ pageOfItems, setPageOfItems ] = useState([])

    const onChange = (pageOfItems) => {
        setPageOfItems(pageOfItems);
    }

    return <div className="full-width">
        {/* <h1>Players: </h1> */}
        <div className="columns is-centred">
            {items.map(player => {
                return <div key={player.email} className="card column is-4">
                    <div className="card-content">
                        <div className="card-image">
                            <figure className="image is-4by3">
                                {UsernameImageCreator((player.firstName + " " + player.lastName), 200)}
                            </figure>
                        </div>
                        {/* <div className="media">
                            <div className="media-left">
                                <figure className="image">
                                    {UsernameImageCreator((player.firstName + " " + player.lastName), 48)}
                                </figure>
                            </div>
                            <div className="media-content">
                                <p className="title is-5">{player.firstName + " " + player.lastName}</p>
                            </div>
                        </div> */}
                        <div className="content">
                            <p className="title is-5 text-color-blue">{player.firstName + " " + player.lastName}</p>
                            <p>Email : {player.email}</p>
                            <p>Phone : {player.phone}</p>
                        </div>
                    </div>
                </div>
            })}
        </div>
    </div>
}
