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
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';
import { NavLink, useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from '../Logo';
import Navbar from './Navbar';
import { db } from '../../firebase';
import './Login.css'
import animation from '../../assets/images/animation.gif'
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { FormControl, IconButton, Input, InputAdornment, InputLabel, OutlinedInput } from '@material-ui/core';
import illustration from '../../assets/images/illustration.png'

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

const ValidationTextField = withStyles({
  root: {
    '& input:valid + fieldset': {
      borderColor: 'black',
      borderWidth: 2,
    },
    '& input:invalid + fieldset': {
      borderColor: 'red',
      borderWidth: 2,
    },
    '& input:valid:focus + fieldset': {
      borderLeftWidth: 6,
      padding: '4px !important',
      color: 'black' ,
      border: '1px solid black' ,
                   // override inline-style
    },
  },
})(TextField);

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },

  cssLabel: {
    color : 'green'
  },

  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: `${theme.palette.primary.main} !important`,
    }
  },

  cssFocused: {},

  notchedOutline: {
    borderWidth: '1px',
    borderColor: 'green !important'
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#ff7a00',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  button_submit: {
      background:'#ff7a00',
      borderRadius: '15px',
      margin: theme.spacing(3, 0, 2),
  }
}));

export default function LogIn() {
  const classes = useStyles()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()
   const [navbar, setNavbar] = useState([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const [passwordOn, setPasswordOn] = useState("password")

  useEffect(() => {
     db.collection('company').doc('navbar').onSnapshot(snapshot => {
      const data = snapshot.data()
      setNavbar(data)
    })
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await login(email,password)
      history.push("/")
    } catch {
      setError("Failed to Login. Invalid credentials !")
    }

    setLoading(false)
  }

  return (

<section className="flex flex-col bg-black  items-center h-screen md:flex-row ">
            <div className="hidden w-1/2 h-screen bg-white lg:block md:w-1/3 lg:w-2/3">
              <img src={illustration} alt="" className="object-cover w-full h-full"/>
            </div>
            <div className="flex items-center justify-center w-full h-screen px-6 bg-black md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 lg:px-16 xl:px-12">
              <div class="w-full mt-32 text-white h-100">
              <div style={{display: 'flex', justifyContent: 'center'}}>
                   <img src={navbar.url} width='70px' height='70px'/>
               
               </div>
               <h2 class="text-lg mt-16 text-center font-bold tracking-tighter  text-white uppercase duration-500 ease-in-out transform ttransition hover:text-lightBlue-500 dark:text-blueGray-400"> {navbar.name} </h2>
               
                <h1 class="mt-12 text-2xl font-semibold text-white tracking-ringtighter sm:text-3xl title-font">Log in to your account</h1>
                <form class="mt-6" action="#" onSubmit={handleSubmit} method="POST">
                {error && <><Alert severity='error'>{error}</Alert>  <br /></>}
               
                  <div>
                    <label class="block text-sm font-medium leading-relaxed tracking-tighter text-blueGray-700">Email Address</label>
                    <input type="email" onChange={(e) => setEmail(e.target.value)} name="" id="" placeholder="Your Email " class="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-blueGray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 "/>
                  </div>
                  <div class="mt-4 relative">
                    <label class="block text-sm font-medium leading-relaxed tracking-tighter text-blueGray-700">Password</label>
                    
                    <input type={passwordOn} name="" onChange={(e) => setPassword(e.target.value)} id="" placeholder="Your Password" minlength="6" class="w-full px-4 py-2 text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-blueGray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 " required=""/>
                    <div class="absolute inset-y-0 top-6 right-0 flex items-center px-2">
      <input class="hidden js-password-toggle" id="toggle" type="checkbox" />
      { passwordOn === "password" ?
                          <IconButton onClick={(e) => setPasswordOn("text")}>
                            <VisibilityOffIcon/>
                          </IconButton>
                          : 
                          <IconButton onClick={(e) => setPasswordOn("password")}>
                            <VisibilityIcon/>
                          </IconButton>
                        } 
                               
                          
    </div>
                 </div>
                  {/* <div class="relative w-full">
   
    <input class="appearance-none border-2 rounded w-full py-3 px-3 leading-tight border-gray-300 bg-gray-100 focus:outline-none focus:border-indigo-700 focus:bg-white text-gray-700 pr-16 font-mono js-password" id="password" type="password" autocomplete="off"
    />
  </div> */}
                  <div class="mt-2 text-right">
                    <NavLink to="/forgotPass" class="text-sm font-semibold leading-relaxed text-blueGray-700 hover:text-gray-600 focus:text-blue-700">Forgot Password?</NavLink>
                  </div>
                  <button type="submit" class="block w-full px-4 py-3 mt-6 font-semibold text-white transition duration-500 ease-in-out transform rounded-lg bg-gradient-to-r from-yellow-300 hover:from-gray-300 to-yellow-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 hover:to-black">Log In</button>
                </form>
                <hr class="w-full my-6 border-blueGray-300"/>
                
              </div>
            </div>
           
          </section>
        
  );
}