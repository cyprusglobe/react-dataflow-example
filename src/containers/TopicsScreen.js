// containers are "smart" react components that are derived from the state,
// they observe the state using selectors and draw themselved using dumb components
// avoid having view logic & local component state in them, use "dumb" components (with presenters) instead

import React, {Component} from 'react';
import autobind from 'react-autobind';
import './TopicsScreen.css';

class TopicsScreen extends Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  render() {
    return (
      <p>Hello, world!</p>
    );
  }
}

export default TopicsScreen;
