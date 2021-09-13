import React, { useState }  from 'react';
import Dashboard from '../layouts/Dashboard/Dashboard';
import { Typography } from '@material-ui/core';
import EsaList from '../layouts/components/EsaList/EsaList';
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
  const [selectedOptions, setSelect] = useState([]);

  const handleSelect = value => {
    const currentIndex = selectedOptions.indexOf(value);
    const newSelectedOptions = [...selectedOptions];
    if (currentIndex === -1) {
      newSelectedOptions.push(value);
    } else {
      newSelectedOptions.splice(currentIndex, 1);
    }
    setSelect(newSelectedOptions);
  };

  const isSelected = value => selectedOptions.includes(value);

  return (
    <Dashboard>  
      <Grid container spacing={1} className={classes.fullHeight}>
              <Grid item xs={12} md={6} container spacing={2} style={{backgroundColor: 'black'}}>  
                <Grid item xs={4}>
                  <EsaList title="Wells">
                    <List>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(
                        option => (
                          <ListItem
                            key={option}
                            className={classes.listItem}
                            selected={isSelected(option)}
                            onClick={() => handleSelect(option)}
                          >
                          <ListItemText primary={`item-${option}`} />
                          </ListItem>
                        )
                      )}
                    </List>
                  </EsaList>
                </Grid>
                <Grid item xs={4}>
                  <EsaList title="Logs">
                    <List>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(
                        option => (
                          <ListItem
                            key={option}
                            className={classes.listItem}
                            selected={isSelected(option)}
                            onClick={() => handleSelect(option)}
                          >
                          <ListItemText primary={`item-${option}`} />
                          </ListItem>
                        )
                      )}
                    </List>
                  </EsaList>
                </Grid>
                <Grid item xs={4}>
                  <EsaList title="Formations">
                    <List>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(
                        option => (
                          <ListItem
                            key={option}
                            className={classes.listItem}
                            selected={isSelected(option)}
                            onClick={() => handleSelect(option)}
                          >
                          <ListItemText primary={`item-${option}`} />
                          </ListItem>
                        )
                      )}
                    </List>
                  </EsaList>
                </Grid>
              </Grid>
      
              <Grid item xs={12} md={6} style={{backgroundColor: 'blue'}}>
                <div className={classes.logoContainer}>
                  <EsaLogo />
                </div>
              </Grid>
      </Grid>
    </Dashboard>
  );
}
