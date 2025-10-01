import { openDB } from "idb";

const dbPromise = openDB("CalcCrochetDB", 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains("calcCrochet")) {
      db.createObjectStore("calcCrochet", {
        keyPath: "id",
        autoIncrement: true,
      });
    }
  },
});
