import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext';

const Noteitem = (props) => {
    const context = useContext(NoteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;
    return (
        <div className="col-md-4">
            <div className="card">
                <div className="card-body mx-2 my-2">
                    <h5 className="card-title"> {note.title}</h5>
                    <p className="card-text">  {note.description}</p>
                    <p className="card-text">{note.tag}</p>
                    <div className="d-flex justify-content-between">

                        <i className="fa-solid fa-calendar-xmark" onClick={() => {
                            deleteNote(note._id);
                            props.showAlert("deleted successfully", "danger")
                        }}></i>
                        <i className="fa-solid fa-pen-to-square" onClick={() => { updateNote(note)}}></i>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Noteitem
