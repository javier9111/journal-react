import moment from "moment";
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { startSaveNote, startUploading } from "../../actions/notes";

export const NotesAppBar = () => {
  const dispatch = useDispatch();
  const { active } = useSelector((state) => state.notes);

  const noteDate = moment(active.date);
  /* Referencia para el <input>. Se crea del componente*/
  const inputArchivo = useRef(null); // De inicio no se asigna a nada.
  const handleSave = (e) => {
    e.preventDefault();
    dispatch(startSaveNote(active));
  };

  const handlePictureClick = () => {
    inputArchivo.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(startUploading(file));
    }
  };
  return (
    <div className="notes__appbar">
      <span>{noteDate.format("LL")}</span>

      <input
        id="fileSelector"
        // this reference is used to bined the dom element to the variable.
        ref={inputArchivo}
        type="file"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <div>
        <button className="btn" onClick={handlePictureClick}>
          Picture
        </button>
        <button className="btn" onClick={handleSave}>
          save
        </button>
      </div>
    </div>
  );
};
