import { collection, getDocs } from "firebase/firestore";
import { db } from "../Firebase"; // Adjust path if necessary

export const fetchHospitals = async () => {
  try {
    const hospitalsCollection = collection(db, "hospitals");
    const querySnapshot = await getDocs(hospitalsCollection);

    const hospitalsList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return hospitalsList;
  } catch (error) {
    console.error("Error fetching hospitals: ", error);
    return [];
  }
};
