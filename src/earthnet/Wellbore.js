import React, { useState, useEffect }  from 'react';
import Dashboard from '../layouts/Dashboard/Dashboard';
import EsaList from '../layouts/components/EsaList/EsaList';
import EsaButton from '../layouts/components/EsaButton/EsaButton';
import { makeStyles, Grid, List, ListItem, ListItemText } from '@material-ui/core';
import EsaLogo from '../EsaLogo';
import Plot from 'react-plotly.js';

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

  const [Wells, setWells] = useState([]);
  const [Logs, setLogs] = useState([]);
  const [Formations, setFormations] = useState([]);
  const [activateButton, setActivateButton] = useState(true);

  useEffect(() => {   
    
    const url1 = "http://localhost:3000/wells";
    const url2 = "http://localhost:3000/logs";
    const url3 = "http://localhost:3000/formations";

    const fetchWells = async () => {
      try {
        const wells_response = await fetch(url1);
        const wells_json = await wells_response.json();
        setWells(wells_json);
       // console.log(json);
      } catch (error) {
        console.log("error", error);
      }
    };

    const fetchLogs = async () => {
      try {
        const logs_response = await fetch(url2);
        const logs_json = await logs_response.json();
        setLogs(logs_json);
       // console.log(json);
      } catch (error) {
        console.log("error", error);
      }
    };

    const fetchFormations = async () => {
      try {
        const formations_response = await fetch(url3);
        const formations_json = await formations_response.json();
        setLogs(formations_json);
       // console.log(json);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchWells();
    fetchLogs();
    fetchFormations();
    /* Fetch wells
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
    }) */
  },[]);

  const handleSelectWells = (value)  => {
      const currentIndex = selectedOptionsWells.indexOf(value);
      const newSelectedOptions = [...selectedOptionsWells];
        if (currentIndex === -1) {
          newSelectedOptions.push(value);
        } else {
          newSelectedOptions.splice(currentIndex, 1);
        }
        setSelectWells(newSelectedOptions);
        if(selectedOptionsWells.length >= 1 & selectedOptionsLogs.length >= 1 & selectedOptionsFormations.length >= 1){
          setActivateButton(true);
        }
    
  };

  const handleSelectLogs = (value)  => {
    const currentIndex = selectedOptionsLogs.indexOf(value);
    const newSelectedOptions = [...selectedOptionsLogs];
      if (currentIndex === -1) {
        newSelectedOptions.push(value);
      } else {
        newSelectedOptions.splice(currentIndex, 1);
      }
      setSelectLogs(newSelectedOptions);
      if(selectedOptionsWells.length >= 1 & selectedOptionsLogs.length >= 1 & selectedOptionsFormations.length >= 1){
        setActivateButton(true);
      }
};

const handleSelectFormations = (value)  => {
  const currentIndex = selectedOptionsFormations.indexOf(value);
  const newSelectedOptions = [...selectedOptionsFormations];
    if (currentIndex === -1) {
      newSelectedOptions.push(value);
    } else {
      newSelectedOptions.splice(currentIndex, 1);
    }
    setSelectFormations(newSelectedOptions);
    if(selectedOptionsWells.length >= 1 & selectedOptionsLogs.length >= 1 & selectedOptionsFormations.length >= 1){
      setActivateButton(true);
    }
};


  const isSelectedWells = value => selectedOptionsWells.includes(value);
  const isSelectedLogs = value => selectedOptionsLogs.includes(value);
  const isSelectedFormations = value => selectedOptionsFormations.includes(value);


  const showPlot = (value)  => {
    return (
      <Plot
        data={[
          {
            x: [1, 2, 3],
            y: [2, 6, 3],
            type: 'scatter',
            mode: 'lines+markers',
            marker: {color: 'red'},
          },
          {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
        ]}
        layout={ {width: 320, height: 240, title: 'A Fancy Plot'} }
      />
    );
  };


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
                            onClick={() => handleSelectWells(option.id)}
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
                            onClick={() => handleSelectLogs(option.id)}
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
                            onClick={() => handleSelectFormations(option.id)}
                          >
                          <ListItemText primary={option.name} />
                          </ListItem>
                        )
                      )}
                    </List>
                  </EsaList>
                  <EsaButton fullWidth className={classes.button} disabled={activateButton} onClick={() => showPlot()}>
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
