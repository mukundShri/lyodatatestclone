import React, { useEffect, useRef, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';
import { NavLink, useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { db } from '../../firebase';
import forgot from '../../assets/images/forgot.png'
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="">
        Arizon Systems Pvt Ltd.
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#141256',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  button_submit: {
      background:'#141256',
      borderRadius: '20px',
      margin: theme.spacing(3, 0, 2),
  }
}));

export default function ForgotPass() {
  const classes = useStyles()
  const [email, setEmail] = useState('')
  const { resetPassword } = useAuth()
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
   const [navbar, setNavbar] = useState([])

    async function handleSubmit(e) {
        e.preventDefault()

        try {
        setMessage("")
        setError("")
        setLoading(true)
        await resetPassword(email)
        setMessage("Check your inbox for further instructions")
        } catch {
        setError("Failed to reset password ! Email doesn't exist in database. Contact admin if this is a mistake")
        }

        setLoading(false)
    }

    useEffect(() => {
       db.collection('company').doc('navbar').onSnapshot(snapshot => {
      const data = snapshot.data()
      setNavbar(data)
    })
    }, [])
  return (


 <section class="flex flex-col bg-black items-center h-screen md:flex-row ">
            <div class="relative hidden w-full h-screen bg-blueGray-400 lg:block md:w-1/3 xl:w-1/3">
              <img src={forgot} alt="" class="absolute object-cover w-full h-full"/>
              <div class="relative z-10 m-12 text-left">
                <a class="flex items-center   mb-4 font-medium text-blueGray-900 title-font md:mb-10">
                  {/* <div class="w-2 h-2 p-2 mr-2 rounded-full bg-gradient-to-tr from-yellow-300 to-yellow-600">
                  </div> */}
                  <img style={{marginRight: '20px'}} src={navbar.url} width='70px' height='70px'/>
                  <h2 class="text-lg  font-bold tracking-tighter text-black uppercase transition duration-500 ease-in-out transform hover:text-lightBlack-500 dark:text-lightBlue-400"> {navbar.name} </h2>
                </a>
              </div>
            </div>
            <div class="flex align-center mt-64 w-full h-screen px-6 bg-whitelack md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 lg:px-16 xl:px-12 items-left justify-left">
              <div class="w-full py-32 lg:py-6 lg:h-100">
                <h1 class="my-12 font-black tracking-tighter text-white 2xl sm:text-5xl title-font">Reset Password</h1>
               
              <form class="mt-6" action="#" method="POST" onSubmit={handleSubmit}>
              {error && <><Alert severity='error'>{error}</Alert>  <br /></>}
                <div>
                  <label class="text-base font-medium leading-relaxed text-gray-100">Email Address</label>
                  <input onChange={(e) => setEmail(e.target.value)} type="email" name="" id="" placeholder="Your Email " class="w-full px-4 py-2 mt-2 text-base text-blue-700 border-transparent rounded-lg bg-blueGray-100 ext-blue-700 focus:border-blueGray-500 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2" autocomplete="" required=""/>
                </div>
             
                <div class="mt-2 text-right">
    
                </div>
                <button type="submit" class="block w-full px-4 py-3 mt-6 font-semibold text-white transition duration-500 ease-in-out transform rounded-lg bg-gradient-to-r from-yellow-300 hover:from-gray-300 to-yellow-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 hover:to-black">Reset </button>
              </form>
              <p class="mt-8 text-center">Remembered password? <NavLink to="/login" class="font-semibold text-blue-500 hover:text-blue-400">Log In</NavLink></p>
            </div>
        </div>
  </section>
  
  );
}