beforeEach(() => {
  jest.resetAllMocks();
  jest.resetModules();
});

describe('topics actions', () => {
  let uut;
  let store;
  let redditService;

  beforeEach(() => {
    jest.mock('./store');
    jest.mock('../../services/reddit');
    store = require('./store');
    uut = require('./actions');
    redditService = require('../../services/reddit');
  });

  it('fetchTopics gets default subreddits', () => {
    uut.fetchTopics();
    expect(redditService.getDefaultSubreddits).toHaveBeenCalledTimes(1);
  });

  it('fetchTopics is async and saves to store', async() => {
    redditService.getDefaultSubreddits.mockReturnValue(Promise.resolve(['hello', 'world']));
    await uut.fetchTopics();
    expect(store.mutators.saveTopics).toHaveBeenCalledTimes(1);
    expect(store.mutators.saveTopics).toHaveBeenCalledWith(['hello', 'world']);
  });

  it('sorts topics by number of subscribers, descending', async() => {
    const child1 = {subscribers: 10};
    const child2 = {subscribers: 20};
    redditService.getDefaultSubreddits.mockReturnValue(Promise.resolve([child1, child2]));
    await uut.fetchTopics();
    expect(store.mutators.saveTopics).toHaveBeenCalledWith([child2, child1]);
  });

  it('onTopicClicked', async() => {
    await uut.onTopicClicked('url 1');
    expect(store.mutators.toggleTopicSelectedUrl).toHaveBeenCalledTimes(1);
    expect(store.mutators.toggleTopicSelectedUrl).toHaveBeenCalledWith('url 1');
  });
});
