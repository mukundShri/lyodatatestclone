import { Button, Dialog, DialogActions,Toolbar, DialogContent, DialogContentText, DialogTitle, TableBody, TableCell, TableRow, TextField, Typography } from "@material-ui/core"
import { Alert, AlertTitle } from "@material-ui/lab"
import { useState } from "react"
import { db } from "../../../firebase"
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { FormHelperText } from "@material-ui/core";

function AbbView({module, match}) {
	const [short, setShort] = useState(module.short)
	const [full, setFull] = useState(module.full)
	const [error, setError] = useState('')
	const [open, setOpen] = useState(false)
	const [openDel, setOpenDel] = useState(false)
	const [openC, setOpenC] = useState(false)
	function handleOpenDel(){
		setOpenDel(true)
	}
	function handleCloseDel(){
		setOpenDel(false)
		
	}
	function openComponent(){
		setOpenC(true)
	}
	function closeComponent(){
		setOpenC(false)
		
	}
	function handleOpen(){
		setOpen(true)
	}
	function handleClose(){
		setOpen(false)
	}
	function handleUpdate(e){
		e.preventDefault()
		if(short?.trim().length === 0 || full?.trim().length === 0){
			return setError("Empty strings are not accepted as valid strings! Please try again with a valid string")
		}
		db.collection('DQNew').doc(match.params.id)
		.collection('content').doc('abbreviations')
		.collection('details')
		.doc(module.id)
		.update({short, full})
		.then(() => {
			setOpen(false)
			 setError("")})
	}
	function handleDelete(id){
		db.collection('DQNew').doc(match.params.id)
		.collection('content').doc('abbreviations')
		.collection('details')
		.doc(id)
		.delete()
	}
	return (
		<>
		<TableBody>
			
			<TableRow key={module.id}>
				
			<TableCell className='text-3xl'  scope="row">
				⚫
			</TableCell>
			<TableCell align="left">{module.short}</TableCell>
			<TableCell align="left">{module.full}</TableCell>
			
			<TableCell align="right">
				<div>
					<Button  onClick={handleOpen}><EditIcon/></Button>
					<Button onClick={handleOpenDel}><DeleteIcon/></Button>
		
				</div>
			</TableCell>
			</TableRow>
		
			</TableBody>
			 <Dialog style={{alignItems: 'center'}} fullWidth open={open} onClose={handleClose}>
				{error && <Alert severity='error'>{error}</Alert>}
				<form onSubmit={handleUpdate} >
					<DialogContent>
					<Typography variant='h4' align='center' gutterBottom><b>Edit Details</b></Typography>
					
						
					<TextField required label="Short Form"  value={short} variant='outlined' fullWidth onChange={(e) => setShort(e.target.value)}/>
					<FormHelperText style={{marginBottom: '3%'}}>Short form can be max {short.length}/10 characters</FormHelperText>
					<TextField label="Long Form" style={{marginBottom: '3%'}} required  value={full} variant='outlined' fullWidth onChange={(e) => setFull(e.target.value)}/>
				
				
				</DialogContent>
				
				
			<DialogActions>
				<Button onClick={handleClose}>Cancel</Button>
				<Button type="submit" disabled={short.length > 10}  style={{backgroundColor: 'orange', color: 'whitesmoke'}}>Update</Button>
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
                    <Button   onClick={(e) => handleDelete(module.id)} color="secondary" variant="outlined" autoFocus>
                        Agree
                    </Button>
                    </DialogActions>
                </Dialog>
		
		</>
	)
}

export default AbbView