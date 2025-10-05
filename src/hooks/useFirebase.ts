import { auth, db } from '../firebase';
import { getStorage } from "firebase/storage";

// Example hook that provides auth, firestore, and storage instances
const useFirebase = () => {
  const storage = getStorage();

  return { auth, db, storage };
};

export default useFirebase;
