import React, { useEffect, useRef, useState } from 'react';

import Alert from '@material-ui/lab/Alert';

import ReCAPTCHA from "react-google-recaptcha";



export default function Tests() {

  const [error, setError] = useState("")

 



  return (

<section className="flex flex-col bg-black  items-center h-screen md:flex-row ">
            <div className="hidden w-1/2 h-screen bg-white lg:block md:w-1/3 lg:w-2/3">
                {/* image should be put here - some illustration from undraw */}
              <img src="http://www.heynic.com/wp-content/uploads/2020/04/splash-image001.png"  alt="" className="object-cover w-full h-full"/>
            </div>
            <div className="flex items-center justify-center w-full h-screen px-6 bg-black md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 lg:px-16 xl:px-12">
              <div class="w-full mt-40 text-white h-100">
              <div style={{display: 'flex', justifyContent: 'center'}}>
                   <img src="https://www.hakimgroup.co.uk/wp-content/uploads/2015/10/logo.png" width='50%' />
               
               </div>
           
               
                <h1 class="mt-32 text-2xl font-semibold text-white tracking-ringtighter sm:text-3xl title-font">Log in to your account</h1>
                <form class="mt-6" action="#"  method="POST">
                {error && <><Alert severity='error'>{error}</Alert>  <br /></>}
               
                  <div>
                    <label class="block text-sm font-medium leading-relaxed tracking-tighter text-blueGray-700">Email Address</label>
                    <input type="email"  name="" id="" placeholder="Your Email " class="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-blueGray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 "/>
                  </div>
               <div>

               </div>
                 
                  <div style={{display: 'flex', justifyContent: 'center'}} class="mt-2 text-center">
                    <ReCAPTCHA
            sitekey="6LecexYcAAAAAJS_LsECbPeGgdmM1MzOj23AaCAA"
            
            />
                  </div>
                  <button type="submit" class="block w-full px-4 py-3 mt-6 font-semibold text-white transition duration-500 ease-in-out transform rounded-lg bg-gradient-to-r from-blue-200 hover:from-gray-300 to-blue-900 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 hover:to-black">Log In</button>
                </form>
                <hr class="w-full my-6 border-blueGray-300"/>
                
              </div>
            </div>
           
          </section>
        
  );
}