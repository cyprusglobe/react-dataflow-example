import _ from 'lodash';
import * as remx from 'remx';

const state = remx.state({
  allTopics: {},
  loading: true,
  selectedTopics: []
});

export const mutators = remx.setters({
  saveTopics(topicsArray) {
    state.allTopics = _.keyBy(topicsArray, (t) => t.url);
    state.loading = false;
  },

  toggleTopicSelectedUrl(topicUrl) {
    if (selectors.isTopicSelected(topicUrl)) {
      state.selectedTopics.remove(topicUrl);
    } else {
      state.selectedTopics.push(topicUrl);
    }
  }
});

export const selectors = remx.getters({
  getAllTopics() {
    return state.allTopics;
  },

  isLoading() {
    return state.loading;
  },

  getAllTopicsListStructure() {
    return {rowsById: state.allTopics, rowsIdArray: _.keys(state.allTopics)};
  },

  isTopicSelected(topicUrl) {
    return _.includes(state.selectedTopics, topicUrl);
  }
});
