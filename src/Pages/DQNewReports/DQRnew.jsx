import { Button, Card, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow , Typography} from "@material-ui/core"
import { useEffect, useState } from "react"
import { db } from "../../firebase"
import { firebaseLooper } from "../../utils/tools"
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import SearchIcon from '@material-ui/icons/Search'
import ContentDashboardLayout from "../../components/ContentSidebar/ContentDashboardLayout";
import moment from "moment";
import { NavLink } from "react-router-dom";
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
}));


function DQRnew({match}) {
	const [reports, setReports] = useState([])
	const classes = useStyles()
  const [searchTerm, setSearchTerm] = useState('')
	useEffect(() => {
		db.collection('DQNewReport')
		.where('mid', '==', `${match.params.id}`)
    
		.onSnapshot(snapshot => {
			const data = firebaseLooper(snapshot)
      data.sort(function(a,b){
        return(b.timestamp - a.timestamp)
      })
			setReports(data)
		})
	}, [])
	return (
  <>
	<ContentDashboardLayout match={match}/>
		 <div className={classes.wrapper}>
        <div className={classes.container}>
          <Card className={classes.content}>
          <div style={{display: 'flex', justifyContent: 'space-between',  paddingRight: '2.5rem'}}>
              {/* <Typography style={{marginRight: '15px'}} variant='h1' align='center'><b>{mTitle} : </b></Typography> */}
              <div style={{paddingLeft: '2.5rem'}}
              >
                 <Typography variant='h1' align='left'><b>DQ Reports</b></Typography>
                  <Typography align='left' variant='body2' > These are all the required DQ Reports and data </Typography>
              </div>
              <div>
              <div style={{display: 'flex', justifyContent: 'flex-end'}}>
               
               <div className="relative"> 
            <input style={{ border: '2px solid whitesmoke'}} onChange={(e) => setSearchTerm(e.target.value)} type="text" className="h-14 w-96 pr-8 pl-5 rounded z-0 focus:shadow focus:outline-none" placeholder="Search DQ Reports..."/>
             <div className="absolute top-4 right-3"><SearchIcon style={{opacity: '0.5'}}/>  </div>
         </div>
               {/* <Button color='primary' variant='contained' style={{width: '150px', marginLeft: '4%', marginRight: '2%',  color: 'white'}} component={NavLink} to={`/machine-data/${match.params.id}/Add-Manuals`}>ADD New </Button> */}
       
       <hr/>
         </div>
              </div>
            </div>
<br />
<div style={{paddingLeft: '2.5rem', paddingRight: '2.5rem'}}>
<TableContainer component={Paper}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{background: '#4C4C6D', color: 'white', font: 'bold'}}>Name</TableCell>
            <TableCell style={{background: '#4C4C6D', color: 'white', font: 'bold'}} align="right">Description</TableCell>
            <TableCell style={{background: '#4C4C6D', color: 'white', font: 'bold'}} align="right">Date</TableCell>
            <TableCell style={{background: '#4C4C6D', color: 'white', font: 'bold'}} align="right">Actions</TableCell>
         
          </TableRow>
        </TableHead>
        <TableBody>
          {reports
           .filter((data) => {
            if(searchTerm === ""){
              return data
          } else if (data.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())){
                  return data
                  }
          })  
          .map((row) => (
            <TableRow key={row.id}>
              <TableCell style={{background: '#E8F6EF'}} component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.desc}</TableCell>
              <TableCell align="right">{row.timestamp?.toDate().toString().substring(0,15)}</TableCell>
             
              <TableCell align="right"><Button className='animate-bounce' component={NavLink} to={`/DQR/${row.id}/Approval`}><ArrowForwardIcon/></Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
</div>
       
          </Card>
        </div>
      </div>
		</>
	)
}

export default DQRnew
