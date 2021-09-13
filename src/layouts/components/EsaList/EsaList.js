import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {
    Portlet,
    PortletHeader,
    PortletLabel,
    PortletContent,
    PortletToolbar
  } from '../';

// Component styles
const styles = theme => ({
    root: {
      display: 'flex',
      flexDirection: 'column'
    },
    portletContent: {
      height: 0,
      minHeight: 500,
      display: 'flex',
      flexDirection: 'column'
    },
    header: {
      padding: theme.spacing(0, 1, 0, 2),
      background: theme.palette.default.dark,
      color: theme.palette.default.contrastText
    },
  });
  
const EsaList = props => {

    const { classes, className, title, children, ...rest } = props;
    //const rootClassName = classNames(classes.root, className);
  
    return (
        
        <Portlet>
          <PortletHeader className={classes.header}>
            <PortletLabel title={title} />
            <PortletToolbar>
              <MoreVertIcon />
            </PortletToolbar>
          </PortletHeader>
          <PortletContent className={classes.portletContent} noPadding>
            {children}
          </PortletContent>
        </Portlet>

    );
};
  
EsaList.propTypes = {
    children: PropTypes.node, // Anything that can be rendered: numbers, strings, elements or an array containing these types.
    className: PropTypes.string,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
   // classes: PropTypes.object.isRequired
};
  
export default withStyles(styles)(EsaList);
  


















