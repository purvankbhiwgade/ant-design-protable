import React, { useState } from "react";
import { Button, Modal } from "antd";
import Content from "./Content";
import { PlusOutlined } from "@ant-design/icons";

export default function ToolBar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button
        key="button"
        icon={<PlusOutlined onClick={showModal} />}
        type="primary"
      >
        new
      </Button>
      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Content />
      </Modal>
    </>
  );
}
