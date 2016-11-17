/*eslint-disable*/
beforeEach(() => {
  jest.resetAllMocks();
  jest.resetModules();
});

describe('reddit service', () => {
  let uut;
  let httpGet;

  beforeEach(() => {
    jest.mock('./http');
    httpGet = require('./http').get;
    uut = require('./reddit');
  });

  it('fetched default subreddits', async() => {
    const child1 = {data: {display_name: 'child1', url: 'url1', public_description: 'desc1'}};
    const child2 = {data: {display_name: 'child2', url: 'url2', public_description: 'desc2'}};

    const result1 = {title: 'child1', url: 'url1', description: 'desc1'};
    const result2 = {title: 'child2', url: 'url2', description: 'desc2'};

    const data = {data: {children: [child1, child2]}};
    httpGet.mockReturnValue(Promise.resolve(data));
    const result = await uut.getDefaultSubreddits();
    expect(result).toEqual([result1, result2]);
  });

  it('throws when no children', async() => {
    try {
      await uut.getDefaultSubreddits();
      fail();
    } catch (e) {
      expect(e).toBeDefined();
    }
  });
});
