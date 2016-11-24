beforeEach(() => {
  jest.resetAllMocks();
  jest.resetModules();
});

describe('topics store', () => {
  let uut;
  const fetchedTopics = [{url: 'a', title: 'hello'}, {url: 'b', title: 'world!'}];
  const resultingTopics = {a: {url: 'a', title: 'hello'}, b: {url: 'b', title: 'world!'}};

  beforeEach(() => {
    uut = require('./store');
  });

  it('initial state', () => {
    expect(uut.selectors.getAllTopics()).toEqual({});
    expect(uut.selectors.isLoading()).toEqual(true);
  });

  it('holds topics', () => {
    uut.mutators.saveTopics(fetchedTopics);
    expect(uut.selectors.getAllTopics()).toEqual(resultingTopics);
  });

  it('sets loading false when topics fetched', () => {
    uut.mutators.saveTopics(fetchedTopics);
    expect(uut.selectors.isLoading()).toEqual(false);
  });

  it('getAllTopicsListStructure', () => {
    expect(uut.selectors.getAllTopicsListStructure()).toEqual({rowsById: {}, rowsIdArray: []});

    uut.mutators.saveTopics(fetchedTopics);
    expect(uut.selectors.getAllTopicsListStructure()).toEqual({rowsById: resultingTopics, rowsIdArray: ['a', 'b']});
  });

  it('is topic selected', () => {
    expect(uut.selectors.isTopicSelected('a')).toEqual(false);
    uut.mutators.toggleTopicSelectedUrl('a');
    expect(uut.selectors.isTopicSelected('a')).toEqual(true);
    uut.mutators.toggleTopicSelectedUrl('a');
    expect(uut.selectors.isTopicSelected('a')).toEqual(false);
    uut.mutators.toggleTopicSelectedUrl('a');
    expect(uut.selectors.isTopicSelected('a')).toEqual(true);
    uut.mutators.toggleTopicSelectedUrl('b');
    expect(uut.selectors.isTopicSelected('a')).toEqual(true);
  });
});
