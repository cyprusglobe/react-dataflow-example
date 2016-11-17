import * as reddit from '../../services/reddit';
import * as store from './store';
import _ from 'lodash';

export async function fetchTopics() {
  const topics = await reddit.getDefaultSubreddits();
  const sorted = _.orderBy(topics, (t) => t.subscribers, 'desc');
  store.mutators.saveTopics(sorted);
}
