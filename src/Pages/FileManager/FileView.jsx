import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormHelperText, TextField } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'
import React, { useState } from 'react'
import { db } from '../../firebase'
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import './FileView.css'
const FileView = ({data}) => {
   const [open, setOpen] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
      const [title, setTitle] = useState(data.title)
    const [desc, setDesc] = useState(data.desc)
    const [error, setError] = useState('')
   
   const handleClickOpen = () => {
    setOpen(true);
  };

   const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = () => {
      setOpenEdit(true)
    }
  const handleEditClose = () => {
      setOpenEdit(false)
    }
    const handleDelete = (id) => {
    db.collection('FileManager').doc(id).delete()
}
  const updateFile = (e) => {
    e.preventDefault()
   if(title?.trim().length === 0 || desc?.trim().length === 0){
     return setError("Empty strings are not accepted as valid inputs!")
   }
      db.collection('FileManager').doc(data.id).update({title,desc}).then((data)=>{
              console.log(data)
              openEdit(false)
              setError("")
      })
  }

    return (
      <>

        <>
        <tr className="file-view">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <img class="h-10 w-10 rounded-full" src="https://i.pinimg.com/474x/fe/dc/ee/fedceef43b1e8c83b404245a6686bafe.jpg" alt=""/>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">
                      {data.title}
                    </div>
                    <div class="text-sm text-gray-500">
                      Uploaded : {data.date}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900 ">{data.desc?.slice(0,30)}{data.desc.length > 30 ? <p>...</p>: <p></p>}</div>
                <div class="text-sm text-gray-500"></div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                  <a href={data.url} className='text-yellow-800 hover:text-yellow-800' style={{textDecoration: 'none'}}>Open</a>
                </span>
              </td>
              {/* <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                Admin
              </td> */}
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <Button onClick={handleEdit}><EditIcon style={{opacity: '0.5'}}/></Button>
             <Button onClick={handleClickOpen}><DeleteForeverIcon style={{opacity: '0.5'}} /> </Button>
              </td>
            </tr>
          {/* <img
            src="https://img.freepik.com/free-vector/illustration-document-icon_53876-28510.jpg?size=626&ext=jpg"
            className="object-cover w-full h-64"
            alt=""
          /> */}
          {/* <div className="p-5 border border-t-0">
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <p className="mb-3 text-xs font-semibold tracking-wide uppercase">
              <a
                
                className="transition-colors duration-200 text-blue-gray-900 hover:text-deep-purple-accent-700"
                aria-label="Category"
                title="traveling"
              >
                Uploaded on
              </a>
              <span className="text-gray-600">— {data.date}</span>
            </p>
            <Button onClick={handleEdit}><EditIcon/></Button>
             <Button onClick={handleClickOpen}><DeleteForeverIcon/> </Button>
            </div>
            
            <a
              href={data.url}
              aria-label="Category"
              title="Simple is better"
              className="inline-block mb-3 text-2xl font-bold leading-5 transition-colors duration-200 hover:text-yellow-700 text-yellow-900"
            >
              {data.title}
            </a>
            <p className="mb-2 line-clamp-1 text-gray-700">
              {data.desc}
            </p>
            <a
              href={data.url}
              aria-label=""
              className="inline-flex items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
            >
              Open
            </a>
          </div> */}
          <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                  <Alert severity="error" variant="filled">
                    <AlertTitle><strong>Delete</strong></AlertTitle>
                    <DialogTitle id="alert-dialog-title">{"Are You Sure You Want To Delete?"}</DialogTitle>
                    <DialogContent>
                    <DialogContentText color="white" id="alert-dialog-description">
                        Deleting will be a permanent action and data pervailing will be permanently deleted and can not be retrieved back.                    </DialogContentText>
                    </DialogContent>
                    </Alert>
                    <DialogActions>
                    <Button onClick={handleClose} color="primary" >
                        Disagree
                    </Button>
                    <Button   onClick={(e)=>{
                        handleDelete(data.id);
                         handleClose()}} color="secondary"  autoFocus>
                        Agree
                    </Button>
                    </DialogActions>
                </Dialog>
                 <Dialog
                 fullWidth
                    open={openEdit}
                    onClose={handleEditClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                   <DialogTitle id="alert-dialog-title">{<b>Edit Details </b>}</DialogTitle>
                     {error && <Alert severity='error'>{error}</Alert>}
                      <DialogContent>

                           <form onSubmit={(e) => {updateFile(e)}}>
                    <TextField
                       
                        defaultValue={title}                       
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          id="title"
                          error={title.length > 30}
                          name="title"
                          autoFocus
                          onChange={(e) => setTitle(e.target.value)}
                        />
                        <FormHelperText>Title should be max {title.length}/30 </FormHelperText>
                        <TextField
                        defaultValue={desc}
                          variant="outlined"
                          margin="normal"
                          required
                          rows={5}
                          error={desc.length > 150}
                          fullWidth
                          name="desc"
                          onChange={(e) => setDesc(e.target.value)}
                          id="desc"
                          multiline
                        />
                         <FormHelperText>Description should be max {desc.length}/150</FormHelperText>
                          <DialogActions>
                            <Button color="secondary" onClick={handleEditClose}>Cancel</Button>
                            <Button disabled={title.length > 30 || desc.length > 150} type="submit" variant='contained' color='primary'>Update</Button> 
                          </DialogActions>
                      </form>  
                      </DialogContent>
               
                </Dialog>
        </>
      </>

    )
}

export default FileView
