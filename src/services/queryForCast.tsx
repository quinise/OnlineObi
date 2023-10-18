import { collection, onSnapshot, query, where } from "firebase/firestore";
import { auth } from "../../GoogleProvider.js";
import { Cast } from "../interfaces/Cast.js";
import { db } from "../../firebase.config.js";

function queryCasts(title: string, callback) {
    const castsRef = (collection(db, "casts"));
    const queryCasts = query(castsRef, where("user", "==", auth.currentUser?.uid), where("title", "==", title));

     // Query the database for casts with the title parameter from the signed in user
     const unsubscribe = onSnapshot(queryCasts, (snapshot) => {

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
            }
    
                temp.push(incommingCast);
                return incommingCast;
        })
    
            callback(temp);
    
        });
    
        return () => unsubscribe();
}

export { queryCasts }