import React, { useState } from "react";
import { Modal, Input, Radio } from "antd";
import "./modal.css";

function AddNewModal({ open, toggle, addNew, updatedData }) {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [task, setTask] = useState('');
  const [description, setDescription] = useState(null);
  const [priority, setPriority] = useState("medium"); // default priority is set to "low"
  const limit = 30;
  const handleOk = () => {
    
    if (!task) {
      // You can handle the case where the task is not provided, e.g., show an error message
      alert("Task is mandatory. Please provide a task.");
      return;
    }
    
    const newData = {
      text:task, description, priority
    }
    
    updatedData(newData);

    setConfirmLoading(true);
    toggle();
    setConfirmLoading(false);
    setTask(null);
    setDescription(null);
    setPriority("medium");
  };

  const handleCancel = () => {
    setTask(null);
    setDescription(null);
    setPriority("medium");
    toggle();
    console.log("Clicked cancel button");
  };

  return (
    <div>
      <Modal
        title={addNew ? "Add Task" : "Update Task"}
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <div>
        <label>Task:({task.length}/{limit})</label>
          <Input value={task} onChange={(e) => setTask(e.target.value)} maxLength={limit} />
        </div>
        <div style={{ marginTop: "1rem" }}>
        <label>Description:<span className="opacity-50">(Optional)</span></label>
          <Input.TextArea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 mt-4">
          <label>Priority:</label>
          <Radio.Group
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <Radio value="low">Low</Radio>
            <Radio value="medium">Medium</Radio>
            <Radio value="high">High</Radio>
          </Radio.Group>
        </div>
      </Modal>
    </div>
  );
}

export default AddNewModal;
