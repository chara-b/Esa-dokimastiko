import React, { useState, useEffect }  from 'react';
import Dashboard from '../layouts/Dashboard/Dashboard';
import EsaList from '../layouts/components/EsaList/EsaList';
import EsaButton from '../layouts/components/EsaButton/EsaButton';
import { makeStyles, Grid, List, ListItem, ListItemText } from '@material-ui/core';
import EsaLogo from '../EsaLogo';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  fullHeight: { height: '100%' },
  button: { marginTop: theme.spacing(3) },
  logoContainer: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '& svg': {
      width: '30%'
    }
  },
  list: {
    height: '80%'
  },
  listItem: {
    cursor: 'pointer',
    justifyContent: ' space-between',
    '&.Mui-selected.haveData,&.Mui-selected.haveData:hover': {
      backgroundColor: 'rgba(41, 150, 243, .3)'
    },
    '&:hover, &.Mui-selected,&.Mui-selected:hover': {
      backgroundColor: theme.palette.default.light
    },
    '&::selection': { backgroundColor: 'transparent' }
  }
});
const useStyles = makeStyles(styles);


export default function Wellbore() {
  const classes = useStyles();
  const [selectedOptionsWells, setSelectWells] = useState([]);
  const [selectedOptionsLogs, setSelectLogs] = useState([]);
  const [selectedOptionsFormations, setSelectFormations] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(null);
  const [newSelectedOptionsWells, setnewSelectedOptionsWells] = useState([]);
  const [newSelectedOptionsLogs, setnewSelectedOptionsLogs] = useState([]);
  const [newSelectedOptionsFormations, setnewSelectedOptionsFormations] = useState([]);

  const [Wells, setWells] = useState([]);
  const [Logs, setLogs] = useState([]);
  const [Formations, setFormations] = useState([]);

  useEffect(() => {    
    // Fetch wells
    fetch('http://localhost:3000/wells').then(wells => {
	    if (wells.ok) {
		    return wells.json();
	    } else {
		    return Promise.reject(wells);
	    }
    }).then(wells => setWells(wells))
    .then(
	    // Fetch logs after fetching wells
	    fetch('http://localhost:3000/logs').then(logs => {
        if (logs.ok) {
          return logs.json();
        } else {
          return Promise.reject(logs);
        };
        }).then(logs => setLogs(logs)))
    .then(
	    // Fetch formations 
	    fetch('http://localhost:3000/formations').then(formations => {
        if (formations.ok) {
          return formations.json();
        } else {
          return Promise.reject(formations);
        };
      }).then(formations => setFormations(formations)))
    .catch(function (error) {
	      console.log(error);
    })
  });

  const handleSelect = (value, portletselected)  => {

    switch(portletselected) {
      case 'wells':
   
        setCurrentIndex(selectedOptionsWells.indexOf(value));
        setnewSelectedOptionsWells([...selectedOptionsWells]);
        if (currentIndex === -1 || currentIndex === null) {
          newSelectedOptionsWells.push(value);
        } else {
          newSelectedOptionsWells.splice(currentIndex, 1);
        }
        setSelectWells(newSelectedOptionsWells);
        // clean the consts currentIndex 
        // so we don't get any conflict between cases from values saved inside the state of 
        // these consts from previous selections
        //setCurrentIndex(null);
    
        break;
      
      case 'logs':
        
        setCurrentIndex(selectedOptionsLogs.indexOf(value));
        setnewSelectedOptionsLogs([...selectedOptionsLogs]);
        if (currentIndex === -1 || currentIndex === null) {
          newSelectedOptionsLogs.push(value);
        } else {
          newSelectedOptionsLogs.splice(currentIndex, 1);
        }
        setSelectLogs(newSelectedOptionsLogs);
        //setCurrentIndex(null);

        break;
      
      case 'formations':
        
        setCurrentIndex(selectedOptionsFormations.indexOf(value));
        setnewSelectedOptionsFormations([...selectedOptionsFormations]);
        if (currentIndex === -1 || currentIndex === null) {
          newSelectedOptionsFormations.push(value);
        } else {
          newSelectedOptionsFormations.splice(currentIndex, 1);
        }
        setSelectFormations(newSelectedOptionsFormations);
        //setCurrentIndex(null);
 
        break;
    
    } 
    
  };



  const isSelectedWells = value => selectedOptionsWells.includes(value);
  const isSelectedLogs = value => selectedOptionsLogs.includes(value);
  const isSelectedFormations = value => selectedOptionsFormations.includes(value);

  return (
    <Dashboard>  
      <Grid container spacing={1} className={classes.fullHeight}>
              <Grid item xs={12} md={6} container spacing={2}>  
                <Grid item xs={4}>
                  <EsaList title="Wells" height={500}>
                    <List>
                      {Wells.map(
                        option => (
                          <ListItem
                            key={option.id}
                            className={classes.listItem}
                            selected={isSelectedWells(option.id)}
                            onClick={() => handleSelect(option.id, 'wells')}
                          >
                          <ListItemText primary={option.name} />
                          </ListItem>
                        )
                      )}
                    </List>
                  </EsaList>
                </Grid>
                <Grid item xs={4}>
                  <EsaList title="Logs" height={500}>
                    <List>
                      {Logs.map(
                        option => (
                          <ListItem
                            key={option.id}
                            className={classes.listItem}
                            selected={isSelectedLogs(option.id)}
                            onClick={() => handleSelect(option.id, 'logs')}
                          >
                          <ListItemText primary={option.log} />
                          </ListItem>
                        )
                      )}
                    </List>
                  </EsaList>
                </Grid>
                <Grid item xs={4}>
                  <EsaList title="Formations" height={450}>
                    <List>
                      {Formations.map(
                        option => (
                          <ListItem
                            key={option.id}
                            className={classes.listItem}
                            selected={isSelectedFormations(option.id)}
                            onClick={() => handleSelect(option.id, 'formations')}
                          >
                          <ListItemText primary={option.name} />
                          </ListItem>
                        )
                      )}
                    </List>
                  </EsaList>
                  <EsaButton fullWidth className={classes.button}>
                    Show Plot
                  </EsaButton>
                </Grid>
              </Grid>
      
              <Grid item xs={12} md={6} container spacing={0} style={{marginLeft: '16px'}}>
                <div className={classes.logoContainer}>
                  <EsaLogo />
                </div>
              </Grid>
      </Grid>
    </Dashboard>
  );
}
