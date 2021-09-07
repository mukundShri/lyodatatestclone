import { Button, Dialog, DialogActions,Toolbar, DialogContent, DialogContentText, DialogTitle, TableBody, TableCell, TableRow, TextField, Typography } from "@material-ui/core"
import { Alert, AlertTitle } from "@material-ui/lab"
import { useState } from "react"
import { db } from "../../../firebase"
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { FormHelperText } from "@material-ui/core";

function ServiceView({module, match}) {
	const [req, setReq] = useState(module.req)
	const [desc, setDesc] = useState(module.desc)
	const [inst, setInst] = useState(module.inst)
	const [error, setError] = useState("")
	const [connection, setConnection] = useState(module.connection)
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
		e.preventDefault();
		if(desc?.trim().length === 0 || connection?.trim().length === 0 || req?.trim().length === 0 || inst?.trim().length === 0){
			return setError("Empty strings are not accepted as a valid input! Please try again with a valid string")
		}
		db.collection('DQNew').doc(match.params.id)
		.collection('content').doc('config')
		.collection('components')
		.doc(module.id)
		.update({inst,connection,req, desc})
	}
	function handleDelete(id){
		db.collection('DQNew').doc(match.params.id)
		.collection('content').doc('config')
		.collection('components')
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
			<TableCell align="left">{module.desc}</TableCell>
			<TableCell align="left">{module.req}</TableCell>
			<TableCell align="left">{module.inst}</TableCell>
			<TableCell align="left">{module.connection}</TableCell>
			
			<TableCell align="right">
				<div>
					<Button  onClick={handleOpen}><EditIcon/></Button>
					<Button onClick={handleOpenDel}><DeleteIcon/></Button>
		
				</div>
			</TableCell>
			</TableRow>
		
			</TableBody>
			 <Dialog style={{alignItems: 'center'}} fullWidth open={open} onClose={handleClose}>
				<form onSubmit={handleUpdate} >
				<Typography variant='h2' align='center' gutterBottom><b>Edit Details</b></Typography>
				{error && <Alert severity="error" >{error}</Alert>}
					<DialogContent>
				
					
						<TextField error={desc.length > 150} required value={desc}  multiline rows={3} variant='outlined' label='Description' fullWidth onChange={(e) => setDesc(e.target.value)}/>
		<FormHelperText style={{marginBottom: '30px'}}>Description should be max {desc.length}/150</FormHelperText>
		<TextField error={req.length > 300} required  multiline value={req} rows={5} variant='outlined' label='Requirement' fullWidth onChange={(e) => setReq(e.target.value)}/>
		<FormHelperText style={{marginBottom: '30px'}}>Requirement should be max {req.length}/300</FormHelperText>
		<TextField error={inst.length>100} required  multiLine value={inst} rows={5} variant='outlined' label='Instrument / gauges' fullWidth onChange={(e) => setInst(e.target.value)}/>
		<FormHelperText style={{marginBottom: '30px'}}>Instrument/ Gauges should be max {inst.length}/100</FormHelperText>
		<TextField error={connection.length > 100} required  multiLine value={connection} rows={5} variant='outlined' label='Preferred Pipe & Connection' fullWidth onChange={(e) => setConnection(e.target.value)}/>		
		<FormHelperText style={{marginBottom: '30px'}}>Connection should be max {connection.length}/100</FormHelperText>
					
				</DialogContent>
				
				
			<DialogActions>
				<Button onClick={handleClose}>Cancel</Button>
				<Button disabled={inst.length > 100 || desc.length > 150 || connection.length > 100 || req.length > 300} type="submit" style={{backgroundColor: 'orange', color: 'whitesmoke'}}>Update</Button>
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

export default ServiceView
