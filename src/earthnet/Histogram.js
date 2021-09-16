import React, { useState, useEffect }  from 'react';
import ReactDOM from 'react-dom';
import Dashboard from '../layouts/Dashboard/Dashboard';
import EsaList from '../layouts/components/EsaList/EsaList';
import EsaButton from '../layouts/components/EsaButton/EsaButton';
import { makeStyles, Grid, List, ListItem, ListItemText } from '@material-ui/core';
import EsaLogo from '../EsaLogo';
import EsaPaper from '../layouts/components/EsaPaper/EsaPaper';
import EsaSelect from '../layouts/components/EsaSelect/EsaSelect';
import Plot from 'react-plotly.js';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  fullHeight: { height: '100%' },
  paper: {
    padding: theme.spacing(3)
  },
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
  const [plot, setPlot] = useState([]); // holds the data to be passed in the plot 
  const [plotView, setPlotView] = useState(null); // holds the final <Plot></Plot> of the plot, if null means the 'show plot' button is not clicked yet!
  const [activateButton, setActivateButton] = useState(true);

  const [orientation, setOrientation] = useState('v');
  const [barmode, setBarMode] = useState('group');

  const [singleValue, onChangeSingle] = useState({leftselect: 1, rightselect: 1});

  const [class_, setClass] = useState(classes.logoContainer);
  const [plotdata, setPlotData] = useState([]);


  // Set up a piece of state to keep track of
  // whether the logo component is shown or hidden
  //const [mounted, setMounted] = useState(true);


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

    if(plotView !== null){
    // This function will unmount and re-mount the
    // logo component, so we can render the new component with our plot
    //  setMounted(!mounted);
      setClass('');
      ReactDOM.render(plotView, document.getElementById('plot'));
    } else {
      setClass('logo');
      ReactDOM.render(<EsaLogo/>, document.getElementById('plot'));
    }

  }, [plotView]);

  const handleSelectWells = (value)  => {
      const currentIndex = selectedOptionsWells.indexOf(value);
      const newSelectedOptions = [...selectedOptionsWells];
        if (currentIndex === -1) {
          newSelectedOptions.push(value);
        } else {
          newSelectedOptions.splice(currentIndex, 1);
        }
        setSelectWells(newSelectedOptions);
        if(selectedOptionsWells.length == 0 && selectedOptionsLogs.length > 0 && selectedOptionsFormations.length > 0){
          setActivateButton(false);
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
      if(selectedOptionsWells.length > 0 && selectedOptionsLogs.length == 0 && selectedOptionsFormations.length > 0){
        setActivateButton(false);
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
    if(selectedOptionsWells.length > 0 && selectedOptionsLogs.length > 0 && selectedOptionsFormations.length == 0){
      setActivateButton(false);
    }
};


  const isSelectedWells = value => selectedOptionsWells.includes(value);
  const isSelectedLogs = value => selectedOptionsLogs.includes(value);
  const isSelectedFormations = value => selectedOptionsFormations.includes(value);


  const showPlot = (value)  => {
    let url = 'http://localhost:8000/plots?';
    const params = selectedOptionsWells.map(url_params => (`wellId=${url_params}&`));
    const param = params[params.length - 1].slice(0, -1); // cleans the last '&' character that is attached by the above line inside the map function to the last element
    params.pop();// now remove from array the last item containing the '&'
    params.push(param); // and finally attach at the end of the array the corrected last string element cause the url doesnt need an extra '&' at the very end

    params.forEach(param => {
      url = url.concat(param); // create the final url string 
    });
    // Fetch plot
    fetch(url).then(plot => {
	    if (plot.ok) {
		    return plot.json();
	    } else {
		    return Promise.reject(plot);
	    }
    }).then(plot => {
      setPlot(plot);
      const data = [];
      plot.forEach(element => {
        const obj = {
          x: element.x, 
          y: element.y, 
          type: 'histogram',
          orientation: orientation,
          'name': 'wellid-'+element.wellId
        };
        data.push(obj);
      });

      setPlotData(data);
      setPlotView(<Plot data={data} layout={{ title: 'Wells Plot', barmode: barmode }}/>);

   
    })
    .catch(function (error) {
      console.log(error);
    }) 



  };

  const changeOrientation = (value)  => {
    switch (value){
      case 1:
        setOrientation('v');
        onChangeSingle({
          leftselect: singleValue.leftselect,
          rightselect: value
        });
        if(plotView !== null){
          plotdata.map((obj) => obj.orientation = 'v');
          setPlotView(<Plot data={plotdata} layout={{ title: 'Wells Plot', barmode: barmode }}/>);
        }

        break;
      case 2:
        setOrientation('h');
        onChangeSingle({
          leftselect: singleValue.leftselect,
          rightselect: value
        });
        if(plotView !== null){
          plotdata.map((obj) => obj.orientation = 'h');
          setPlotView(<Plot data={plotdata} layout={{ title: 'Wells Plot', barmode: barmode }}/>);
        }
        
        break;
    }
  }


  const changeBarMode = (value)  => {
    switch (value){
      case 1:
        setBarMode('group');
        onChangeSingle({
          leftselect: value,
          rightselect: singleValue.rightselect
        });
        if(plotView !== null){
          setPlotView(<Plot data={plotdata} layout={{ title: 'Wells Plot', barmode: barmode }}/>);
        }
        break;
      case 2:
        setBarMode('stack');
        onChangeSingle({
          leftselect: value,
          rightselect: singleValue.rightselect
        });
        if(plotView !== null){
          setPlotView(<Plot data={plotdata} layout={{ title: 'Wells Plot', barmode: barmode }}/>);
        }
        break;
    }
  }

  return (
    <Dashboard>         
      <Grid container spacing={1} className={classes.fullHeight}>
          <Grid item xs={12} md={6} container spacing={2}>  
              
              <Grid item xs={12}>
              <EsaPaper className={classes.paper}>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <EsaSelect
                      label="Bar Mode"
                      value={singleValue.leftselect}
                      options={[
                        { key: 'group', value: 1, text: 'group' },
                        { key: 'stack', value: 2, text: 'stack' }
                      ]}
                      onChange={value => changeBarMode(value)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <EsaSelect
                      label="Orientation"
                      value={singleValue.rightselect}
                      options={[
                        { key: 'vertical', value: 1, text: 'vertical' },
                        { key: 'horizontal', value: 2, text: 'horizontal' }
                      ]}
                      onChange={value => changeOrientation(value)}
                    />
                  </Grid>
                </Grid>
              </EsaPaper>
            </Grid>
                
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
                <div id="plot" className={class_ === "logo" ? classes.logoContainer: ''}>  
      
                </div>
              </Grid>
      </Grid>
    </Dashboard>
  );
}