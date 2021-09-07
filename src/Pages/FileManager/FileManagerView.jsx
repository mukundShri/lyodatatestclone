import { Button, TextField, Typography } from "@material-ui/core"
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { firebaseLooper } from "../../utils/tools";
import AddFiles from "./AddFiles"
import FileView from "./FileView";
import {NavLink} from 'react-router-dom'
 import SearchIcon from '@material-ui/icons/Search'
 const FileManagerView = () => {
     const [fileData, setFileData] = useState([
       {
         title: '',
         desc: '',
       }
     ])
     const [title, setTitle] = useState('')
     useEffect(() => {
        db.collection('FileManager').onSnapshot(doc => {
            const data = firebaseLooper(doc)
            setFileData(data)
        })
     }, [])
  return (
      <div style={{paddingLeft: '3.5rem', paddingRight:'3.5rem'}}>
      {/* <Typography variant='h1' align='center'><b>File Manager</b></Typography>
               <Typography variant='body2' align='center' gutterBottom >These are all your Files</Typography> */}
                {/* <div style={{display: 'flex', justifyContent: 'flex-end'}}>
               
                 <div className="relative"> 
                 
                 <input style={{ border: '2px solid whitesmoke'}} onChange={(e) => setTitle(e.target.value)} type="text" className="h-14 w-96 pr-8 pl-5 rounded z-0 focus:shadow focus:outline-none" placeholder="Search Files..."/>
                  <div className="absolute top-4 right-3"> <i className="fa fa-search text-gray-400 z-20 hover:text-gray-500"></i> </div>
              </div>
               <Button component={NavLink} to={`/Add-files`}  style={{width: '10%', marginLeft: '4%', marginRight: '3%',color: 'white', backgroundColor: 'orange'}}>Add Files</Button>
              </div> */}

<div style={{display: 'flex', justifyContent: 'space-between'}}>
              {/* <Typography style={{marginRight: '15px'}} variant='h1' align='center'><b>{mTitle} : </b></Typography> */}
              <div style={{paddingLeft: '3.8rem'}}
              >
                 <Typography variant='h1' align='left'><b>File Manager</b></Typography>
                  <Typography align='left' variant='body2' > These are all the available files </Typography>
              </div>
              <div>
              <div style={{display: 'flex', justifyContent: 'flex-end',  paddingRight: '3.2rem'}}>
               
               <div className="relative"> 
            <input style={{ border: '2px solid whitesmoke'}} onChange={(e) => setTitle(e.target.value)} type="text" className="h-14 w-96 pr-8 pl-5 rounded z-0 focus:shadow focus:outline-none" placeholder="Search Files..."/>
             <div className="absolute top-4 right-3"><SearchIcon style={{opacity: '0.5'}}/>  </div>
         </div>
               <Button color='primary' variant='contained' style={{width: '150px', marginLeft: '4%', marginRight: '2%',  color: 'white'}} component={NavLink} to={`/Add-files`}>ADD New </Button>
       
       <hr/>
         </div>
              </div>
            </div>
            <br/>
            <br />
    {/* <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
         
      <div className="grid gap-8 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full">
      
      </div>
    </div> */}
    <div style={{paddingLeft: '3.5rem', paddingRight:'3.5rem'}} class="flex flex-col">
  <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
      <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                File Name
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Option
              </th>
              {/* <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th> */}
              <th scope="col" class="relative px-6 py-3">
                <span class="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
           
          {
           fileData.
          filter((data) => {
              if(title === ""){
                  return data
              } else if (data.title.toLowerCase().includes(title.toLocaleLowerCase())){
                      return data
              }else if (data.desc.toLowerCase().includes(title.toLocaleLowerCase())){
                      return data
              }
             
            }).map(data => (
               <FileView key={data.id} data={data}/>
           ))
       }
           
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

    </div>
  );
};

export default FileManagerView