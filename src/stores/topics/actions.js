import * as reddit from '../../services/reddit';
import * as store from './store';

export async function fetchTopics() {
  const topics = await reddit.getDefaultSubreddits();
  store.mutators.saveTopics(topics);
}
