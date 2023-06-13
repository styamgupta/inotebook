import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/NoteContext';
const AddNote = (props) => {
  const context = useContext(NoteContext);
  const {addNote} = context;

    const [note, setNote] = useState({title: "", description: "", tag: ""})

    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title: "", description: "", tag: ""})
        props.showAlert("Added Note successfully", "success")

    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }  
  return (
    <div className="container my-3">
            <h2>Add a Note</h2>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" value={note.title} aria-describedby="emailHelp" onChange={onChange} minLength={5} required/> 
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input value={note.description} type="text" className="form-control" id="description" name="description" onChange={onChange} minLength={5} required/>
                </div> 
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" value={note.tag} className="form-control" id="tag" name="tag" onChange={onChange} />
                </div>
                
                <button disabled={note.title.length<5||note.description.length<5} type="submit" className="btn btn-success" onClick={handleClick}>Save Note</button>
            </form>
        </div>
  )
}

export default AddNote
