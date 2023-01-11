import NoteContext from "./NoteContext";
import React, { useState } from "react";
import { schema, noteContextType } from "../@types/antd-table";
interface Props {
  children: React.ReactNode;
}

const NoteState: React.FC<Props> = ({children}) => {
  const [table, setTable] = useState<schema[]>([]);

  //yayy

  //Add a new Table
  const addData = async (props: schema) => {
    const { title, description, dueDate, timestamp, tags, status } = props;
    //TODO: API call
    const response = await fetch(
      `https://63b951ba4482143a3f0e08ea.mockapi.io/api/keyur/todo`,
      {
        method: "POST",
        //mode: 'cors',
        headers: {
          "Content-Type": "application/json"
          //'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({
          title,
          description,
          dueDate,
          timestamp,
          tags,
          status
        }) // body data type must match "Content-Type" header
      }
    );
    const json:schema = await response.json();

    //Logic to add in client side
    console.log("adding a new note");

    const entry = json;
    setTable(table.concat(entry));
  };

  //Get all notes
  const getData = async () => {
    //API call
    const response = await fetch(
      `https://63b951ba4482143a3f0e08ea.mockapi.io/api/keyur/todo`,
      {
        method: "GET",
        //mode: 'cors',
        headers: {
          "Content-Type": "application/json"
          //'auth-token': localStorage.getItem('token')
        }
      }
    );
    const json = await response.json();
    //console.log(json)
    setTable(json);
  };

  //Delete a note
  const deleteData = async (id: number) => {
    //API call

    const response = await fetch(
      `https://63b951ba4482143a3f0e08ea.mockapi.io/api/keyur/todo/${id}`,
      {
        method: "DELETE",

        headers: {
          "Content-Type": "application/json"
          //'auth-token': localStorage.getItem('token')
        }
      }
    );
    const json = await response.json();
    console.log(json);

    //Logic to delete in client side
    console.log("deleting a note with id" + id);
    const newTable = table.filter((note) => {
      return Number(note.id) !== id;
    });
    setTable(newTable);
  };

  //Update a note
  // const updateData = async (id, title, description, tag)=>{

  //   //TODO: Api call
  //   const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
  //       method: 'PUT',

  //       headers: {
  //         'Content-Type': 'application/json',
  //         'auth-token': localStorage.getItem('token')

  //       },
  //       body: JSON.stringify({title, description, tag}) // body data type must match "Content-Type" header
  //     });
  //     const json = await response.json();
  //     console.log(json);

  //   let newNotes = JSON.parse(JSON.stringify(notes))
  //   //Logic to edit in client side
  //   for (let index = 0; index < newNotes.length; index++) {
  //       const element = newNotes[index];

  //         if (element._id === id) {
  //             newNotes[index].title = title;
  //             newNotes[index].description = description;
  //             newNotes[index].tag = tag;
  //             break;
  //         }

  //     }
  //     setNotes(newNotes);

  // }

  return (
    <NoteContext.Provider value={{ table, addData, getData, deleteData }}>
      {children}
    </NoteContext.Provider>
  );
};
export default NoteState;
