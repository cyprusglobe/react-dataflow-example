import {get} from './http';

import _ from 'lodash';
const REDDIT_ENDPOINT = 'https://www.reddit.com';
const DEFAULT_SUBREDDITS = `${REDDIT_ENDPOINT}/subreddits/default.json`;

export async function getDefaultSubreddits() {
  const children = await getDefaultSubredditsOrThrow();
  const sortedBySubscribers = orderBySubscribers(children);
  return parseChildren(sortedBySubscribers);
}

async function getDefaultSubredditsOrThrow() {
  const data = await get(DEFAULT_SUBREDDITS);
  const children = _.get(data, 'data.children');
  if (!children) {
    throw new Error(`RedditService getDefaultSubreddits failed, children not returned`);
  }
  return children;
}

function orderBySubscribers(children) {
  return _.orderBy(children, 'data.subscribers', 'desc');
}

// abstract away the specifics of the reddit API response and take only the fields we care about
function parseChildren(sortedBySubscribers) {
  return _.map(sortedBySubscribers, (subreddit) => {
    return {
      title: _.get(subreddit, 'data.display_name'),
      description: _.get(subreddit, 'data.public_description'),
      url: _.get(subreddit, 'data.url')
    };
  });
}
