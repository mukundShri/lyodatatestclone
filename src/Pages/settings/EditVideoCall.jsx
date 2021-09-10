import { Container, Switch, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase'

const EditVideoCall = () => {
  const [api_key, setApiKey] = useState('')
  const [session_id, setSessionId] = useState('')
  const [token, setToken] = useState('')
  const [config, setConfig] = useState([])
  const [disabled, setDisabled] = useState(true)
  useEffect(() => {
    db.collection('OpenTokConfig').doc('BkEGCdgSefXrFkEmzcCG').onSnapshot(snapshot => {
      const data = snapshot.data()
      setConfig(data)
      setApiKey(data.api_key)
      setSessionId(data.session_id)
      setToken(data.token)
    })
  }, [])

  const handleUpdate = () => {
    db.collection('OpenTokConfig').doc('BkEGCdgSefXrFkEmzcCG').update({api_key,session_id,token})
  }
    return (
//         <Container>
//             <div class="flex  bg-white-200 items-center justify-center  mt-7 mb-7">
//   <div class="grid bg-white rounded-lg shadow-xl w-11/12 md:w-9/12 lg:w-1/2">
  

//     <div class="flex justify-center">
//       <div class="flex">
//         <h1 class="text-gray-600 font-bold md:text-2xl text-xl">Change Video Call Configuration</h1>
//         <Switch onChange={(e) => setDisabled(!disabled)}/>
//       </div>
//     </div>
//     <form style={{padding: '25px'}} action="">

//         <TextField disabled={disabled} onChange={(e) => setApiKey(e.target.value)} value={api_key}  style={{marginBottom: '20px'}} fullWidth type="text" variant='outlined' placeholder='API key' />
//          <TextField disabled={disabled} onChange={(e) => setSessionId(e.target.value)} value={session_id} style={{marginBottom: '20px'}} fullWidth type="text" variant='outlined' placeholder='Session ID' />
//          <TextField disabled={disabled} onChange={(e) => setToken(e.target.value)} value={token} style={{marginBottom: '20px'}} fullWidth type="text" variant='outlined' placeholder='Token' />
//     </form>
        

    
//     <div class='flex items-center justify-center  md:gap-8 gap-4 pt-3 pb-5'>
      
//       <button disabled={disabled} onClick={(e) => handleUpdate(e)} class='w-auto bg-yellow-800 hover:bg-yellow-900 rounded-lg shadow-xl font-medium text-white px-4 py-2'>Update</button>
//     </div>

//   </div>
// </div>
//         </Container>
<>
           


<div class="bg-white border-4 container  ml-10 w-1/2">
  <h6>Update Video Call Details</h6>
  <div class="bg-white  rounded">
    <form action="" onSubmit={handleUpdate}>

      <div class="flex items-center mb-5">
        <label for="name" class="w-20 inline-block text-left mr-4 text-gray-500 text-gray-500">API Key </label>
        <input  name="name" onChange={(e) => setApiKey(e.target.value)} value={api_key} id="name" type="text"  class="border-b-2 border-gray-400 flex-1 py-2 placeholder-gray-300 outline-none focus:border-indigo-400"/>
      </div>
      <div class="flex items-center mb-5">
        <label for="name" class="w-20 inline-block text-left mr-4 text-gray-500 text-gray-500">Session ID</label>
        <textarea rows={3} onChange={(e) => setSessionId(e.target.value)} name="name" value={session_id} id="name" type="text"  class="border-b-2 border-gray-400 flex-1 py-2 placeholder-gray-300 outline-none focus:border-indigo-400"/>
      </div>
      <div class="flex items-center mb-5">
        <label for="name" class="w-20 inline-block text-left mr-4 text-gray-500 text-gray-500">Token</label>
        <textarea rows={3} onChange={(e) => setToken(e.target.value)} name="name" value={token} id="name" type="text"  class="border-b-2 border-gray-400 flex-1 py-2 placeholder-gray-300 outline-none focus:border-indigo-400"/>
      </div>

      
   
      
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

export default EditVideoCall
