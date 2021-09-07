import React from 'react';
import Avatar from '@material-ui/core/Avatar';


export default function TeamBox({title, second, email, image}) {
    return (
        <div className="team-box">
            <Avatar style={{height:'50px',width:'50px'}} src={image}/>
            <div className="team-box-text">
                <div className="team-box-title">{title} {second}</div>
                <div className="team-box-para">{email}</div>
            </div>
        </div>
    )
}
