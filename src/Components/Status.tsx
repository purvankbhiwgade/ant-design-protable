import React from "react";
import { Select } from "antd";

interface statusUpdate {
  onChange:
    | ((
        value: string,
        option:
          | {
              value: string;
              label: string;
            }
          | {
              value: string;
              label: string;
            }[]
      ) => void)
    | undefined;
  value?: string;
}

const Status = ({ onChange, value }: statusUpdate) => {
  return (
    <Select
      value={value}
      labelInValue={true}
      defaultValue={"open"}
      style={{ width: 120 }}
      onChange={onChange}
      options={[
        {
          value: "open",
          label: "OPEN",
        },
        {
          value: "working",
          label: "WORKING",
        },
        {
          value: "done",
          label: "DONE",
        },
        {
          value: "overdue",
          label: "OVERDUE",
        },
      ]}
    />
  );
};
export default Status;
