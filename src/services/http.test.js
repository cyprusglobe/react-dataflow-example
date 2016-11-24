describe('http service', () => {
  let uut;
  let mockFetch;

  beforeEach(() => {
    global.fetch = jest.fn;
    mockFetch = global.fetch;
    uut = require('./http');
  });

  afterEach(() => {
    global.fetch = undefined;
  });

  it('get performs fetch', async() => {
    //const result = await uut.get('my url');
    //expect(result).toEqual();
  });
});
