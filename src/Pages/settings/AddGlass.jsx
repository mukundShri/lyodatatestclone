import { Button, FormHelperText, Switch} from "@material-ui/core";
import { DropzoneArea } from "material-ui-dropzone";
import { useState } from "react";
import { db } from "../../firebase";
import { useStorage } from "../../utils/useStorage";

function AddGlass() {
    const [apk, setApk] = useState(false)
    const [file,setFile] = useState(null)
    const [version, setVersion] = useState("")
    const [about, setAbout] = useState("")
    const handleChange = (loadedFiles) => {
        let selectedFile = loadedFiles[0]
        setFile(selectedFile)
    }

    const {url, progress} = useStorage(file)

    function updateMobile(){

        db.collection("apks").doc('mobile').update({url,version,about})
    }

    function updateGlass(e){
e.preventDefault()
        db.collection("apks").doc('glass').update({url,version,about})
    }

    return (
        <>
        <div>
   <div >
     
     <div class="mt-5 md:mt-0 md:col-span-2">
       <form onSubmit={updateGlass} action="#" method="POST">
    
         <div class="shadow sm:rounded-md sm:overflow-hidden">
       
        <div style={{display:'flex', justifyContent: 'flex-start'}}>
        <h6 className='mt-2 ml-3'>Glass Apk Upload</h6>
            </div> 
           
           <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
             <div class="grid grid-cols-3 gap-6">
               <div class="col-span-3 sm:col-span-2">
                 <label for="company_website" class="block text-sm font-medium text-gray-700">
                  Version Number
                 </label>
                 <div class="mt-1 flex rounded-md shadow-sm">
                   <span class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    Ver
                   </span>
                   <input required onChange={(e) => setVersion(e.target.value)} type="text" name="company_website" id="company_website" class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder=" your version number"/>
                 </div>
               </div>
             </div>
 
             <div>
               <label for="about" class="block text-sm font-medium text-gray-700">
                 About
               </label>
               <div class="mt-1">
                 <textarea onChange={(e) => setAbout(e.target.value)} id="about" name="about" required rows="3" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="you@apk changes"></textarea>
               </div>
               <p class="mt-2 text-sm text-gray-500">
                 Brief description for your APK. URLs are hyperlinked.
               </p>
             </div>
 
            
             <div>
               <label class="block text-sm font-medium text-gray-700">
                 Upload APK
               </label>
               <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                 <div class="space-y-1 text-center">
                   
                   <div class="flex text-sm text-gray-600">
                     <label for="file-upload" class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                       
                       <DropzoneArea
                         showFileNames
                          onChange={(loadedFiles) => handleChange(loadedFiles)}
                          showAlerts={false}
                          filesLimit={1}
                          dropzoneText="Upload a file / Drag and Drop"
                     />
                     </label>
                    
                   </div>
                   <p class="text-xs text-gray-500">
                     APK
                   </p>
                 </div>
               </div>
             </div>
           </div>
           <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
             <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
               Save
             </button>
           </div>
         </div>
       </form>
     </div>
   </div>
 </div>
         </>
        
    )
}

export default AddGlass
