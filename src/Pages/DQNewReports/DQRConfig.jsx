import { Typography , Card, makeStyles, TableContainer,Toolbar, Paper, TableHead, TableRow, TableCell, TableBody, Button, Dialog, Fab} from "@material-ui/core"
import { useEffect } from "react"
import { useState } from "react"
import { Table } from "react-bootstrap"
import DQRLayout from "../../components/DQRLayout/DQRLayout"
import { db } from "../../firebase"
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import { firebaseLooper } from "../../utils/tools"
import DQRComponents from "./DQRComponents"
import DQRConfigView from "./DQRConfigView"
import { NavLink } from "react-router-dom"
const useStyles = makeStyles((theme) => ({
  layoutRoot: {
   backgroundColor: 'whitesmoke',
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%',

  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#141256',
  },
 wrapper: {
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden',
  paddingTop: 64,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 250
  },
  
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  container: {
      display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden'
  },
  content: {
   padding: '20px',
      flex: '1 1 auto',
  height: '100%',
  overflow: 'auto'
    },
}));


function DQRConfig({match}) {
	const [purpose, setPurpose] = useState({})
	const [configData, setConfigData] = useState([])
	
	const classes = useStyles()
	useEffect(() => {
		
		db.collection('DQNewReport')
		.doc(match.params.id)
		.collection('content')
		.doc('config')
		.collection('modules')
		.onSnapshot(snapshot => {
			const data = firebaseLooper(snapshot)
      data.sort(function(a,b){
        return(a.index-b.index)
      })
			setConfigData(data)
		})
	}, [])
	return (
		<>
			<DQRLayout match={match}/>
			 <div className={classes.wrapper}>
        <div className={classes.container}>
          <Card className={classes.content}>
           <>
          <Typography variant='h1'  align='center' gutterBottom><b>Equipment Configuration</b></Typography>
			 <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{background: '#4C4C6D', color: 'white', font: 'bold'}}>Name</TableCell>
            <TableCell style={{background: '#4C4C6D', color: 'white', font: 'bold'}} align="right">Description</TableCell>

            <TableCell style={{background: '#4C4C6D', color: 'white', font: 'bold'}} align="right">Actions</TableCell>
          
          </TableRow>
        </TableHead>
        <TableBody>
          {configData.map((row) => (
		  <DQRConfigView row={row} match={match} key={row.id}/>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
			
		</>
    <div className={classes.fab}>
				<Fab component={NavLink} to={`/DQR/${match.params.id}/General-Information`} style={{marginRight: '20px'}}   color="primary" aria-label="add">
  <KeyboardArrowLeftIcon/>
</Fab>

			<Fab component={NavLink} to={`/DQR/${match.params.id}/Specifications`}  style={{ color: 'white'}} color="primary" aria-label="add">
  <KeyboardArrowRightIcon/>
</Fab>
		</div>
    <br />
    <br />
    <br />

          </Card>
        </div>
      </div>
		</>
	)
}

export default DQRConfig
