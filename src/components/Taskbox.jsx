import React from "react";

function Taskbox({ data }) {
  // Assuming you have an array of tasks and want to display the total count
  console.log(data);
  const totalTasks = data.length;

  // Calculate the completed task count
  const completedTasks = data.filter(task => task.completed).length;

  // Calculate the completion percentage
  const completionPercentage = (completedTasks / totalTasks) * 100;

  return (
    <div
      className="block lg:w-[25%] w-full h-[8rem] mb-16 lg:mb-0 bg-white p-6 rounded-lg shadow-lg text-black
   dark:text-white bg-opacity-40 backdrop-filter backdrop-blur-18 border border-opacity-20 border-none relative"
    >
      <div className="flex items-center justify-between">
        <div>
          Total Tasks: {totalTasks}
        </div>
        <div>
          Completed: {completedTasks}
        </div>
      </div>

      <div className="h-2 bg-gray-300 mt-2 rounded-full">
        <div
          style={{ width: `${completionPercentage}%` }}
          className="h-full bg-purple-400 rounded-full"
        ></div>
      </div>
    </div>
  );
}

export default Taskbox;
