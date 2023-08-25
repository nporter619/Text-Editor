import { openDB } from 'idb';

let db;

const initdb = async () => {
  db = await openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });
};

// Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  if (!db) {
    console.error('Database has not been initialized.');
    return;
  }

  const tx = db.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  await store.add({ content });
  await tx.done;

  console.log('Content added to the database.');
};

// Add logic for a method that gets all the content from the database
export const getDb = async () => {
  if (!db) {
    console.error('Database has not been initialized.');
    return;
  }

  const tx = db.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const contents = await store.getAll();

  return contents.map(item => item.content);
};

initdb();
