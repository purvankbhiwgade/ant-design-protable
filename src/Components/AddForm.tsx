import React, { useEffect, useState } from "react";
import { Button, DatePicker, Form, Input } from "antd";
import Tags from "./Tags";
import dayjs from "dayjs";
import Status from "./Status";
import noteContext from "../context/NoteContext.js";
import { noteContextType, schema } from "../@types/antd-table.js";

interface formFields {
  title: string;
  description: string;
  dueDate: any;
  status: any;
}

interface AddFormProps {
  handleAddForm(arg0:void): void;
}

export default function AddForm({handleAddForm}: AddFormProps) {
  const { addData } = React.useContext(noteContext) as noteContextType;
  const [form] = Form.useForm();
  const [newData, setNewData] = useState<schema>({ status: "open", tags: [] });

  const [dateValue, setDateValue] = useState(null);
  const handleClick = (e: any) => {
    e.preventDefault();
    console.log("hi this is handleclick");
  };
  const onChange = (e: any) => {
    setNewData({ ...newData, [e.target.name]: e.target.value });
    // console.log(e.target.value);
  };
  const handleStatusChange = (event: any): void => {
    console.log(event);
    setNewData({
      ...newData,
      status: event.value,
    });
  };

  const onReset = () => {
    form.resetFields();
    handleAddForm();
  };

  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const onFinish = ({ title, description, dueDate, status }: formFields) => {
    var d = new Date(dueDate.$y, dueDate.$M + 1, dueDate.$D);
    console.log(dayjs(d));
    console.log(newData)
    setNewData({
      ...newData,
      title: title,
      description: description,
      dueDate: dayjs(d).format("DD-MM-YYYY"),
      timestamp: dayjs().format("DD-MM-YYYY")
    });
    console.log(newData)
    addData(newData)  
    form.resetFields();
    handleAddForm();
  };

  const handleAllTag = (allTags: string[]) => {
    console.log(allTags)
    setNewData({...newData, tags: allTags})
  }

  const handleOneTag = (oneTag: string) => {
    console.log(oneTag)
    setNewData({...newData, tags: newData.tags?.concat(oneTag)})
  }

  

  return (
    <Form
      form={form}
      initialValues={{ username: dayjs().format("DD-MM-YYYY") }}
      onFinish={onFinish}
      name="control-hooks"
    >
      <Form.Item
        name="title"
        label="Title"
        rules={[{ required: true }, { type: "string", max: 100 }]}
      >
        <Input
          placeholder="input placeholder"
        />
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: true }, { type: "string", max: 1000 }]}
      >
        <Input
          placeholder="input placeholder"
        />
      </Form.Item>
      <Form.Item
        name="dueDate"
        label="Due Date"
        rules={[{ required: true }, { type: "date" }]}
      >
        <DatePicker
          picker="date"
          placeholder="choose due date"
        />
      </Form.Item>
      <Form.Item
        name="tags"
        label="Tags"
        rules={[{ required: false }]}
      >
        <Tags newData={newData} handleAllTag={handleAllTag} handleOneTag={handleOneTag}/>
      </Form.Item>
      <Form.Item name="status" label="Status" rules={[{ required: true }]}>
        <Status
          onChange={handleStatusChange}
          value={newData?.status}
        />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button htmlType="button" onClick={onReset}>
          Reset
        </Button>
      </Form.Item>
    </Form>
  );
}
