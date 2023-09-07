// This file includes the code for the Dashboard page=
import { useState } from "react";
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
  
  function DisplayWithoutCast() {
    return (
      <>
      <h1 className="text-3xl flex items-center justify-center">Dashboard</h1>
      <div className="card">
              {user && <h2 className="text-2xl flex items-center justify-center">Welcome, {user.displayName}</h2>}
              {error && <h2 className="text-2xl flex items-center justify-center">Error: {String(error)}</h2>}
              {loading && <h2 className="text-2xl flex items-center justify-center">Loading...</h2>}
              <div className="mt-5 mb-10 flex items-center justify-center">
                <button className="bg-blue-600/90 px-5 py-5"  onClick={() => generateCast(generateTargetIndex())}>Cast</button>
              </div>
              {}
      </div>
    </>
    )
  }

  function DisplayWithCast() {
    return (
      <>
        <h1 className="text-3xl flex items-center justify-center">Dashboard</h1>
        <div className="card">
                {user && <h2 className="text-2xl flex items-center justify-center">Welcome, {user.displayName}</h2>}
                {error && <h2 className="text-2xl flex items-center justify-center">Error: {String(error)}</h2>}
                {loading && <h2 className="text-2xl flex items-center justify-center">Loading...</h2>}
                {cast && <h1 className="text-2xl mt-20 flex items-center justify-center"><b>Odu:&nbsp;</b>{cast.odu}</h1>}
                {cast && <h1 className="text-2xl mt-5 flex items-center justify-center"><b>Date:&nbsp;</b>{cast.timestamp.toLocaleDateString()}</h1>}
                {cast && <h1 className="text-2xl mt-5 flex items-center justify-center"><b>Answer:&nbsp;</b>{cast.answer}</h1>}
                {cast && <h1 className="text-2xl mt-5 flex items-center justify-center"><b>Interpretation:&nbsp;</b>{cast.interpretation}</h1>}
                <div className="container mx-auto mt-5 mb-5 h-20 w-20 flex items-center justify-center">
                  {cast && <img className="object-scale-down h-5 w-5 inline" src={`src/assets/${cast.maleObi1}`}/>}
                  {cast && <img className="object-scale-down h-5 w-5 inline" src={`src/assets/${cast.maleObi2}`}/>}
                  {cast && <img className="object-scale-down h-5 w-5 inline" src={`src/assets/${cast.femaleObi1}`}/>}
                  {cast && <img className="object-scale-down h-5 w-5 inline" src={`src/assets/${cast.femaleObi2}`}/>}
                </div>
                <div className="mt-10 mb-10 flex items-center justify-center">
                  <button className="bg-blue-600/90 px-5 py-5" onClick={() => generateCast(generateTargetIndex())}>Cast</button>
                </div>
        </div>
      </>
    )
  }

  if (isCastGenerated) {
    return <DisplayWithCast/>
  } else {
    return <DisplayWithoutCast/>
  }
}

export default Dashboard