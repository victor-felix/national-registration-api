import databaseProvider from './database-provider';

export default async (): Promise<void> => {
  await databaseProvider();
};
