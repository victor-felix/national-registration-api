/* eslint-disable @typescript-eslint/no-unused-expressions */
describe('Test config', () => {
  const { env } = process;

  beforeEach(() => {
    jest.resetModules();
    process.env = env;
  });

  afterAll(() => {
    process.env = env;
  });

  test('Should return the environment variable configuration SERVERS', async () => {
    const config = (await import('./index')).default;

    expect(config.SERVERS.http.hostname).toEqual('localhost');
    expect(config.SERVERS.http.port).toEqual(3333);
  });

  test('Should return the default configuration SERVERS', async () => {
    process.env.HTTP_HOST = '';
    process.env.HTTP_PORT = '';
    const Config = (await import('./index')).default;

    expect(Config.SERVERS.http.hostname).toEqual('localhost');
    expect(Config.SERVERS.http.port).toEqual(3000);
  });

  test('Should return the default configuration ENVIRONMENT', async () => {
    process.env.NODE_ENV = '';
    process.env.ENVIRONMENT = 'test';
    (await import('./index')).default;

    expect(process.env.ENVIRONMENT).toEqual('test');
  });

  test('Should return the default configuration NODE_ENV', async () => {
    process.env.NODE_ENV = 'test';
    process.env.ENVIRONMENT = '';
    (await import('./index')).default;

    expect(process.env.NODE_ENV).toEqual('test');
  });
});
