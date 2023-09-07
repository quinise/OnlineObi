// This file includes the code for the Dashboard page=
import React, { useState } from "react";
import { auth } from "./../../GoogleProvider.tsx";
import { useAuthState } from "react-firebase-hooks/auth";
import { BaseCastArray } from "../Interfaces/BaseCastArray.tsx";
import { Cast } from "../Interfaces/Cast.tsx";

const Dashboard = () => {
  const [user, loading, error] = useAuthState(auth);
  const [cast, setCast] = useState<Cast>();
  const [isCastGenerated, setIsCastGenerated] = useState(false);
  
  // Generates a random index to use on the BaseCase Array 
  function generateRandomNumber(arrayLength: number) {
    return Math.floor(Math.random() * arrayLength)
  }

  // Generates a random index in the BaseCastArray
  const generateTargetIndex = () => {
    return generateRandomNumber(BaseCastArray.length);
  }

  const generateCast = (targetIndex: number) => {
    const castResult = createCast(targetIndex);

    setCast(castResult);
    setIsCastGenerated(true);
  }

  const createCast = (targetIndex: number) => {
    const result: Cast = {
      id: BaseCastArray[targetIndex].id,
      odu: BaseCastArray[targetIndex].odu,
      timestamp: new Date(),
      answer: BaseCastArray[targetIndex].answer,
      maleObi1: BaseCastArray[targetIndex].maleObi1,
      maleObi2: BaseCastArray[targetIndex].maleObi2,
      femaleObi1: BaseCastArray[targetIndex].femaleObi1,
      femaleObi2: BaseCastArray[targetIndex].femaleObi2,
      interpretation: BaseCastArray[targetIndex].interpretation,
      title: BaseCastArray[targetIndex].title
    };

    return result;
  }

  const resetCastState = () => {
    setCast(undefined);
    setIsCastGenerated(false);
  }  
  return (
    <>
      <h1 className="text-3xl flex items-center justify-center">Dashboard</h1>
      <div className="card">
              {user && <h2 className="text-2xl flex items-center justify-center">Welcome, {user.displayName}</h2>}
              {error && <h2>Error: {String(error)}</h2>}
              {loading && <h2>Loading...</h2>}
              {cast && <h1><b>Odu: </b>{cast.odu}</h1>}
              {cast && <h1><b>Date: </b>{cast.timestamp.toLocaleDateString()}</h1>}
              {cast && <h2><b>Answer: </b>{cast.answer}</h2>}
              {cast && <h1><b>interpretation: </b>{cast.interpretation}</h1>}

              <div>
                <button  onClick={() => generateCast(generateTargetIndex())}>Cast</button>
              </div>
              {}
      </div>
    </>
  )
}

export default Dashboard