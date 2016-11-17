beforeEach(() => {
  jest.resetAllMocks();
  jest.resetModules();
});

describe('topics actions', () => {
  let uut;
  let redditService;
  let store;

  beforeEach(() => {
    jest.mock('../../services/reddit');
    jest.mock('./store');
    redditService = require('../../services/reddit');
    store = require('./store');
    uut = require('./actions');
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
});
