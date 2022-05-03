import createConnection from '@external/orm';

export default async (): Promise<void> => {
  try {
    await createConnection();
    console.log('Database connection started.');
  } catch (err) {
    console.log(err);
  }
};
