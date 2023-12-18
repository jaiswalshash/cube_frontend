import React, { useState, useEffect } from "react";
import { BiFilter, BiTrash } from "react-icons/bi";
import { GrView } from "react-icons/gr";
import { read, create, update, remove } from "../api/todo";
import ModalComponnet from "../components/Modal";
import Loader from "../components/Loader";
import AddNewModal from "../components/AddNewModal";
import Taskbox from "../components/Taskbox";
import "./style.css";

const TodoPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [data, setData] = useState(null);
  const [addNew, setAddNew] = useState(false);
  const [id, setID] = useState(null);
  const [loader, setLoader] = useState(false);
  const [modalKey, setModalKey] = useState(0);
  const [sort, setSort]  = useState(false);
  const [filter, setFilter]  = useState(false);
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
    console.log(res);
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
    console.log(res);
  };

  const updateTask = async (e) => {
    setLoader(true);
    await update(id, e);
    get();
  };

  const toggleFilter = () =>{
    setFilter(!filter);
    setSort(false);
  }

  const toggleSort = () => {
    setSort(!sort);
    setFilter(false);
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
      <h1 className="w-full mb-5 text-4xl">
        <span className="text-gray-500 dark:text-gray-400">Welcome,</span> <span className="text-purple-500">{temp.name}{" "}</span>
      </h1>
      {data && <Taskbox data={data} />}
      <div
        className="w-full mt-5 flex justify-between items-center bg-white p-2 rounded-lg shadow-lg text-black
       dark:text-white bg-opacity-40 backdrop-filter backdrop-blur-18 border border-opacity-20 border-none"
      >
        <div className="text-xl pl-4 font-bold">Task Board</div>
        <div className="flex gap-5 items-center ">
          <div >
            <span className="cursor-pointer" onClick={() => toggleSort()}>Sort</span> 
            {
              sort && (
                <div className="absolute bg-black text-white p-3 mt-4">
                    <div>By Date</div>
                    <div>By Priority</div>
                    
                </div>
              )
            }
          </div>
          <div>|</div>
          <div className="cursor-pointer" >
            
            <span className="mr-1" onClick={() => toggleFilter()}>Filter</span>
            {
              filter && (
                <div className="absolute mt-4 w-[10rem] h-[12rem]  bg-black p-3 rounded-lg shadow-lg text-white
               backdrop-filter backdrop-blur-18 border border-opacity-20 border-none">
                    <div>
                      <div>By Date</div>
                      <div>HElo</div>
                    </div>
                    <div>
                      <div>By Priority</div>
                      <div>HElo</div>
                    </div>
                    <button className="absolute bottom-2 p-2 text-black cursor-pointer bg-yellow-300 rounded-lg shadow-lg hover:translate-y-[-2px] transition-transform duration-300">Apply filter</button>
                </div>
              )
            }
            
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
        className="mt-5 h-[20rem] bg-white p-6 rounded-lg shadow-lg text-black
       dark:text-white bg-opacity-10 backdrop-filter backdrop-blur-18 border border-opacity-20 border-none"
      >
        <div
          style={{ gridTemplateColumns: "0.2fr 1fr 0.2fr 0.2fr 0.2fr" }}
          className="w-full grid p-2 font-bold grid-cols-0.2fr 1fr 0.2fr 0.2fr"
        >
          <div>Status</div>
          <div>Task</div>
          <div>Priority</div>
          <div className="flex justify-center items-center">View/Update</div>
          <div className="flex justify-center items-center">Delete</div>
        </div>
        <div id="task-list" className="w-full h-[85%] overflow-auto">
          {data &&
            data.map((item) => {
              return (
                <div
                  key={item._id}
                  style={{ gridTemplateColumns: "0.2fr 1fr 0.2fr 0.2fr 0.2fr" }}
                  className="grid w-full p-2"
                >
                  <div>
                    {/* Use a checkbox and apply the purple color when completed */}
                    <div className={`text-${item.completed ? "pink-300" : "red"} className="flex justify-center items-center"`}>
                      {item.completed ? "Completed" : "Pending"}
                    </div>
                  </div>
                  <div>{item.text}</div>
                  <div >{item.priority}</div>
                  <div
                      className="flex justify-center items-center"
                  >
                    {/* Use an eye icon for the "View" action */}
                    <GrView className="h-4 w-4 cursor-pointer"
                    onClick={() => handleView(item)} />
                  </div>
                  <div
                    className="flex justify-center items-center"
                  >
                    {/* Use a trash can icon for the "Delete" action */}
                    <BiTrash className="h-4 w-4 cursor-pointer"
                    onClick={() => handleDelete(item)} />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default TodoPage;
