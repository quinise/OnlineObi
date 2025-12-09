// This file includes the code for the page with a list of saved casts.
import React, { Fragment, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { uid } from "uid";
import { auth } from "../../firebase.config";
import { Cast } from "../interfaces/Cast.tsx";
import { handleDelete } from "../services/deleteCast.tsx";
import { fetchCasts } from "../services/fetchCasts.tsx";
import { handleUpdate } from "../services/updateCast.tsx";
import Loader from "./Loader.tsx";
import Modal from "./Modal.tsx";
import Button from "./ui/Button";
import Loader from "./Loader.tsx";

const CastList = () => {
  const [user] = useAuthState(auth);
  const [casts, setCasts] = useState<Cast[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTitle, setNewTitle] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [confirmDeleteCast, setConfirmDeleteCast] = useState<Cast | null>(null);
  const [cast, setCast] = useState<Cast>({
    id: uid(), 
    odu:" Aalaffia - Ogbe",
    timestamp: Date.now(), 
    answer: "Yes", 
    maleObi1: "Male1Up.png", 
    maleObi2: "Male2Up.png", 
    femaleObi1: "Female1Up.png", 
    femaleObi2: "Female2Up.png", 
    interpretation: "Symbolizes good general welfare", 
    title: ""
  });

  const handleEdit = async () => {
    setShowModal(true);
    setShowInput(true);
  }

  // Provide the Module component with the selected cast
  function setModuleCast(inputCast: Cast) {
     setCast(inputCast);
     setShowModal(true);
     setShowInput(false);
     return cast;
  }

  // Provide the HTML for a the user's list of uniquely titled casts
      const renderListOfCasts = (uniqueCasts: Cast[]) => {
    return (
      <div>
        {uniqueCasts && uniqueCasts.map((castFromList: Cast) => (
          <div key={castFromList.id} className="mb-6 px-4">
              <div className="max-w-full md:max-w-[24rem] w-3/4 md:w-full mx-auto">
              <div
                className="w-full mt-6 mx-auto h-40 p-1.5 bg-forrest/60 border-2 border-forrest/60 rounded-tl-2xl shadow-md block transform transition-transform hover:scale-105 hover:shadow-lg cursor-pointer"
                onClick={() => setModuleCast(castFromList)}
              >
                <div className="w-full h-36 pt-12 pl-4 bg-forrest/20 rounded-lg border-2 border-forrest/40 flex justify-between">
                  <div>
                    <h1 className="text-2xl text-ivory font-serif">{castFromList.title}</h1>
                    <p className="text-sm text-ivory/80 mt-1">Created on {new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).format(new Date(castFromList.timestamp))}</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Edit and Delete Buttons */}
            <div className="flex gap-4 justify-center mt-2">
              <Button
                variant="primary"
                size="md"
                className="h-12 px-5 py-2 font-sans-serif rounded-md"
                onClick={() => handleEdit()}
                aria-label={`Edit cast ${castFromList.title}`}
              >
                Edit Cast
              </Button>
              <Button
                variant="secondary"
                size="md"
                className="!bg-red !text-white font-sans-serif hover:bg-darkRed hover:scale-105 hover:shadow-lg transition-transform h-12 px-5 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"
                onClick={() => setConfirmDeleteCast(castFromList)}
                aria-label={`Delete cast ${castFromList.title}`}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    );
  }

  React.useEffect(() => {
    // Attach casts listener only when a user is signed in and clean up on sign-out/unmount.
    let unsubscribe: (() => void) | undefined = undefined;

    if (user?.uid) {
      setLoading(true);
      unsubscribe = fetchCasts((data: Cast[]) => {
        // Sort the casts by timestamp
        const timestampDescending = [...data].sort((a, b) => b.timestamp - a.timestamp);
        setCasts(timestampDescending);
        setLoading(false);
      });
    } else {
      // Clear list when no user is present
      setCasts([]);
      setLoading(false);
    }

    return () => {
      try {
        if (unsubscribe) unsubscribe();
      } catch (e) {
        // ignore cleanup errors
      }
    };
  }, [user]);

  return (
    // Render the list of casts with search functionality
    <Fragment>
      {user && <h2 className="text-3xl text-forrest font-serif mt-10 flex items-center justify-center">{user.displayName}'s Casts</h2>}
      {loading && <Loader />}
      <div className="flex items-center justify-center">
        <h3 className="text-2xl text-mahogany font-serif mt-10 flex items-center justify-center">Cast Search </h3>
      </div>
      <div className="flex items-center justify-center">
        <input type="text" 
          className="text-2xl text-mahogany font-serif mt-5 flex items-center justify-center border-2 border-forrest/60 rounded"
          onChange={(e) => setSearchValue(e.target.value)}
          value={ searchValue }
          />
      </div>
      <div className="mt-10 flex flex-col items-center justify-center">
        {searchValue && casts
        .filter((searchCast) => {
          return searchValue.toLowerCase() === ''
          ? searchCast
          : searchCast.title.toLowerCase().includes(searchValue.toLowerCase());
        })
        .map((castFromList: Cast) => (
          <div key={castFromList.id} className="w-full flex items-center justify-center px-4">
              <div className="max-w-full md:max-w-[28rem] w-3/4 md:w-full mx-auto">
              <div
                onClick={() => setModuleCast(castFromList)}
                className="mt-6 mx-auto md:w-full h-40 p-1.5 bg-forrest/60 border-2 border-forrest/60 rounded-tl-2xl shadow-md block transform transition-transform hover:scale-105 hover:shadow-lg cursor-pointer"
              >
                <div className="w-full h-36 pt-12 pl-4 bg-forrest/20 rounded-lg border-2 border-forrest/40 flex justify-between">
                  <div>
                    <h1 className="text-2xl text-ivory font-serif">{castFromList.title}</h1>
                    <p className="text-sm text-ivory/80 mt-1">{new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).format(new Date(castFromList.timestamp))}</p>
                  </div>
                </div>
              </div>
              {/* Edit and Delete Buttons */}
              <div className="mb-5 flex gap-4 justify-center mt-2">
                <Button
                  variant="primary"
                  size="md"
                  className="h-12 px-5 py-2 font-sans-serif rounded-md"
                  onClick={() => handleEdit()}
                >
                  Edit Cast
                </Button>
                <Button
                  variant="secondary"
                  size="md"
                  className="!bg-red !text-white font-sans-serif hover:bg-darkRed hover:scale-105 hover:shadow-lg transition-transform h-12 px-5 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"
                  onClick={() => setConfirmDeleteCast(castFromList)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <hr className="text-forrest rounded-lg bold md:w-[70%] lg:w-[70%] md:mx-auto lg:mx-auto mb-8 "/>
      <div className="pb-10">
        {renderListOfCasts(casts)}
      </div>
      {/* View/Edit Cast Modal */}
      <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
        <div className="p-6">
          <div className="mx-auto md:mx-auto ml:mx-auto">
          {showInput ? <input className="text-forrest font-sans-serif mb-2 flex mx-auto" placeholder={newTitle} value={newTitle} onChange={(e) => setNewTitle(e.target.value)}/>
          : <h3 className="text-xl font-semibold text-forrest font-serif mb-5 flex justify-center"
            >{cast.title}</h3>
            }
            <hr className="h-0.5 bg-forrest rounded-lg w-3/4 mx-auto md:w-[70%] md:mx-auto mb-8" />
          </div>
          <div className="">
            <p className="text-xl text-forrest font-serif mb-5"><b>Odu:</b>  {cast.odu}</p>
            <p className="text-xl text-forrest font-serif mb-5"><b>Date:</b>  {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(cast.timestamp)}</p>
            <p className="text-xl text-forrest font-serif mb-5"><b>Answer :</b> {cast.answer}</p>
            <p className="text-xl text-forrest font-serif mb-5"><b>Interpretation:</b>  {cast.interpretation}</p>
          </div>
          <div className="md:w-[100%] lg:w-[100%] mt-8 mb-8 flex justify-center">
            <img className="object-scale-down h-32 w-32 inline-block transform transition-transform hover:scale-125" src={`../assets/${cast.maleObi1}`}/>
            <img className="object-scale-down h-32 w-32 inline-block transform transition-transform hover:scale-125" src={`../assets/${cast.maleObi2}`}/>
            <img className="object-scale-down h-32 w-32 inline-block transform transition-transform hover:scale-125" src={`../assets/${cast.femaleObi1}`}/>
            <img className="object-scale-down h-32 w-32 inline-block transform transition-transform hover:scale-125" src={`../assets/${cast.femaleObi2}`}/>
          </div>
          {showInput && (
            <div className="flex justify-center">
              <Button
                className="ml-0 mt-1 mb-1 mr-0 !bg-forrest !text-ivory"
                variant="primary"
                size="md"
                onClick={() => handleUpdate(cast, newTitle)}
              >
                Save
              </Button>
            </div>
          )}
        </div>
      </Modal>
      {/* Confirm delete modal */}
      <Modal isVisible={!!confirmDeleteCast} onClose={() => setConfirmDeleteCast(null)}>
        <div className="p-6">
          <h3 className="text-xl text-forrest font-serif mb-4">Confirm deletion</h3>
          <p className="mb-6">Are you sure you want to delete "{confirmDeleteCast?.title}"? This action cannot be undone.</p>
          <div className="flex justify-center gap-4">
            <Button variant="ghost" size="md" onClick={() => setConfirmDeleteCast(null)}>Cancel</Button>
            <Button
              variant="secondary"
              size="md"
              className="!bg-red !text-white hover:bg-darkRed hover:scale-105 hover:shadow-lg transition-transform focus:outline-none focus:ring-2 focus:ring-red-300"
              onClick={() => {
                if (confirmDeleteCast) handleDelete(confirmDeleteCast);
                setConfirmDeleteCast(null);
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </Fragment>
  )
}

export default CastList;