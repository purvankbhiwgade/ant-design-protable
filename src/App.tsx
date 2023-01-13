import {
  EllipsisOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import "./styles.css";
import {
  createIntl,
  ProTable,
  recordKeyToString,
  TableDropdown,
} from "@ant-design/pro-components";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import {
  Button,
  Dropdown,
  Space,
  Tag,
  Popover,
  Table,
  Modal,
  Input,
  Form,
  Radio,
  Select,
} from "antd";
import NoteState from "./context/NoteState";
import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "./context/NoteContext";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { noteContextType, schema } from "./@types/antd-table";
import AddForm from "./Components/AddForm";
import EditForm from "./Components/EditForm";
import { ConfigProvider } from "antd";
import enUS from "antd/locale/en_US";
// type GithubIssueItem = {
//   id: string;
//   title: string;
//   description: string;
//   dueDate: string;
//   timestamp: string;
//   tags: string[];
//   status: string;
// };
// ******************** The search Form ****************

// The two "white" and "blue" buttons in the top-right corner
// of the screen are for "reset" and "inquire"

// The "reset" button resets the search form
// the "inquire" buttons searches the search form

// You can choose which value is allowed to be search by setting
// the "search" value for the particular column as "true"

// If you don't want to allow the user to search through a
// particular value of columns, you can put "search: false"
// in the columns for the corresponding column

// ************************ End of the search form *************
// gagaga
// ************* Start of the table *******************

// This defines the type of columns the function have and
// how the value inside those columns are rendered

const data = [];

export default function App() {
  // don't understand the functionality of useForm hook yet

  // Building the form to add new values

  const [isEditing, setIsEditing] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [data, setData] = useState([]);

  const { table, getData, deleteData } = React.useContext(
    noteContext
  ) as noteContextType;
    
  const [searchText, setSearchText] = useState<String>('');
  const [searchedColumn, setSearchedColumn] = useState<String>('');

  const handleSearch = (selectedKeys:React.Key[], confirm:(param?:any|undefined) => void, dataIndex:string) => {
    confirm();
    // setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters:(() => void) | undefined) => {
    clearFilters !== undefined? clearFilters(): null;
    setSearchText('');
  };
  // const {
  //   table,
  //   getData,
  //   deleteData,
  //   // filterState: { searchQuery },
  //   // filterDispatch
  // } = context || {};

  // const transformProducts = () => {
  //   let sortedProducts = table;

  //   if (searchQuery) {
  //     sortedProducts = sortedProducts.filter((product) =>
  //       product.name.toLowerCase().includes(searchQuery)
  //     );
  //   }

  //   return sortedProducts;
  // };

  const columns: ProColumns<schema>[] = [
    {
      // Notice the keyword "dataIndex", it helps find out the
      // columns and their corresponding value in the objects of the
      // "data" array
      dataIndex: "index",
      valueType: "indexBorder",
      width: 48,
    },
    {
      title: "Title",
      dataIndex: "title",
      ellipsis: true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: "This is required",
          },
        ],
      },
      sorter: (record1, record2) => {
        if (record1.title && record2.title) {
          if (record1.title > record2.title) {
            return 1;
          }
        }
        return -1;
      },
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input.Search
            placeholder={`Search Title`}
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onSearch={() => {const dataIndex = 'title';
            handleSearch(selectedKeys, confirm, dataIndex)}}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Button
            type="primary"
            onClick={() => {const dataIndex = 'title';
            handleSearch(selectedKeys, confirm, dataIndex)}}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </div>
      ),
      filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
      onFilter: (value, record) =>
        {
          let a = record.title?.toLowerCase().includes(value.toString().toLowerCase())
          return a===undefined? false: a
        },
      // onFilterDropdownVisibleChange: visible => {
      //   if (visible) {
      //     setTimeout(() => searchInput.select());
      //   }
      // },
      // render: text =>
      //   searchedColumn === 'title' ? (
      //     <Highlight match={searchText}>{text}</Highlight>
      //   ) : (
      //     text
      //   ),
    },
    {
      title: "Description",
      dataIndex: "description",
      ellipsis: true,
      sorter: (record1, record2) => {
        if (record1.description && record2.description) {
          if (record1.description > record2.description) {
            return 1;
          }
        }
        return -1;
      },
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input.Search
            placeholder={`Search Description`}
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onSearch={() => {const dataIndex = 'description';
            handleSearch(selectedKeys, confirm, dataIndex)}}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
          <Button
            type="primary"
            onClick={() => {const dataIndex = 'description';
            handleSearch(selectedKeys, confirm, dataIndex)}}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90, marginRight: 8 }}
            >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </div>
      ),
      filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
      onFilter: (value, record) =>
      {
        let a = record.description?.toLowerCase().includes(value.toString().toLowerCase())
        return a===undefined? false: a
      },
    },
    {
      title: "Timestamp",
      dataIndex: "timestamp",
      sorter: (record1, record2) => {
        if (record1.timestamp && record2.timestamp) {
          if (record1.timestamp > record2.timestamp) {
            return 1;
          }
        }
        return -1;
      },
      render: (_, { timestamp }) => <p>{timestamp}</p>,
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input.Search
            placeholder={`Search timestamp`}
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onSearch={() => {const dataIndex = 'timestamp';
            handleSearch(selectedKeys, confirm, dataIndex)}}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
          <Button
            type="primary"
            onClick={() => {const dataIndex = 'timestamp';
            handleSearch(selectedKeys, confirm, dataIndex)}}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90, marginRight: 8 }}
            >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </div>
      ),
      filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
      onFilter: (value, record) =>
      {
        // if(record.timestamp)
        let a = record.timestamp?.toString().includes(value.toString().toLowerCase())
        return a===undefined? false: a
      },
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      sorter: (record1, record2) => {
        if (record1.dueDate && record2.dueDate) {
          if (record1.dueDate > record2.dueDate) {
            return 1;
          }
        }
        return -1;
      },
      search: false,
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input.Search
            placeholder={`Search due date`}
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onSearch={() => {const dataIndex = 'dueDate';
            handleSearch(selectedKeys, confirm, dataIndex)}}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
          <Button
            type="primary"
            onClick={() => {const dataIndex = 'dueDate';
            handleSearch(selectedKeys, confirm, dataIndex)}}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90, marginRight: 8 }}
            >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </div>
      ),
      filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
      onFilter: (value, record) =>
      {
        let a = record.dueDate?.toString().includes(value.toString().toLowerCase())
        return a===undefined? false: a
      },
    },
    {
      title: "Tag",
      dataIndex: "tags",
      search: false,
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
          <Input
            autoFocus
            placeholder="Type text here"
            value={selectedKeys[0]}
            onChange={(e) => {
              setSelectedKeys(e.target.value ? [e.target.value] : []);
            }}
            onPressEnter={() => {
              confirm();
            }}
            onBlur={() => {
              confirm();
            }}
          ></Input>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.tags?.find((val) => val === value) !== undefined;
      },

      // render method is used to manage the rendering of the values
      // in the columns
      render: (_, { id, tags }) => (
        <>
          {tags?.map((tag) => {
            // console.log(id);
            let color = tag.length > 5 ? "geekblue" : "green";
            let tagName = tag.length > 8 ? tag.slice(0, 8) : tag;
            if (tagName === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tagName}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      search: false,
      filters: [
        { text: "OPEN", value: "open" },
        { text: "WORKING", value: "working" },
        { text: "COMPLETE", value: "complete" },
        { text: "OVERDUE", value: "overdue" },
      ],
      onFilter: (value, record) => {
        console.log(value, record);
        return record.status === value;
      },
    },
    {
      title: "Edit",
      dataIndex: "Edit",
      search: false,
      render: (record, { id }) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                // onEditStudent(record);
              }}
            />
          </>
        );
      },
    },
    {
      title: "Delete",
      dataIndex: "Delete",
      search: false,
      render: (_, { id }) => (
        <>
          <svg
            onClick={() => {
              deleteData(id);
            }}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-trash mx-2"
            viewBox="0 0 16 16"
          >
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
            <path
              fillRule="evenodd"
              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
            />
          </svg>
        </>
      ),
    },
  ];

  useEffect(() => {
    getData();
  }, [table]);

  // const onEditStudent = (record) => {
  //   setIsEditing(true);
  //   setEditingStudent({ ...record });
  // };
  // const resetEditing = () => {
  //   setIsEditing(false);
  //   setEditingStudent(null);
  // };

  const [isAddFormOpen, setIsAddFormOpen] = useState(false);

  const showAddForm = () => {
    setIsAddFormOpen(true);
  };

  // const handleAddFormOk = () => {
  //   setIsAddFormOpen(false);
  // };

  const handleAddForm = () => {
    setIsAddFormOpen(false);
  };

  return (
    <ConfigProvider locale={enUS}>
      {
        // All the values are passed as props to ProTable component
        // Protable has a built-in search bar, add new data button and the table
      }

      <ProTable
        // dataSource is the way to provide the data to the table
        dataSource={table}
        // columns define the columns and how the value is rendered
        columns={columns}
        // don't know what it does OR forgot
        editable={{
          type: "multiple",
        }}
        pagination={{
          pageSize: 5,
        }}
        // ************ Settings Section of the Table ***********
        // includes the button to "Add a new value", "refresh the tab",
        //  "increase the page size", "go to the setting"
        headerTitle="advanced form"
        // options={{
        //   search: true,
        //   onSearch: (value:string) => 
        // }}
        search={false}
        // search={{
        //   defaultCollapsed: false,
        //   optionRender: (searchConfig, formProps, dom) => [
        //     ...dom.reverse(),
        //     <Button
        //       key="out"
        //       onClick={() => {
        //         const values = searchConfig?.form?.getFieldsValue();
        //         console.log(values);
        //       }}
        //     >
        //       导出
        //     </Button>,
        //   ],
        // }}
        rowKey="key"
        toolbar={{
          actions: [
            // <Popover content={<AddForm />} title="Title" trigger="click">
            //   <Button key="button" icon={<PlusOutlined />} type="primary">
            //     new
            //   </Button>
            // </Popover>,
            <>
              <Button
                key="button"
                icon={<PlusOutlined />}
                type="primary"
                onClick={showAddForm}
              >
                new
              </Button>
              <Modal
                open={isAddFormOpen}
                // onOk={handleAddFormOk}
                onCancel={handleAddForm}
                footer = {null}
              >
                <AddForm handleAddForm={handleAddForm}/>
              </Modal>
            </>,
          ],
        }}
      />
    </ConfigProvider>
  );
}
