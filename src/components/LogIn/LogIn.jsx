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
        <div  style={{backgroundColor: 'orange', color: 'white'}}>

        <div className="bg-yellow-800 font-family-karla h-screen">

    <div className="w-full flex flex-wrap">
        <div  className="w-1/2 shadow-2xl  ">
            <div style={{display:'flex', justifyContent: 'center'}} className="object-cover align-center m-auto w-full h-screen hidden md:block ">
              {/* <img className='verticalCenter' src={navbar.url} alt="" /> */}
              <img src={animation} />
            </div>
        </div>
        <div className="w-full   w md:w-1/2 flex flex-col">

          
          
            <div data-aos='fade-up-left' data-aos-duration="2000" className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-36">
              <div style={{display: 'flex', justifyContent: 'center'}}>
                  <img src={navbar.url} width='70px' height='70px'/>
               
              </div>
              <p style={{font: 'normal normal bold 40px/21px Montserrat', letterSpacing: '2.36px',  opacity: 1}}  className="text-center text-black font-bold text-xl p-4">
              
              {navbar.name}</p>
            
            <p style={{font: 'normal normal normal 20px/13px Roboto', opacity: 0.5}} className="text-center text-black text-3xl">Welcome back! Please login to your account.</p>
                 {error && <b style={{color: 'red'}}>{error}</b>}
                <form style={{justifyContent: 'center'}} className="flex flex-col pt-3 md:pt-8" onSubmit={handleSubmit}>
                   
                        <TextField
                         style={{backgroundColor: 'white'}}
                         InputLabelProps={{
                          style: { color: 'black' },
                        }}
                        InputProps={{
                          classes: {
                            root: classes.cssOutlinedInput,
                            focused: classes.cssFocused,
                            notchedOutline: classes.notchedOutline,
                          },
                         
                        }}
                         className='mb-4' variant='outlined'  required onChange={(e) => setEmail(e.target.value)} type="email" id="email" label="Email" />
                        {/* <ValidationTextField
                      
                        variant='outlined' type='email' label="Email"  /> */}
                        <div style={{display: 'flex'}}>
                          <FormControl 

                          
                          style={{backgroundColor: 'white'}}  required variant='outlined' fullWidth>
                          <InputLabel style={{color: 'black'}} htmlFor="outlined-adornment-password">Password</InputLabel>
                          <OutlinedInput  
                           InputLabelProps={{
                            style: { color: 'black' },
                          }}
                          onChange={(e) => setPassword(e.target.value)} type={passwordOn} id="password" label="Password" 
                            endAdornment={
                              <InputAdornment position="end">
                               
                                  { passwordOn === "password" ?
                          <IconButton onClick={(e) => setPasswordOn("text")}>
                            <VisibilityOffIcon/>
                          </IconButton>
                          : 
                          <IconButton onClick={(e) => setPasswordOn("password")}>
                            <VisibilityIcon/>
                          </IconButton>
                        } 
                               
                              </InputAdornment>
                            }
                          
                          />
                          </FormControl>
                        
                       
                        </div>
                        
                  
    
                   <button type='submit' style={{backgroundColor: 'black', alignItems: 'center', marginLeft: '25%'}} className="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8 w-50 " >Log In</button>
                </form>
                <div className="text-center text-black pt-12 pb-12">
                    <p>Don't remember password? <Button component={NavLink} to="/forgotPass" style={{color: 'blue', textDecoration: 'none'}} >Reset Password.</Button></p>
                </div>
            </div>

        </div>
    </div>

</div>
        </div>
  );
}