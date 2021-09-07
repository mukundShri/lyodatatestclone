import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search'
import {  FormControl, InputLabel, MenuItem, Select, Typography } from '@material-ui/core';
import { db } from '../../firebase';
import { firebaseLooper } from '../../utils/tools';



const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
   wrapper: {
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden',
  paddingTop: 64,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 256
  },
  
  },
  container: {
      display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden'
  },
  content: {
    
      flex: '1 1 auto',
  height: '100%',
  overflow: 'auto'
    },
}));



export default function CallLogs() {
  const classes = useStyles();
  const [title, setTitle] = useState('')
  const [open, setOpen] = useState(false)
  const [batch, setBatch] = useState([])
  const [machines, setMachines] = useState([])
  useEffect(() => {
    db.collection('machineData').onSnapshot(doc => {
      const data = firebaseLooper(doc)
       setMachines(data)
     console.log(data)
    })
    db.collection('CallLogData').onSnapshot(doc => {
      const data = firebaseLooper(doc)
       setBatch(data)
     console.log(data)
    })
    
  }, [])

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleChange = (e) => {
    const mid = e.target.value
    db.collection('CallLogData').where('machine_id', '==', `${mid}`).onSnapshot(doc => {
      const data = firebaseLooper(doc)
       setBatch(data)
     console.log(data)
    })
  }
  return (
    <div style={{boxShadow: '0px 2px 6px #0000000A', background: '#FFFFFF 0% 0% no-repeat padding-box'}}>
    <br />
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
      
      <Typography style={{color:'#43425D',opacity: 0.68}} variant='h3' align='left' ><b style={{marginLeft:'24px',color:'#43425D'}}>Call Logs</b></Typography>
      
         <div style={{display: 'flex', justifyContent: 'flex-end'}}>
           
              <FormControl margin='dense' style={{width: '140px', marginRight: '2%', marginTop: '0'}} variant='outlined'>
                <InputLabel variant='outlined'>Machines</InputLabel>
                <Select onChange={handleChange} label="Machines">
                
                {machines.map((data) => (
                  <MenuItem value={data.id}>{data.title}</MenuItem>
                ))}
              </Select>
              </FormControl>
           
       
      <div className="relative mr-3"> 
            <input style={{ border: '2px solid whitesmoke'}} onChange={(e) => setTitle(e.target.value)} type="text" className="h-10 w-64 pr-8 pl-5 rounded z-0 focus:shadow focus:outline-none" placeholder="Search Calls..."/>
             <div className="absolute top-2 right-3"><SearchIcon style={{opacity: '0.5'}}/>  </div>
         </div>
      </div>
    </div>
   <br />
      <div >
        <div >
          {/* <Card className={classes.content}>
            <br/>
            
               <Typography style={{marginLeft:'24px' ,color:'#43425D', opacity: 0.68}} variant='h2' align='left' gutterBottom><b style={{marginLeft:'24px',color:'#43425D'}}>Call Logs</b></Typography>
            
        
            <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
            
              <select
             style={{width:"280px", border: '2px solid whitesmoke' }}
              onChange={handleChange}
              >
                <option value="" disabled selected hidden>Select Machine</option>
                {
                  machines.map(data => (
                    <option value={data.id}>{data.title}</option>
                  ))
                }
              </select>
              
       
   
        <div className="relative"> <input style={{width: '388px', border: '2px solid whitesmoke'}} onChange={(e) => setTitle(e.target.value)} type="text" className="h-14 w-96 pr-8 pl-5 rounded z-0 focus:shadow focus:outline-none" placeholder="Search anything..."/>
            <div className="absolute top-4 right-3"> <i className="fa fa-search text-gray-400 z-20 hover:text-gray-500"></i> </div>
        </div>

              </div>
             
               <TableContainer style={{padding: '15px'}} >
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{backgroundColor: '#43425D', color: 'white'}}><b>Manual</b></TableCell>
            <TableCell style={{backgroundColor: '#43425D', color: 'white'}} align="left"><b>User</b></TableCell>
            
            <TableCell style={{backgroundColor: '#43425D', color: 'white'}} align="left"><b>Step</b></TableCell>
           <TableCell style={{backgroundColor: '#43425D', color: 'white'}} align="right"><b>Date & Time</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
         
        </TableBody>
      </Table>
      <div style={{display: 'flex', justifyContent: 'flex-end'}}>
         
         
      </div>
      <div style={{width: '100%'}}>
           
      </div>
    </TableContainer>
          </Card> */}
        </div>
      </div>
      <div class="flex flex-col">
  <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
      <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Manual
              </th>
              {/* <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th> */}
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Step
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              {/* <th scope="col" class="relative px-6 py-3">
                <span class="sr-only">Edit</span>
              </th> */}
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
          {batch.
          filter((data) => {
              if(title === ""){
                  return data
              } else if (data.manual_name.toLowerCase().includes(title.toLocaleLowerCase())){
                      return data
              }else if (data.user_id.toLowerCase().includes(title.toLocaleLowerCase())){
                      return data
              }else if (data.step.toLowerCase().includes(title.toLocaleLowerCase())){
                      return data
              }
             
            })
          .slice(0,5).map((row) => (
            <tr>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div class="flex-shrink-0 h-10 w-10">
                  <img class="h-10 w-10 rounded-full" src="https://www.freeiconspng.com/uploads/phone-icon-01-18.png" alt=""/>
                </div>
                <div class="ml-4">
                  <div class="text-sm font-medium text-gray-900">
                    {row.step}
                  </div>
                  <div class="text-sm text-gray-500">
                    {row.user_id}
                  </div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{row.manual_name}</div>
              <div class="text-sm text-gray-500"></div>
            </td>
            {/* <td class="px-6 py-4 whitespace-nowrap">
              <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                Active
              </span>
            </td> */}
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {row.time.toDate().toString().substring(0,15)}
            </td>
            {/* <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>
            </td> */}
          </tr>
          ))}
            

           
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
    </div>
   
  )
}
