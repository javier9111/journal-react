import { collection, getDocs } from "@firebase/firestore";
import { db } from "../firebase/firebase-config";

export const loadNotes = async (uid) => {
  const notesSnap = await getDocs(collection(db, `${uid}/journal/notes/`));
  const notes = [];
  //here we restructure the snaphijo so we can include the id in our array, that's why we created the array, because the snaphijo does not
  //have the property id inside the objet "data"
  notesSnap.forEach((snapHijo) => {
    notes.push({
      id: snapHijo.id,
      ...snapHijo.data(),
    });
  });
  return notes;
};
