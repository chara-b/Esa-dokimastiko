import React, { useState }  from 'react';
import Dashboard from '../layouts/Dashboard/Dashboard';
import { Typography } from '@material-ui/core';
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

  const handleSelectWells = value => {
    const currentIndex = selectedOptionsWells.indexOf(value);
    const newSelectedOptions = [...selectedOptionsWells];
    if (currentIndex === -1) {
      newSelectedOptions.push(value);
    } else {
      newSelectedOptions.splice(currentIndex, 1);
    }
    setSelectWells(newSelectedOptions);
  };
  const handleSelectLogs = value => {
    const currentIndex = selectedOptionsLogs.indexOf(value);
    const newSelectedOptions = [...selectedOptionsLogs];
    if (currentIndex === -1) {
      newSelectedOptions.push(value);
    } else {
      newSelectedOptions.splice(currentIndex, 1);
    }
    setSelectLogs(newSelectedOptions);
  };
  const handleSelectFormations = value => {
    const currentIndex = selectedOptionsFormations.indexOf(value);
    const newSelectedOptions = [...selectedOptionsFormations];
    if (currentIndex === -1) {
      newSelectedOptions.push(value);
    } else {
      newSelectedOptions.splice(currentIndex, 1);
    }
    setSelectFormations(newSelectedOptions);
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
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(
                        option => (
                          <ListItem
                            key={option}
                            className={classes.listItem}
                            selected={isSelectedWells(option)}
                            onClick={() => handleSelectWells(option)}
                          >
                          <ListItemText primary={`item-${option}`} />
                          </ListItem>
                        )
                      )}
                    </List>
                  </EsaList>
                </Grid>
                <Grid item xs={4}>
                  <EsaList title="Logs" height={500}>
                    <List>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(
                        option => (
                          <ListItem
                            key={option}
                            className={classes.listItem}
                            selected={isSelectedLogs(option)}
                            onClick={() => handleSelectLogs(option)}
                          >
                          <ListItemText primary={`item-${option}`} />
                          </ListItem>
                        )
                      )}
                    </List>
                  </EsaList>
                </Grid>
                <Grid item xs={4}>
                  <EsaList title="Formations" height={450}>
                    <List>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(
                        option => (
                          <ListItem
                            key={option}
                            className={classes.listItem}
                            selected={isSelectedFormations(option)}
                            onClick={() => handleSelectFormations(option)}
                          >
                          <ListItemText primary={`item-${option}`} />
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
