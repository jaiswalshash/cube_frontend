import React, { useState } from "react";
import { Modal, Input, Radio } from "antd";
import "./modal.css";

function AddNewModal({ open, toggle, addNew, updatedData }) {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [task, setTask] = useState(null);
  const [description, setDescription] = useState(null);
  const [priority, setPriority] = useState("medium"); // default priority is set to "low"
  const handleOk = () => {
    // Perform any action you need with the task, description, and priority
    console.log("Task:", task);
    console.log("Description:", description);
    console.log("Priority:", priority);
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
          <label>Task:</label>
          <Input value={task} onChange={(e) => setTask(e.target.value)} />
        </div>
        <div style={{ marginTop: "1rem" }}>
          <label>Description:</label>
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
