import React, { useEffect, useRef, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Input, InputRef, Tag, Tooltip } from "antd";
import { schema } from "../@types/antd-table";

type tagsInterface = {
  newData: schema;
  handleAllTag(arg0:string[]) : void;
  handleOneTag(arg0:string):  void;
}

const Tags = ({ newData, handleAllTag, handleOneTag }: tagsInterface) => {
  const [tags, setTags] = useState<string[] | undefined>(newData.tags);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    if (inputVisible) {
        inputRef.current?.focus();
    }
  }, [inputVisible]);

  const handleClose = (removedTag: string) => {
    const newTags = tags?.filter((tag) => tag !== removedTag);
    console.log(newTags);
    setTags(newTags);
    newTags !== undefined? handleAllTag(newTags) : null;
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const handleInputConfirm = () => {
    console.log(inputValue)
    if (inputValue && tags?.indexOf(inputValue) === -1) {
      setTags([...tags, inputValue]);
      handleOneTag(inputValue)
    }
    setInputVisible(false);
    setInputValue("");
  };

  const forMap = (tag: string) => {
    const tagElem = (
      <Tag
        closable
        onClose={(e) => {
          e.preventDefault();
          handleClose(tag);
        }}
      >
        {tag}
      </Tag>
    );
    return (
      <span key={tag} style={{ display: 'inline-block' }}>
        {tagElem}
      </span>
    );
  };

  var tagChild=tags?.map(forMap);
  useEffect(() => {
    setTags(newData.tags)
  }, [newData.tags])
  
   
  return (
    <>
      <div style={{ marginBottom: 16 }}>
          {tagChild}
      </div>
      {inputVisible && (
        <Input
          ref={inputRef}
          type="text"
          size="small"
          style={{ width: 78 }}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      )}
      {!inputVisible && (
        <Tag onClick={showInput} className="site-tag-plus">
          <PlusOutlined /> New Tag
        </Tag>
      )}
    </>
  );
};

export default Tags;
