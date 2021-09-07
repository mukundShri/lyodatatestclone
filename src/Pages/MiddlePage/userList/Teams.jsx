import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import TeamBox from './TeamBox';
// import BuddiesBox from './BuddiesBox';
// import Pagination from '../Pagination/Pagination';
import './Teams.css';
import { db } from '../../../firebase';
import { firebaseLooper } from '../../../utils/tools';

export default function Teams() {
     const [users, setUsers] = useState([])
    useEffect(() => {
        db.collection('users').onSnapshot(snap => {
            const data = firebaseLooper(snap)
            setUsers(data)
        })
    }, [])
    return (
        <div className="teams">
            <Paper elevation={3}>
                <div className="header"  >
                    <div className="title" >Users</div>                    
                </div>
                <div className="teams-cont">
                    {
                        users.slice(0,5).map((data) => (
                        <TeamBox image={data.url} second={data.lastName} email={data.email} title={data.firstName}/>
                        ))
                    }
                    
                    
                </div>
                {/* <Pagination/> */}
<br />
            </Paper>
        </div>
    )
}

// export function Buddies() {
//     return (
//         <div className="buddies">
//             <Paper elevation={3}>
//                 <div className="header" style={{paddingTop:'16px'}} >
//                     <div className="title" >Buddies</div>                    
//                 </div>
//                 <div className="teams-cont">
//                     <BuddiesBox title="Buddy Name"/>
//                     <BuddiesBox title="Buddy Name"/>
//                     <BuddiesBox title="Buddy Name"/>
//                     <BuddiesBox title="Buddy Name"/>
//                     <BuddiesBox title="Buddy Name"/>
//                 </div>
//                 <Pagination/>
//             </Paper>
//         </div>
//     )
// }
