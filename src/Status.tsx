import React from "react";
import { Select } from "antd";
const App = (props) => {
  const { newData, setNewData } = props;
  setNewData({
      ...newData,
      status: "open"
    });

  const handleChange = (event) => {
    console.log(event);
    setNewData({
      ...newData,
      status: event.value
    }); // { value: "lucy", key: "lucy", label: "Lucy (101)" }
  };
  return (
    <Select
      value={newData.value}
      labelInValue={true}
      defaultValue={{ value: "open", label: "OPEN" }}
      style={{ width: 120 }}
      onChange={handleChange}
      options={[
        {
          value: "open",
          label: "OPEN"
        },
        {
          value: "working",
          label: "WORKING"
        },
        {
          value: "done",
          label: "DONE"
        },
        {
          value: "overdue",
          label: "OVERDUE"
        }
      ]}
    />
  );
};
export default App;
