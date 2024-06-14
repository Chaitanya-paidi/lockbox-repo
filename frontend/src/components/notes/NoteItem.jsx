import React, { useContext } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import NoteContext from "../../context/notes/NoteContext";

export default function NoteItem(props) {
  const context = useContext(NoteContext);
  const {deleteNote} = context
  const { note, updateNote } = props;
  const slicedTitle = note.title.slice(0, 8) + (note.title.length > 8 ? "..." : "");
  const slicedDescription = note.description.slice(0, 10) + (note.description.length > 10 ? "..." : "");
  return (
    <div className="relative max-w-sm rounded overflow-hidden shadow-lg bg-white flex item m-3 pt-5">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{slicedTitle}</div>
        <p className="text-gray-700 text-base">
          {slicedDescription}
        </p>
      <div className="flex p-2 text-2xl absolute right-2 top-1">
          <div className="cursor-pointer" onClick={() => {deleteNote(note._id)}}><MdDelete /></div>
          <div className="cursor-pointer" onClick={()=>{updateNote(note)}}><FaEdit/></div>
        </div>
      </div>  
    </div>
  );
}