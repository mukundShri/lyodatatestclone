import { Button, Typography } from "@material-ui/core"
import { useEffect,  useState } from "react"
import { database, db } from "../../firebase"
import { firebaseLooper, firebaseLooperTwo } from "../../utils/tools"
import GetAppIcon from '@material-ui/icons/GetApp';
import EditNavbar from "./EditNavbar";
import EditVideoCall from "./EditVideoCall";
import Page from "../../components/Page";
import AddApk from "./AddApk";
import { useAuth } from "../../components/context/AuthContext";
import AdminProfile from "../../components/AdminProfile/AdminProfile";
import AddGlass from "./AddGlass";
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
const Settings = () => {
    const [mobile, setMobile] = useState({})
    const [glass, setGlass] = useState({})
    const {currentUser} = useAuth()
    const [user, setUser] = useState([])
   
    useEffect(()=> {
        db.collection('apks').doc('mobile').onSnapshot(snapshot => {
            const data = snapshot.data()
            setMobile(data)
            
        })
        db.collection('apks').doc('glass').onSnapshot(snapshot => {
          const data = snapshot.data()
          setGlass(data)
          
      })
      db.collection('users').where('email', '==', `${currentUser.email}`).onSnapshot(snapshot => {
        const data = firebaseLooper(snapshot)
        setUser(data[0])
        console.log(data)
      })
     

    } ,[])
 

    return (
      <Page title='Settings | LyoIms'>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
              {/* <Typography style={{marginRight: '15px'}} variant='h1' align='center'><b>{mTitle} : </b></Typography> */}
              <div style={{paddingLeft: '3.8rem'}}
              >
                 <Typography variant='h1' align='left'><b>Settings</b></Typography>
                  <Typography align='left' variant='body2' > You can change configurations of application here </Typography>
              </div>
              <div>
              <div style={{display: 'flex', justifyContent: 'flex-end',  paddingRight: '4.6rem'}}>
               <Button href={mobile?.url} variant='contained'  endIcon={<PhoneAndroidIcon/>} style={{marginRight:'25px', backgroundColor: 'rgb(42, 181, 0)', color: 'white'}}> Download Mobile Apk</Button>
               <Button href={glass?.url} variant='contained'  endIcon={<PhoneAndroidIcon/>} style={{ backgroundColor: 'rgb(0, 84, 11)', color: 'white'}} endIcon={<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-eyeglasses" viewBox="0 0 16 16">
  <path d="M4 6a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm2.625.547a3 3 0 0 0-5.584.953H.5a.5.5 0 0 0 0 1h.541A3 3 0 0 0 7 8a1 1 0 0 1 2 0 3 3 0 0 0 5.959.5h.541a.5.5 0 0 0 0-1h-.541a3 3 0 0 0-5.584-.953A1.993 1.993 0 0 0 8 6c-.532 0-1.016.208-1.375.547zM14 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/>
</svg>}>Download Glass Apk</Button>
       <hr/>
         </div>
              </div>
            </div>
       {
         user.role === 'Admin'?
         <>
        <section style={{paddingLeft: '3.8rem'}} className='flex'>
          <div className='w-1/3 mr-14 mt-14'>
            {/* <AdminProfile user={user}/> */}
            <EditNavbar/>
            <br />
            <br />
            <EditVideoCall/>
          </div>
        
        <AddApk/>
        <div className='w-6'>

        </div>
        <AddGlass/>
 
</section>

</>
: 
<div>
  No Access
</div>
}
      </Page>
        
    
    )
}

export default Settings
