import React from "react";
import { Button, DatePicker, Form, Input } from "antd";
import Tags from "./Tags.js";
import Status from "./Status.js";
import { useContext, useState } from "react";
import noteContext from "./context/NoteContext.js";

// gagaga

export default function Content() {
  const context = useContext(noteContext);
  const { addData } = context;

  const [form] = Form.useForm();
  //console.log(form);

  const [newData, setNewData] = useState({
    title: "",
    description: "",
    dueDate: "",
    timestamp: "",
    tags: [],
    status: ""
  });

  const [dateValue, setDateValue] = useState(null);

  const handleClick = (e) => {
    e.preventDefault();
    // console.log(form.getFieldsValue());
    const currentValue = form.getFieldsValue();
    delete currentValue[""];
    console.log(currentValue, "current val");
    const dummy = {
      ...newData,
      title: currentValue.title,
      description: currentValue.description,
      // dueDate: `${currentValue.$D}-${currentValue.$M + 1}-${currentValue.$y}`,
      timestamp: Date()
    };
    delete dummy[""];
    //yaay
    console.log(dummy, "dummy");
    setNewData(dummy);
    addData(dummy);
    // setNewData({ title: "", description: "", dueDate: "" });
  };

  const onChange = (e) => {
    setNewData({ ...newData, [e.target.name]: e.target.value });
    // console.log(e.target.value);
  };

  const handleDateUpdate = (e) => {
    console.log(e);
    if (e !== null) {
      console.log(`${e.$D}-${e.$M + 1}-${e.$y}`);
      newData.dueDate = `${e.$D}-${e.$M + 1}-${e.$y}`;
    }
    //setNewData({ ...newData, [e.target.name]: e.target.value });
    // const dateValue = e.target.value;
    // setDateValue(dateValue);
  };

  return (
    <Form
      // {labelCol: { span: 4 },
      // wrapperCol: { span: 14 }}
      layout={"horizontal"}
      form={form}
      initialValues={{ layout: "horizontal" }}
    >
      <Form.Item
        name="title"
        label="Title"
        help="Max 100 characters"
        rules={[{ required: true }, { type: "string", max: 100 }]}
      >
        <Input
          onChange={onChange}
          value={newData.title}
          placeholder="input placeholder"
        />
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
        //help="Max 1000 characters"
        rules={[{ required: true }, { type: "string", max: 1000 }]}
      >
        <Input
          onChange={onChange}
          value={newData.description}
          placeholder="input placeholder"
        />
      </Form.Item>
      <Form.Item
        name="dueDate"
        label="Due Date"
        //help="Max 1000 characters"
        rules={[{ required: true }, { type: "date" }]}
      >
        <DatePicker
          onChange={handleDateUpdate}
          value={newData.dueDate}
          picker="date"
          placeholder="choose due date"
        />
      </Form.Item>
      <Form.Item
        name="tags"
        label="Tags"
        //help="Max 1000 characters"
        rules={[{ required: false }]}
      >
        <Tags newData={newData} setNewData={setNewData} />
      </Form.Item>
      <Form.Item name="Status" label="Status" rules={[{ required: true }]}>
        <Status
          newData={newData}
          setNewData={setNewData}
          onChange={onChange}
          value={newData.status}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" onClick={handleClick}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
