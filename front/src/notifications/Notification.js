import React, { useState, useEffect } from 'react'

export default function Notification(props) {

    const [width, setWidth] = useState(0);
    const [exit, setExit] = useState(false);

    const handleTimer = () => {
        setInterval(() => {
            setWidth(prev => {
                if (prev < 100) {
                    return prev += 0.5;
                }
                return prev;
            })
        }, 10)
    }

    const handleExit = () => {
        setExit(true);
        setTimeout(() => {
            // remove notification
            props.dispatch({
                type: "REMOVE",
                id: props.id
            })

        }, 400)
    }

    useEffect(() => {
        handleTimer();
    }, [])

    useEffect(() => {
        if (width === 100) {
            handleExit();
        }
    }, [width])
 
    return (
        <div className={`notification-item ${props.type === "SUCCESS" ? "success" : "error"} ${exit && "exit"}`}>
            <p>{props.message}</p>
            <div className="bar" style={{width: `${width}%`}}/>
        </div>
    )
}
