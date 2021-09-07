import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormHelperText, TableBody, TableCell, TableRow, TextField, Typography } from "@material-ui/core"
import  EditIcon from "@material-ui/icons/Edit"
import DeleteForeverIcon from "@material-ui/icons/DeleteForever"
import { Alert, AlertTitle } from "@material-ui/lab"
import { useState } from "react"
import { db } from "../../../firebase"

function DQComponentsView({components, match, module_id}) {
	const [title, setTitle] = useState(components.title)
	const [value, setValue] = useState(components.value)
	const [error, setError] = useState("")
	const [open, setOpen] = useState(false)
	const [openDel, setOpenDel] = useState(false)
	function handleOpenDel(){
		setOpenDel(true)
	}
	function handleCloseDel(){
		setOpenDel(false)
		
	}
	function handleOpen(){
		setOpen(true)
	}
	function handleClose(){
		setOpen(false)
	}
	function handleUpdate(e){
		e.preventDefault()
		if(title?.trim().length === 0 || value?.trim().length === 0){
			return setError("Empty strings are not accepted as valid strings ! Please try again with a valid string")
		}
		db.collection('DQNew')
		.doc(match.params.id)
		.collection('content')
		.doc('config')
		.collection('components')
		.doc(components.id)
		.update({title, value})
		.then(() => {setOpen(false)})
	}
	function handleDelete(id){
		db.collection('DQNew')
		.doc(match.params.id)
		.collection('content')
		.doc('config')
		.collection('components')
		.doc(id)
		.delete()
	}
	return (
		<>
		<TableBody>
			
			<TableRow key={components.id}>
			<TableCell style={{background: '#E8F6EF'}}  component="th" scope="row" align='left'>
				{components.title}
			</TableCell>
			
			<TableCell  align='left'>
				{components.value}
			</TableCell>
			<TableCell align="right">
				<div>
					<Button  onClick={handleOpen}><EditIcon className='animate-bounce'/></Button>
					<Button onClick={handleOpenDel}><DeleteForeverIcon className='hover:text-red-600'/></Button>
					
				</div>
			</TableCell>
			</TableRow>
		
			</TableBody>
			 <Dialog style={{alignItems: 'center'}} fullWidth open={open} onClose={handleClose}>
				<form onSubmit={handleUpdate}>
					{error && <Alert severity='error'>{error}</Alert>}
					<DialogContent>
					<Typography variant='h4' align='center' gutterBottom><b>Edit Details</b></Typography>
					
					<TextField required label="Title" error={title.length > 30}  value={title} variant='outlined' fullWidth onChange={(e) => setTitle(e.target.value)}/>
					<FormHelperText style={{marginBottom: '3%'}}>Title should be max {title.length}/30</FormHelperText>
					<TextField  value={value} variant='outlined' error={value.length > 300} fullWidth onChange={(e) => setValue(e.target.value)}/>
					<FormHelperText style={{marginBottom: '3%'}}>Value should be max {value.length}/300</FormHelperText>
				</DialogContent>
				
				
			<DialogActions>
				<Button variant='contained' color='secondary' onClick={handleClose}>Cancel</Button>
				<Button type='submit' style={{backgroundColor: 'orange', color: 'whitesmoke'}}>Update</Button>
			</DialogActions>
			</form>
			</Dialog>
			{/* Open delete dialog */}
			 <Dialog
			 
                    open={openDel}
                    onClose={handleCloseDel}
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
                    <Button onClick={handleCloseDel} color="primary" variant="outlined">
                        Disagree
                    </Button>
                    <Button   onClick={(e) => handleDelete(components.id)} color="secondary" variant="outlined" autoFocus>
                        Agree
                    </Button>
                    </DialogActions>
                </Dialog>
		</>
	)
}

export default DQComponentsView
