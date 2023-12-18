import React, { useState, useEffect } from "react";
import { BiTrash } from "react-icons/bi";
import { GrView } from "react-icons/gr";
import { read, create, update, remove } from "../api/todo";
import ModalComponnet from "../components/Modal";
import Loader from "../components/Loader";
import AddNewModal from "../components/AddNewModal";
import Taskbox from "../components/Taskbox";
import { Checkbox } from "antd";
import "./style.css";

const TodoPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [data, setData] = useState([]);
  const [addNew, setAddNew] = useState(false);
  const [id, setID] = useState(null);
  const [loader, setLoader] = useState(false);
  const [modalKey, setModalKey] = useState(0);
  const [sort, setSort] = useState(false);
  const [filter, setFilter] = useState(false);
  const [selectedDateFilter, setSelectedDateFilter] = useState(false);
  const [selectedPriorityFilters, setSelectedPriorityFilters] = useState([
    false,
    false,
    false,
  ]);

  useEffect(() => {
    setLoader(true);
    get();
  }, []);

  const get = async () => {
    const temp = await read();
    setData(temp);
    setLoader(false);
  };

  const tempString = localStorage.getItem("user");
  const temp = JSON.parse(tempString);

  const toggleModal = () => {
    setModalOpen(false);
    setModalKey((prevKey) => prevKey + 1);
  };

  const handleView = (e) => {
    setID(e._id);
    setAddNew(false);
    setModalData(e);
    setModalOpen(true);
  };

  const handleDelete = async (e) => {
    setLoader(true);
    const res = await remove(e._id);
    get();
  };

  const handleAddNew = () => {
    setAddNew(true);
    setModalOpen(true);
  };

  const createTask = async (e) => {
    setLoader(true);
    const res = await create(e);
    get();
  };

  const updateTask = async (e) => {
    setLoader(true);
    await update(id, e);
    get();
  };

  const toggleFilter = () => {
    setFilter(!filter);
    setSort(false);
  };

  const toggleSort = () => {
    setSort(!sort);
    setFilter(false);
  };

  const handlePriorityCheckboxChange = (index, checked) => {
    setSelectedPriorityFilters((prevFilters) => {
      const updatedFilters = [...prevFilters];
      updatedFilters[index] = checked;
      return updatedFilters;
    });
  };

  const applyFilter = () => {
    alert("Filter feature is not yet implemented!")
  };

  function sortByTimestamp() {
    const sortedData = data.slice().sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    setData(sortedData);
    setSort(false);
  }
  
  function sortByPriority() {
    const priorities = { low: 2, medium: 1, high: 0 };
    const sortedData = data.slice().sort((a, b) => priorities[a.priority] - priorities[b.priority]);
    setData(sortedData);
    setSort(false);
  }

  return (
    <div className="w-full absolute top-[5rem] lg:px-16 px-4">
      {loader && (
        <div className="fixed inset-0 z-10">
          <Loader />
        </div>
      )}
      {modalOpen && !addNew && (
        <ModalComponnet
          key={modalKey}
          open={modalOpen}
          data={modalData}
          toggle={toggleModal}
          addNew={addNew}
          updatedData={addNew ? createTask : updateTask}
        />
      )}
      {modalOpen && addNew && (
        <AddNewModal
          open={modalOpen}
          toggle={toggleModal}
          addNew={addNew}
          updatedData={addNew ? createTask : updateTask}
        />
      )}
      <h1 className="w-full mb-5 text-2xl lg:text-4xl">
        <span className="text-gray-500 dark:text-gray-400">Welcome,</span>{" "}
        <span className="text-purple-500">{temp.name}! </span>
      </h1>
      {data && <Taskbox data={data} />}
      <div
        className="w-full mt-2 lg:mt-5 flex justify-between items-center bg-white p-1  rounded-lg shadow-lg text-black
       dark:text-white bg-opacity-40 backdrop-filter backdrop-blur-18 border border-opacity-20 border-none"
      >
        <div className="lg:text-xl text-lg pl-4 font-bold">Task Board</div>
        <div className="flex lg:gap-5 gap-1 items-center ">
          <div>
            <span className="cursor-pointer" onClick={() => toggleSort()}>
              Sort
            </span>
            {sort && (
              <div className="absolute mt-4 w-[10rem] h-[5rem] bg-black p-3 rounded-lg shadow-lg text-white
              backdrop-filter backdrop-blur-18 border border-opacity-20 border-none">
                <div className="opacity-80 hover:opacity-100 cursor-pointer" onClick={sortByTimestamp}>By Date</div>
                <div className="opacity-80 hover:opacity-100 cursor-pointer" onClick={sortByPriority}>By Priority</div>
              </div>
            )}
          </div>
          <div>|</div>
          <div className="cursor-pointer">
            <span className="mr-1" onClick={() => toggleFilter()}>
              Filter
            </span>
            {filter && (
              <div
                className="absolute mt-4 w-[10rem] h-[15rem] bg-black p-3 rounded-lg shadow-lg text-white
          backdrop-filter backdrop-blur-18 border border-opacity-20 border-none"
              >
                <div>
                  <div className="font-bold">By Date</div>
                  <div className="text-gray-300">
                    <Checkbox
                      className="text-gray-300"
                      onChange={(e) => setSelectedDateFilter(e.target.checked)}
                      checked={selectedDateFilter}
                    >
                      Today
                    </Checkbox>
                  </div>
                </div>
                <div>
                  <div className="font-bold">By Priority</div>
                  <div>
                    <Checkbox
                      className="text-gray-300"
                      onChange={(e) =>
                        handlePriorityCheckboxChange(0, e.target.checked)
                      }
                      checked={selectedPriorityFilters[0]}
                    >
                      Low
                    </Checkbox>
                    <Checkbox
                      className="text-gray-300"
                      onChange={(e) =>
                        handlePriorityCheckboxChange(1, e.target.checked)
                      }
                      checked={selectedPriorityFilters[1]}
                    >
                      Medium
                    </Checkbox>
                    <Checkbox
                      className="text-gray-300"
                      onChange={(e) =>
                        handlePriorityCheckboxChange(2, e.target.checked)
                      }
                      checked={selectedPriorityFilters[2]}
                    >
                      High
                    </Checkbox>
                  </div>
                </div>
                <button
                  onClick={applyFilter}
                  className="absolute bottom-2 p-2 text-black cursor-pointer bg-yellow-300 rounded-lg shadow-lg hover:translate-y-[-2px] transition-transform duration-300"
                >
                  Apply filter
                </button>
              </div>
            )}
          </div>
          <div
            onClick={() => handleAddNew()}
            className="p-2 cursor-pointer bg-purple-400 rounded-lg shadow-lg text-white hover:translate-y-[-2px] transition-transform duration-300"
          >
            Add Task +
          </div>
        </div>
      </div>
      <div
        className="mt-10 h-[16rem] lg:h-[20rem] text-sm lg:text-base bg-white p-2 lg:p-6 rounded-lg shadow-lg text-black
       dark:text-white bg-opacity-10 backdrop-filter backdrop-blur-18 border border-opacity-20 border-none"
      >
        <div
          style={{ gridTemplateColumns: "0.2fr 1fr 0.2fr 0.2fr 0.2fr" }}
          className="w-full gap-4 grid p-1 lg:p-2 font-bold grid-cols-0.2fr 1fr 0.2fr 0.2fr"
        >
          <div>Status</div>
          <div>Task</div>
          <div>Priority</div>
          <div className="flex justify-center items-center">View</div>
          <div className="flex justify-center items-center">Delete</div>
        </div>
        <div id="task-list" className="w-full h-[85%] overflow-auto">
          {data.length !==0 &&
            data.map((item) => {
              return (
                <div
                  key={item._id}
                  style={{ gridTemplateColumns: "0.2fr 1fr 0.2fr 0.2fr 0.2fr" }}
                  className="grid gap-4 w-full p-2 items-center"
                >
                  <div>
                    {/* Use a checkbox and apply the purple color when completed */}
                    <div style={{
                      background: `${item.completed ? "green": "red"}`
                    }}
                      className={`bg-${
                        item.completed ? "[rgb(0, 128, 0)]" : "red-500"
                      } flex h-4 w-4 rounded-xl justify-center items-center`}
                    >
                      {item.completed ? "" : ""}
                    </div>
                  </div>
                  <div className="whitespace-normal w-[80%] lg:w-full">{item.text}</div>

                  <div>{item.priority}</div>
                  <div className="flex justify-center items-center">
                    {/* Use an eye icon for the "View" action */}
                    <GrView
                      className="h-4 w-4 cursor-pointer"
                      onClick={() => handleView(item)}
                    />
                  </div>
                  <div className="flex justify-center items-center">
                    {/* Use a trash can icon for the "Delete" action */}
                    <BiTrash
                      className="h-4 w-4 cursor-pointer"
                      onClick={() => handleDelete(item)}
                    />
                  </div>
                </div>
              );
            })}

           {
            data.length === 0 && (
              <div className="h-full w-full flex justify-center items-center flex-col font-bold lg:text-2xl text-lg">
                  ADD TASKS TO VIEW!
              </div>
            )
           } 
        </div>
      </div>
    </div>
  );
};

export default TodoPage;
