import React, { useContext, useState } from "react";
import NoteContext from "../../context/notes/NoteContext";

function NoteView(props) {
  const context = useContext(NoteContext);
  const { addNote } = context;

  const [note, setNote] = useState({title: "", description: "" })

  const handleSubmit = (e) => {
    e.preventDefault();
    addNote(note.title, note.description)
    setNote({title: "", description: "" })
    props.setShowForm(false)
  };

  const handleChange = (e)=>{
    setNote({...note, [e.target.name]: e.target.value})
  }
  return (
    <div>
      <div className="flex items-center justify-center mt-10 " onSubmit={handleSubmit}>
        <form className="flex flex-col w-[400px]" >
          <input
            type="text"
            placeholder="title"
            name="title"
            className="border-2 border-black p-2 mb-2"
            onChange={handleChange}
            value={note.title}
            required
          />
          <textarea
            name="description"
            cols="50"
            rows="5"
            placeholder="description"
            className="border-2 border-black p-2"
            onChange={handleChange}
            value={note.description}
            required
          ></textarea>
          <button
            type="submit"
            className="bg-cyan-700 border-2 border-white px-5 py-3 text-white mt-4"
            disabled={note.title.length<1 || note.description.length<1}
          >
            Add Notes
          </button>
        </form>
      </div>
    </div>
  );
}

export default NoteView;
