import React from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import Column from "./Column";

const Board = ({
  data,
  handleDragEnd,
  handleDeleteTask,
  searchQuery,
  onOpenModal,
  onEditTask,
}) => {
  return (
    <div className="board-container">
      <DragDropContext onDragEnd={handleDragEnd}>
        {data.columnOrder.map((columnId) => {
          const column = data.columns[columnId];

          // Filter tasks based on searchQuery
          const tasks = column.taskIds
            .map((taskId) => data.tasks[taskId])
            .filter((task) => {
              if (!task) return false;
              if (!searchQuery) return true;
              const lowerQuery = searchQuery.toLowerCase();
              return (
                task.content.toLowerCase().includes(lowerQuery) ||
                (task.description &&
                  task.description.toLowerCase().includes(lowerQuery)) ||
                (task.tags &&
                  task.tags.some((tag) =>
                    tag.toLowerCase().includes(lowerQuery),
                  ))
              );
            });

          return (
            <Column
              key={column.id}
              column={column}
              tasks={tasks}
              deleteTask={handleDeleteTask}
              onOpenModal={onEditTask}
            />
          );
        })}
      </DragDropContext>
    </div>
  );
};

export default Board;
