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

export default function EditForm() {
  const { addData } = React.useContext(noteContext) as noteContextType;
  const [form] = Form.useForm();
  const [newData, setNewData] = useState<schema>({ status: "open", tags: [] });
  //   useEffect(() => {
  //     setNewData({
  //         id: "",
  //         title: "",
  //         description: "",
  //         dueDate: "",
  //         timestamp: "",
  //         tags: [],
  //         status: "",
  //       })
  //   }, [newData])

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
  };

  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const onFinish = ({ title, description, dueDate, status }: formFields) => {
    var d = new Date(dueDate.$y, dueDate.$M + 1, dueDate.$D);
    console.log(dayjs(d));
    setNewData({
      ...newData,
      title: title,
      description: description,
      dueDate: dayjs(d).format("DD-MM-YYYY"),
      status: status.value,
    });
    form.resetFields();
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
          //   onChange={onChange}
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
          //   onChange={onChange}
          value={newData.description}
          placeholder="input placeholder"
        />
      </Form.Item>
      <Form.Item
        name="dueDate"
        label="Due Date"
        rules={[{ required: true }, { type: "date" }]}
      >
        <DatePicker
          //   onChange={handleDateUpdate}
          //   value={dayjs(newData.timestamp, "DD-MM-YYYY")}
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
        <Tags newData={newData} handleAllTag={handleAllTag} handleOneTag={handleOneTag}/>
      </Form.Item>
      <Form.Item name="status" label="Status" rules={[{ required: true }]}>
        <Status
          //   newData={newData}
          //   setNewData={setNewData}
          onChange={handleStatusChange}
          value={newData?.status}
        />
      </Form.Item>
      <Form.Item {...tailLayout}>
        {/* <Button type="primary" onClick={handleClick}>
          Submit
        </Button> */}
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
