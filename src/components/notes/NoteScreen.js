import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { NotesAppBar } from "./NotesAppBar";
import { activeNote, startDeleting } from "../../actions/notes";
export const NoteScreen = () => {
  const dispatch = useDispatch();
  const { active: note } = useSelector((state) => state.notes);

  const [formValues, handleInputChange, reset] = useForm(note);

  const { body, title, id } = formValues;

  // in order to change the active note we can create a mutable variable with useRef() and then try to use
  //useEffect to trigger an effect to change the current note.
  const activeId = useRef(note.id);
  useEffect(() => {
    if (note.id !== activeId.current) {
      reset(note);
      activeId.current = note.id; //this code will change the current id the new selected one
    }
  }, [note, reset]);

  // this useEffect is being use to track the changes made in the form values, this means everytime a value is change trigger an action
  //where this will change the state and will return a new on with the new values
  useEffect(() => {
    dispatch(activeNote(formValues.id, { ...formValues }));
  }, [formValues]);

  const handleDelete = () => {
    dispatch(startDeleting(id));
  };
  return (
    <div className="notes__main-content">
      <NotesAppBar />

      <div className="notes__content">
        <input
          type="text"
          placeholder="some awsopme title"
          className="notes__title-input"
          value={title}
          onChange={handleInputChange}
          name="title"
        />
        <textarea
          placeholder="What happened today"
          className="notes__textarea"
          value={body}
          onChange={handleInputChange}
          name="body"
        ></textarea>

        {note.url && (
          <div className="notes__image">
            <img src={note.url} alt="imagen" />
          </div>
        )}
      </div>
      <button className="btn btn-danger" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};
