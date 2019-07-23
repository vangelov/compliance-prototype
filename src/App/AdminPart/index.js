import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import AdminDocumentTypes from './DocumentTypes';
import AdminSpecialties from './Specialties';
import Documents from '../__shared__/Documents';

class AdminPart extends React.Component {

  constructor() {
    super();

    this.state = {
      tabIndex: 0
    };
  }

  handleTabIndexChange = (event, newValue) => {
    this.setState({ tabIndex: newValue });
  }

  render() {
    const { tabIndex } = this.state;

    return (
      <div>
        <AppBar position="static">
          <Tabs value={tabIndex} onChange={this.handleTabIndexChange} centered>
            <Tab label="DOCUMENT TYPES" />
            <Tab label="SPECIALTIES" />
            <Tab label="NURSE DOCUMENTS" />
          </Tabs>
        </AppBar>
        {tabIndex === 0 && <AdminDocumentTypes />}
        {tabIndex === 1 && <AdminSpecialties />}
        {tabIndex === 2 && <Documents isForAdmin={true} />}
      </div>
    );
  }
}

export default AdminPart;