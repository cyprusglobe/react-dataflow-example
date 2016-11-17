describe('topics store', () => {
  let uut;
  const fetchedTopics = [{id: 'a', title: 'hello'}, {id: 'b', title: 'world!'}];

  beforeEach(() => {
    uut = require('./store');
  });

  it('initial state', () => {
    expect(uut.selectors.getAllTopics()).toEqual({});
    expect(uut.selectors.isLoading()).toEqual(true);
  });

  it('holds topics', () => {
    uut.mutators.saveTopics(fetchedTopics);
    expect(uut.selectors.getAllTopics()).toEqual({a: {id: 'a', title: 'hello'}, b: {id: 'b', title: 'world!'}});
  });

  it('sets loading false when topics fetched', () => {
    uut.mutators.saveTopics(fetchedTopics);
    expect(uut.selectors.isLoading()).toEqual(false);
  });
});
