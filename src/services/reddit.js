import {get} from './http';

import _ from 'lodash';
const REDDIT_ENDPOINT = 'https://www.reddit.com';
const DEFAULT_SUBREDDITS = `${REDDIT_ENDPOINT}/subreddits/default.json`;

export async function getDefaultSubreddits() {
  const children = await getDefaultSubredditsOrThrow();
  return parseChildren(children);
}

async function getDefaultSubredditsOrThrow() {
  const data = await get(DEFAULT_SUBREDDITS);
  const children = _.get(data, 'data.children');
  if (!children) {
    throw new Error(`RedditService getDefaultSubreddits failed, children not returned`);
  }
  return children;
}

// abstract away the specifics of the reddit API response and take only the fields we care about
function parseChildren(sortedBySubscribers) {
  return _.map(sortedBySubscribers, (subreddit) => {
    return {
      title: _.get(subreddit, 'data.display_name'),
      description: _.get(subreddit, 'data.public_description'),
      url: _.get(subreddit, 'data.url'),
      subscribers: _.get(subreddit, 'data.subscribers')
    };
  });
}
