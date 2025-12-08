// This file provides the code that reads all of the documents in the Firebase "casts" collection
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { auth, db } from "../../firebase.config";
import { Cast } from "../interfaces/Cast.js";


function fetchCasts (callback: (casts: any[]) => void) {
        // If there's no authenticated user at the time of calling, do not attach a listener.
        const uid = auth.currentUser?.uid;
        if (!uid) {
                // Return a noop unsubscribe so callers can always call the returned function safely.
                return () => {};
        }

        const castsRef = collection(db, "casts");
        const queryCasts = query(castsRef, where("user", "==", uid));
    
        // Query the database for casts from the signed in user
        const unsubscribe = onSnapshot(
            queryCasts,
            (snapshot) => {
                const temp: Cast[] = [];

                snapshot.forEach((doc) => {
                    const incommingCast: Cast = {
                        id: doc.id,
                        odu: doc.data().odu,
                        timestamp: doc.data().timestamp,
                        answer: doc.data().answer,
                        maleObi1: doc.data().maleObi1,
                        maleObi2: doc.data().maleObi2,
                        femaleObi1: doc.data().femaleObi1,
                        femaleObi2: doc.data().femaleObi2,
                        interpretation: doc.data().interpretation,
                        title: doc.data().title
                    };

                    temp.push(incommingCast);
                });

                callback(temp);
            },
            (error) => {
                // Handle permission or other errors gracefully.
                console.error('fetchCasts onSnapshot error:', error);
                // Provide an empty list so UI can clear sensitive data after errors like permission-denied
                callback([]);
            }
        );

        return () => unsubscribe();

}

export { fetchCasts };
