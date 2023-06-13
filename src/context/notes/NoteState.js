import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ3N2E2NThlNDRjMmVmNjhkYmU5YjM4In0sImlhdCI6MTY4NTU2NjEyMn0.MbjusZI_d3b_0RTkE2OtbHNHDOdcgtnCAJrP2-oP08o"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)
  // Get all Notes
  const getNotes = async () => {
    // API Call 
    const response = await fetch(`${host}/api/Notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": authToken
      }
    });
    const json = await response.json()
    setNotes(json)
  }
  const addNote = async (title, description, tag) => {
    // API Call 
    const response = await fetch(`${host}/api/Notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": authToken
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json()
    setNotes(notes.concat(note))
  }

  // Delete a Note

  const deleteNote = async (id) => {

    // call api because delete connect ho sake database se bhi
    // API Call 
    const response = await fetch(`${host}/api/Notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": authToken
      }
    });
    const json = await response.json()
    console.log(json)
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes);
  }

  // Edit a Note

  const editNote = async (id, title, description, tag) => {
    // API Call 
    const response = await fetch(`${host}/api/Notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": authToken
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json()
    console.log(json)
    let newNotes = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
        break; 
      }}
      setNotes(newNotes);
    }
  return (
    <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;