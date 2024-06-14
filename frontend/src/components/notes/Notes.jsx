import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../../context/notes/NoteContext";
import NoteView from "./NoteView";
import NoteItem from "./NoteItem";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";

function Notes() {
  const ref = useRef(null);
  const navigate = useNavigate();
  const context = useContext(NoteContext);
  const { notes, getNotes, editNote } = context;

  const [showModal, setShowModal] = useState(false);
  const [note, setNote] = useState({ etitle: "", edescription: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false)
  
  const notesPerPage = 10;

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNotes();
    } else {
      navigate("/");
    }
  }, []);

  const updateNote = (currentNote) => {
    setShowModal(!showModal);
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
    });
  };

  const handleClick = () => {
    editNote(note.id, note.etitle, note.edescription);
    setShowModal(false);
  };

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleShowform = () =>{
    setShowForm(true)
  }

  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = notes.slice(indexOfFirstNote, indexOfLastNote);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Navbar />
      <button className={`relative max-w-sm shadow-lg bg-cyan-600 flex items m-3 ml-7 p-3 rounded-md ${showForm ? "hidden" : ""}`}  onClick={handleShowform}>Add new</button>
      {showForm && <NoteView showForm={showForm} setShowForm={setShowForm} />}
      {showModal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl" ref={ref}>
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t"></div>
                <div className="flex items-center justify-center">
                  <form className="flex flex-col w-[700px]">
                  <label className="text-left ml-5 mt-2">Edit Title</label>
                    <input
                      type="text"
                      placeholder="title"
                      name="etitle"
                      className="border-2 border-black p-2 mb-2 mr-5 ml-5"
                      onChange={handleChange}
                      value={note.etitle}
                      required
                    />
                  <label className="text-left ml-5 mt-2">Edit Description</label>
                    <textarea
                      name="edescription"
                      cols="50"
                      rows="5"
                      placeholder="description"
                      className="border-2 border-black p-2 mr-5 ml-5"
                      onChange={handleChange}
                      value={note.edescription}
                      required
                    ></textarea>
                  </form>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-cyan-600 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleClick}
                    disabled={note.etitle.length < 1 || note.edescription.length < 1}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
      {!showForm && <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 p-4">
        {currentNotes.map((note) => (
          <NoteItem key={note._id} updateNote={updateNote} note={note} />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(notes.length / notesPerPage) }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-3 py-1 rounded ${
              currentPage === index + 1 ? "bg-cyan-600 text-white" : "bg-gray-300"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      </div>}
    </div>
  );
}

export default Notes;
