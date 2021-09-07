import { useEffect, useState } from "react"
import { db } from "../../../firebase"
import { firebaseLooper } from "../../../utils/tools"

import { DialogContent, FormHelperText, makeStyles,  Paper,  Table, TableBody, TableCell, TableContainer, TableHead, TableRow  } from "@material-ui/core";
import { Button, Dialog, Typography, TextField, DialogActions, Card } from "@material-ui/core"
import DQComponentsView from "./DQComponentsView";

function DQComponents({match, module_id,type,index}) {
	const [components, setComponents] = useState([])
	const [title, setTitle] = useState('')
	const [value, setValue] = useState('')
	const [req, setReq] = useState('')
	const [inst, setInst] = useState('')
	const [connection, setConnection] = useState('')
	const [desc, setDesc] = useState('')
	const [open, setOpen] = useState(false)
	const [message, setMessage] = useState('')
	
	
	

	function handleSubmit(e){
		e.preventDefault()
		db.collection('DQNew')
		.doc(match.params.id)
		.collection('content')
		.doc('config')
		.collection('components')
		.add({title,value,module_id,index})
		.then(() => {
			setTitle("")
			setValue("")
			setOpen(false)
		})
		.then(() => setMessage('added success'))
	}

	function handleSubmit2(e){
		e.preventDefault()
		db.collection('DQNew')
		.doc(match.params.id)
		.collection('content')
		.doc('config')
		.collection('components')
		.add({desc,req,module_id,index,inst,connection})
		.then(() => {
			setOpen(false)
			setDesc('')
			setReq("")
			setInst("")
			setConnection("")

		}
		)
		.then(() => setMessage('added success'))
	}

	function handleOpen (){
		setOpen(true)
	}
	function handleClose(){
		setOpen(false)
	}
	return (
		<>
			
			{type===0&&
			<>
				<div style={{marginTop: '20px', paddingRight: '3%', display: 'flex',justifyContent: 'flex-start'}}>
				<Button onClick={handleOpen} style={{background: 'black', color: 'whitesmoke'}}>Add New </Button>
			</div>
			{/* {message && <b>{message}</b>} */}
			<br />
		
			<Dialog fullWidth onClose={handleClose} open={open}>
				<Typography variant='h4' align='center' gutterBottom><b>Add New Components</b></Typography>
				<form action="" onSubmit={handleSubmit}>
					<DialogContent>
					<TextField error={title.length>30 } value={title} required  variant='outlined' fullWidth onChange={(e) => setTitle(e.target.value)} label='Title'/>
					<FormHelperText style={{marginBottom: '20px'}} > Title should be max {title.length}/30</FormHelperText>
					<TextField error={value.length > 60} value={value}  variant='outlined' fullWidth required onChange={(e) => setValue(e.target.value)} label='Expected Value'/>
					<FormHelperText>Expected value should be max {value.length}/60 characters</FormHelperText>
				</DialogContent>
				<DialogActions>
					<Button variant='contained' color='secondary' onClick={handleClose} >Cancel</Button>
					<Button disabled={title.length>30 || value.length > 60} type="submit" style={{background: 'orange', color: 'white'}}>Add Components</Button>
				</DialogActions>
				</form>
				
			</Dialog>
			</>
			}
			{type===1&&
			<>
				<div style={{marginTop: '20px', paddingRight: '3%', display: 'flex',justifyContent: 'flex-start'}}>
				<Button onClick={handleOpen} style={{background: 'black', color: 'whitesmoke'}}>Add New </Button>
			</div>
		
			<br />
		
			<Dialog fullWidth onClose={handleClose} open={open}>
				<Typography variant='h4' align='center' gutterBottom><b>Add New Components</b></Typography>
				<form action="" onSubmit={handleSubmit2}>
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
					<Button variant='contained' color='secondary' onClick={handleClose} >Cancel</Button>
					<Button disabled={inst.length > 100 || desc.length > 150 || connection.length > 100 || req.length > 300} type="submit" style={{backgroundColor: 'orange', color: 'whitesmoke'}}>Add Components</Button>
				</DialogActions>
				</form>
			
			</Dialog>
			</>
			}
		</>
	)
}

export default DQComponents
