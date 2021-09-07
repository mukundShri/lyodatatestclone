import { Button, CircularProgress, Container, Fade, makeStyles, Paper, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import UserList from './UserList';
import {Link, NavLink, useHistory} from 'react-router-dom';
import { db } from '../../firebase';
import {firebaseLooper} from '../../utils/tools'
import AddIcon from '@material-ui/icons/Add';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useAuth } from '../context/AuthContext';
import LogIn from '../LogIn/LogIn';
import UserItem from './UserItem';
import Page from '../Page';
import SearchIcon from '@material-ui/icons/Search'

const useStyles = makeStyles((theme) =>( {
    add: {
   
    backgroundImage: 'linear-gradient(to left bottom, #fa630f, #fc8218, #fd9d29, #feb63f, #ffce59)',
    
    margin: theme.spacing(3, 0, 2),
    marginRight: '10%',
   

    },
    backButton: {
        backgroundColor: "#A997DF",
        color: "white",
        borderRadius: "20px",
       
    }
}))
const Users = () => {
    const count = 0
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState([{}]);
    const {currentUser} = useAuth()
    const [admin, setAdmin] = useState(false)
    const [error, setError] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const history = useHistory()
    useEffect(() => {

        db.collection('users').orderBy('role', 'asc').onSnapshot(snapshot => {
            const userData = firebaseLooper(snapshot)
            setUsers(userData)
            setIsLoading(false)
        })

    }, [])

    const handleReturn = () => {
      history.push('/')
  }
    return (
        <Page title='Users | LyoIms'>
              < >
        <Container  >
            
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
              {/* <Typography style={{marginRight: '15px'}} variant='h1' align='center'><b>{mTitle} : </b></Typography> */}
              <div style={{paddingLeft: '1.4rem'}}
              >
                 <Typography variant='h1' align='left'><b>Users</b></Typography>
                  <Typography align='left' variant='body2' > These are all the  Users and data </Typography>
              </div>
              <div>
              <div style={{display: 'flex', justifyContent: 'flex-end'}}>
               
               <div className="relative"> 
            <input style={{ border: '2px solid whitesmoke'}} onChange={(e) => setSearchTerm(e.target.value)} type="text" className="h-14 w-96 pr-8 pl-5 rounded z-0 focus:shadow focus:outline-none" placeholder="Search Users..."/>
             <div className="absolute top-4 right-3"><SearchIcon style={{opacity: '0.5'}}/>  </div>
         </div>
               <Button color='primary' variant='contained' style={{width: '150px', marginLeft: '4%', marginRight: '2%',  color: 'white'}} component={NavLink} to={`/users/add-user`}>ADD New </Button>
       
       <hr/>
         </div>
              </div>
            </div>
              {/* <div  style={{display: 'flex', justifyContent: 'flex-end'}}>
                 <div className="relative"> 
                 <input style={{ border: '2px solid whitesmoke',}} onChange={(e) => setSearchTerm(e.target.value)} type="text" className="h-14 w-96 pr-5 pl-5 rounded z-0 focus:shadow focus:outline-none" placeholder="Search Users..."/>
                  <div className="absolute top-4 right-3"> <i className="fa fa-search text-gray-400 z-20 hover:text-gray-500"></i> 
                  </div>
                   </div>
               <Button component={NavLink} to={`/users/add-user`}  style={{width: '15%', marginLeft: '4%', marginRight: '3%',color: 'white', backgroundColor: 'orange'}}>Add User</Button>
             
              
          
               
            </div> */}
              <br className='bg-gray-100'/>
               <br className='bg-gray-100'/>
              
                  <section class="text-gray-700 ">
                   
                    <div className=" ">
                        <div class="flex flex-wrap text-left">
                           
                                  
                        </div>
                    </div>
                </section>
                                             
                
               
               {isLoading && 
                    <CircularProgress  />
                   }
          <div class="flex flex-col">
  <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
      <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th scope="col" class="relative px-6 py-3">
                <span class="sr-only">Edit </span>
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
          { users.
           filter((data) => {
                                if(searchTerm === ""){
                                    return data
                                } else if (data.email.toLowerCase().includes(searchTerm.toLowerCase())){
                                        return data
                               }else if (data.firstName.toLowerCase().includes(searchTerm.toLowerCase())){
                                        return data
                               }
                               else if (data.lastName.toLowerCase().includes(searchTerm.toLowerCase())){
                                        return data
                               }else if (data.phone.toLowerCase().includes(searchTerm.toLowerCase())){
                                        return data
                                }
                                      
                            }).map((users) => (
                                     <>
                                           <UserItem key={users.id} users={users} />   
                                            <br />
                                      <br />
                                      </>
                 
                        ))
                            
                        } 
         
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
        </Container>
        
        </>
        </Page>
      
    )
}

export default Users
