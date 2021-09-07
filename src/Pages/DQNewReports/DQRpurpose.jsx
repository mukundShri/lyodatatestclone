import { Typography , Card, makeStyles, Fab} from "@material-ui/core"
import { useEffect } from "react"
import { useState } from "react"
import DQRLayout from "../../components/DQRLayout/DQRLayout"
import { db } from "../../firebase"
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
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
    fab: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
}));


function DQRpurpose({match}) {
	const [purpose, setPurpose] = useState({})
	const classes = useStyles()
	useEffect(() => {
		db.collection('DQNewReport')
		.doc(match.params.id)
		.collection('content')
		.doc('purpose')
		.onSnapshot(snapshot => {
			const data = snapshot.data()
			setPurpose(data)
		})
	}, [])
	return (
		<div>
			<DQRLayout match={match}/>
			 <div className={classes.wrapper}>
        <div className={classes.container}>
          <Card className={classes.content}>
           <div style={{height: '100vh'}}>
			{purpose && <Typography variant='h1' align='center' gutterBottom><b>{purpose.title}</b></Typography>
			}<hr />
			{purpose && <Typography variant='body1' align='left' gutterBottom><p className='italic'>{purpose.desc}</p></Typography>
			}<hr />
			
			
		</div>
    <div className={classes.fab}>
				<Fab component={NavLink} to={`/DQR/${match.params.id}/Approval`} style={{marginRight: '20px'}}   color="primary" aria-label="add">
  <KeyboardArrowLeftIcon/>
</Fab>

			<Fab component={NavLink} to={`/DQR/${match.params.id}/General-Information`}  style={{ color: 'white'}} color="primary" aria-label="add">
  <KeyboardArrowRightIcon/>
</Fab>
		</div>
          </Card>
        </div>
      </div>
		</div>
	)
}

export default DQRpurpose
