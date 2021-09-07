import React from 'react';
import {Paper } from '@material-ui/core';

import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

export default function Notification({imgcolor,title}) {
    return (
        <Paper elevation={3} className="notification" style={{transition:'0.5s'}}>
            <img width='25px' height='25px' src="https://e7.pngegg.com/pngimages/657/288/png-clipart-mobile-phones-computer-icons-telephone-telefono-miscellaneous-text-thumbnail.png" />
            <div className="notification-text">
                <div style={{color:'#5e6473',textAlign:'left',minWidth:'180px',maxWidth:'180px'}}>{title}</div>
                <div className="tracker-para" style={{color:'black'}}>20 Jan 2021, 15:39</div>
            </div>
            <ArrowForwardIosIcon style={{color:'#6A707E'}} />
        </Paper>
    )
}
