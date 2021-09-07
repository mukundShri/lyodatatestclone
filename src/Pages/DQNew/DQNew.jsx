import { Button, Card, Toolbar, Dialog, Typography, DialogContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react"
import ContentDashboardLayout from "../../components/ContentSidebar/ContentDashboardLayout";
import {db} from '../../firebase'
import {firebaseLooper} from '../../utils/tools'
import AddMaterial from "./DQComponents/AddMaterial";
import DQNewView from "./DQComponents/DQNewView";
import SearchIcon from '@material-ui/icons/Search'
import { NavLink } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  layoutRoot: {
    backgroundColor: 'white',
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%',
     background:'linear-gradient(#f3f3f3, #e7e7e7)' 
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
    paddingLeft: 256
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
    table: {
    minWidth: 500,
  },
}));

function DQNew({match}) {
	const [reports, setReports] = useState([])
	const [open, setOpen] = useState(false)
	const classes = useStyles()
  const [searchTerm, setSearchTerm] = useState('')

	useEffect(() => {
		db.collection('DQNew').where('mid', '==', `${match.params.id}`).onSnapshot(snapshot => {
			const data = firebaseLooper(snapshot)
			setReports(data)
		})
	}, [])

	const handleOpen = () => {
		setOpen(true)
	}
	const handleClose = () => {
		setOpen(false)
	}
	return (
		<>
		<ContentDashboardLayout match={match}/>
		  <div className={classes.wrapper}>
        <div className={classes.container}>
          <Card className={classes.content}>
          <div style={{display: 'flex',paddingRight: '1.4rem', justifyContent: 'space-between'}}>
              {/* <Typography style={{marginRight: '15px'}} variant='h1' align='center'><b>{mTitle} : </b></Typography> */}
              <div style={{paddingLeft: '2.2rem'
              }}
              >
                 <Typography variant='h1' align='left'><b>DQ Master</b></Typography>
                  <Typography align='left' variant='body2' > Master Copy of all DQ Reports </Typography>
              </div>
              <div>
              <div className='pr-2' style={{display: 'flex', justifyContent: 'flex-end'}}>
               
               <div className="relative"> 
            <input style={{ border: '2px solid whitesmoke'}} onChange={(e) => setSearchTerm(e.target.value)} type="text" className="h-14 w-96 pr-8 pl-5 rounded z-0 focus:shadow focus:outline-none" placeholder="Search DQ Master..."/>
             <div className="absolute top-4 right-3"><SearchIcon style={{opacity: '0.5'}}/>  </div>
         </div>
               <Button onClick={handleOpen} color='primary' variant='contained' style={{width: '150px', marginLeft: '4%', marginRight: '2%',  color: 'white'}} >ADD New </Button>
       
       <hr/>
         </div>
              </div>
            </div>
             {/* <Toolbar style={{display: 'flex', justifyContent: 'flex-end'}}>
			<Button  color='primary' variant='contained' style={{ color: 'white', width: '150px' }}>Add New</Button>
		  </Toolbar> */}
		 
           
    <div>
            <div style={{paddingLeft: '2.2rem', paddingRight: '2.2rem'}} className=" mx-auto  py-10">
                <div className="shadow bg-white dark:bg-gray-800  rounded">
                
                {
				reports
        .filter((data) => {
          if(searchTerm === ""){
            return data
        } else if (data.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())){
                return data
                }
        })
        .map(data => (
					<>
					<DQNewView key={data.id} report={data}/>
					
					</>
				))
			}
                   
                      
                    </div>
                </div>
    </div>
		
          </Card>
        </div>
      </div>
      <Dialog onClose={handleClose} open={open} fullWidth>
			 <Toolbar >
			<Button onClick={handleClose} style={{backgroundColor:'orange', color: 'white', width: '10%' }}>close</Button>
		  </Toolbar>
      <DialogContent>
        <AddMaterial match={match}/>
      </DialogContent>
      

			
		</Dialog>
      </>
		
	)
}

export default DQNew

