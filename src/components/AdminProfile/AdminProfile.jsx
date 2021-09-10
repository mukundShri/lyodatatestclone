import React from 'react';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import PeopleIcon from '@material-ui/icons/People';
import SettingsIcon from '@material-ui/icons/Settings';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import {  withStyles } from '@material-ui/core/styles';
import './AdminProfile.css';


const StyledBadge = withStyles((theme) => ({
    badge: {
      backgroundColor: '#71D875',
      color: '#71D875',
      height:'20px',
      width:'20px',
      borderRadius:'50%',
      top:'15px',
      left:'15px',
      boxShadow: `0 0 0 2px #F3F6F9`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        border: '1px solid currentColor',
        content: '""',
      },
    }
  }))(Badge);

export default function AdminProfile({user}) {
    return (
        <>
        <div className="admin-profile">
            <div className="admin-icon">
                <StyledBadge variant="dot" color="secondary"  anchorOrigin={{ vertical: 'top', horizontal: 'left'}}>
                    <Avatar style={{height:'120px',width:'120px'}} src={user?.url}/>
                </StyledBadge>
            </div>
            <div className="admin-content">
                <div className="admin-name">{user.firstName} {user?.lastName}</div>
                <div className="admin-text">{user?.email}</div>
                <div className="admin-icons">
                    <PeopleIcon style={{color:'#464A53',marginRight:'10px'}}/>
                    <SettingsIcon style={{color:'#464A53',marginRight:'10px'}}/>
                    <ErrorOutlineIcon style={{color:'#464A53',marginRight:'10px'}}/>
                </div>
            </div>
        </div>
        <br />
        <br />
       
       
        </>
    )
}
