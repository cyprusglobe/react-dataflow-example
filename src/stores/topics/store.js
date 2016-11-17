import _ from 'lodash';

const store = {
  allTopics: {},
  loading: true
};

export const mutators = {
  saveTopics(topicsArray) {
    store.allTopics = _.keyBy(topicsArray, (t) => t.id);
    store.loading = false;
  }
};

export const selectors = {
  getAllTopics() {
    return store.allTopics;
  },

  isLoading() {
    return store.loading;
  }
};
