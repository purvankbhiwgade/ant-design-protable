import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "./context/NoteContext";
//import AddNote from "./AddNote";
//import Noteitem from "./Noteitem";
//import { useNavigate } from "react-router-dom";
//import Noteitem from './Noteitem';

const Notes = () => {
  const context = useContext(noteContext);
  const { table, getNotes, updateData } = context;

  const ref = useRef(null);
  const refClose = useRef(null);

  const [data, setData] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "General"
  });

  const updateNote = (currentNote) => {
    ref.current.click();
    setData({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag
    });
  };

  const handleClick = (e) => {
    // console.log("updating the note...", note)
    updateData(table.id, table.etitle, table.edescription, table.etag);
    refClose.current.click();
  };

  const onChange = (e) => {
    setData({ ...table, [e.target.name]: e.target.value });
  };

  return (
    <>
      {/* Edit the note */}
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Entry
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={data.etitle}
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    minLength={5}
                    required
                    className="form-control"
                    value={data.edescription}
                    id="edescription"
                    name="edescription"
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    tag
                  </label>
                  <input
                    type="text"
                    minLength={5}
                    required
                    className="form-control"
                    value={data.etag}
                    id="etag"
                    name="etag"
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                disabled={data.edescription.length > 1000}
                onClick={handleClick}
                type="button"
                className="btn btn-primary"
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notes;
