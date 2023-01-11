import React, { useEffect, useRef, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Input, Tag, Tooltip } from "antd";

const App = (props) => {
  // const [tags, setTags] = useState([]);
  const { newData, setNewData } = props;
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState("");
  const inputRef = useRef(null);
  const editInputRef = useRef(null);

  useEffect(() => {
    if (inputVisible) {
      if (inputRef.current !== null) {
        inputRef.current.focus();
      }
    }
  }, [inputVisible]);

  useEffect(() => {
    if (editInputRef.current !== null) {
      editInputRef.current.focus();
    }
  }, [inputValue]);

  const handleClose = (removedTag) => {
    const newTags = newData.tags.filter((tag) => tag !== removedTag);
    console.log(newTags);
    setNewData({ ...newData, tags: newTags });
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && newData.tags && newData.tags.indexOf(inputValue) === -1) {
      // setTags([...tags, inputValue]);
      setNewData({ ...newData, tags: newData.tags.concat(inputValue) });
    }
    setInputVisible(false);
    setInputValue("");
  };

  const handleEditInputChange = (e) => {
    setEditInputValue(e.target.value);
  };

  const handleEditInputConfirm = () => {
    const newTags = [...newData.tags];
    newTags[editInputIndex] = editInputValue;
    setNewData({ ...newData, tags: newTags });
    setEditInputIndex(-1);
    setInputValue("");
  };

  return (
    <>
      {newData.tags &&
        newData.tags.map((tag, index) => {
          if (editInputIndex === index) {
            return (
              <Input
                ref={editInputRef}
                key={tag}
                size="small"
                className="tag-input"
                value={editInputValue}
                onChange={handleEditInputChange}
                onBlur={handleEditInputConfirm}
                onPressEnter={handleEditInputConfirm}
              />
            );
          }

          const isLongTag = tag.length > 8;

          const tagElem = (
            <Tag
              closable
              className="edit-tag"
              key={tag}
              //closable={index !== 0}
              onClose={() => handleClose(tag)}
            >
              <span
                onDoubleClick={(e) => {
                  if (index !== 0) {
                    setEditInputIndex(index);
                    setEditInputValue(tag);
                    e.preventDefault();
                  }
                }}
              >
                {isLongTag ? `${tag.slice(0, 8)}...` : tag}
              </span>
            </Tag>
          );
          return isLongTag ? (
            <Tooltip title={tag} key={tag}>
              {tagElem}
            </Tooltip>
          ) : (
            tagElem
          );
        })}
      {inputVisible && (
        <Input
          ref={inputRef}
          type="text"
          size="small"
          className="tag-input"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      )}
      {!inputVisible && (
        <Tag className="site-tag-plus" onClick={showInput}>
          <PlusOutlined /> New Tag
        </Tag>
      )}
    </>
  );
};

export default App;
