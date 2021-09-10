import { Container, LinearProgress, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase'
import { useSettingsStorage } from '../../utils/useSettingsStorage'

const EditNavbar = () => {

    const [navbar, setNavbar] = useState([])
    const [name, setName] = useState(navbar.name)
    const [file, setFile] = useState(null)
    const [error, setError] = useState('')
    
    const [disabled, setDisabled] = useState(true)
      const types = ["image/png", "image/jpeg", "image/jpg"];
    
    useEffect(() => {
       db.collection('company').doc('navbar').onSnapshot(snapshot => {
        const data = snapshot.data()
        setName(data.name)
        setNavbar(data)
       })
    }, [])
    const updateNavbar = (e) => {
      e.preventDefault()
        if(url){
              db.collection("company").doc('navbar').update({name,url})
        }
             db.collection("company").doc('navbar').update({name})
        
      
    }

      const handleChange = (e) => {
        let selectedFile = e.target.files[0];
        setDisabled(false)
        if (selectedFile) {
            if (types.includes(selectedFile.type)) {
                setError(null);
                setFile(selectedFile);
            } else {
                setFile(null);
                setError("Please select an image file (png or jpg)");
            }
        }
       
        
    }
    const {progress, url} = useSettingsStorage(file)
    return (
        <>
           


 <div class="bg-white border-4 container  ml-10 w-1/2">
   <h6>Update Company Details</h6>
   <div class="bg-white  rounded">
     <form action="" onSubmit={updateNavbar}>

       <div class="flex items-center mb-5">
         <label for="name" class="w-20 inline-block text-left mr-4 text-gray-500 text-gray-500">Name</label>
         <input onChange={(e) => setName(e.target.value)} name="name" id="name" type="text" placeholder="Company Name" class="border-b-2 border-gray-400 flex-1 py-2 placeholder-gray-300 outline-none focus:border-indigo-400"/>
       </div>

       <div class="flex items-center mb-10">
         <label for="twitter" class="w-20 inline-block text-left mr-4 text-gray-500 text-gray-500">Upload New Logo</label>
         <input onChange={handleChange}  type="file" name="twitter" id="twitter" placeholder="Your Twitter pseudonym" class="border-b-2 border-gray-400 flex-1 py-2 placeholder-gray-300 outline-none focus:border-indigo-400"/>
       </div>
       <LinearProgress variant="determinate" value={progress} />
       <b>Uploaded {progress} %</b>
       <br />
       <div class="text-right">
         <button type="submit" class="py-2 px-6 bg-indigo-600 text-white font-bold rounded">Save</button>
       </div>
     </form>
   </div>
 </div>

 

        </>
    )
}

export default EditNavbar
