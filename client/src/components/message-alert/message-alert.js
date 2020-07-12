import React from 'react';
import './message-alert.scss';
const MessageAlert = (props) => {
    
    const MapAlerts = () => {
        return props.alerts.map((alert) => <p key={alert} className={alert.status}>{alert.message}</p>)
    }

    return(
        <>
        <div className="alert-container">
            <MapAlerts />
        </div>
        </>
    )
}

export default MessageAlert;
