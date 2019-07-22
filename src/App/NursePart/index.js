import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Documents from '../__shared__/Documents';

class NursePart extends React.Component {

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
            <Tab label="DOCUMENTS" />
          </Tabs>
        </AppBar>
        {tabIndex === 0 && <Documents />}
      </div>
    );
  }
}

export default NursePart;