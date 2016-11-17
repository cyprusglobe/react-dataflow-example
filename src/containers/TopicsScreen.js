// containers are "smart" react components that are derived from the state,
// they observe the state using selectors and draw themselved using dumb components
// avoid having view logic & local component state in them, use "dumb" components (with presenters) instead

import React, {Component} from 'react';
import autobind from 'react-autobind';
import './TopicsScreen.css';
import ListView from '../components/ListView';
import ListRow from '../components/ListRow';

import {connect} from 'remx/react';

import {selectors as topicsSelectors} from '../stores/topics/store';
import * as storeActions from '../stores/topics/actions';

class TopicsScreen extends Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  componentDidMount() {
    storeActions.fetchTopics();
  }

  render() {
    if (topicsSelectors.isLoading()) {
      return this.renderLoading();
    } else {
      return this.renderTopics();
    }
  }

  renderLoading() {
    return (
      <p>Loading...</p>
    );
  }

  renderTopics() {
    const {rowsById, rowsIdArray} = topicsSelectors.getAllTopicsListStructure();
    return (
      <div className="TopicsScreen">
        <h3>Choose 3 topics of interest</h3>
        <ListView
          rowsIdArray={rowsIdArray}
          rowsById={rowsById}
          renderRow={this.renderRow}
        />
      </div>
    );
  }

  renderRow(topicUrl, topic) {
    return (
      <ListRow
        rowId={topicUrl}
        onClick={this.onRowClick}
        selected={false}
      >
        <h3>{topic.title}</h3>
        <p>{topic.description}</p>
      </ListRow>
    );
  }
}

export default connect(TopicsScreen);
