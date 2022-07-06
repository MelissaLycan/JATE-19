import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// Add logic to a method that accepts some content and adds it to the database
export const putDb = async (id, value) => {
  try {
    const textDb = await openDB("jate", 1);
    // make new transaction...need to specify the DB we are posting to and the data privileges.
    const tx = textDb.transaction("jate", "readwrite");
    // open the object store
    const objStore = tx.objectStore("jate");
    // use the .add() method to pass in content
    const req = objStore.add({ id: id, value: value });
    // Confirm data was added
    const res = await req;
    console.log("data saved to the textDB", res);
  } catch (err) {
    console.error("putDb not implemented");
  }
};
// Add logic for a method that gets all the content from the database
export const getDb = async () => {
  try {
    const textDb = await openDB("jate", 1);
    // make new transaction...need to specify the DB we are posting to and the data privileges.
    const tx = textDb.transaction("jate", "readwrite");
    // open the object store
    const objStore = tx.objectStore("jate");
    // use the .getAll() method to query all
    const req = objStore.getAll();
    // Confirm data retrieved
    const res = await req;
    console.log("data saved to the textDB", res);
  } catch (err) {
    console.error("getDb not implemented");
  }
};

initdb();
