import React from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import Column from "./Column";

const Board = ({
  data,
  handleDragEnd,
  handleDeleteTask,
  searchQuery,
  filters,
  onOpenModal,
  onEditTask,
}) => {
  const applyFiltersAndSort = (tasks) => {
    let filtered = [...tasks];

    // Apply priority filter
    if (filters.priorities.length > 0) {
      filtered = filtered.filter((task) =>
        filters.priorities.includes(task.priority)
      );
    }

    // Apply tags filter
    if (filters.tags.length > 0) {
      filtered = filtered.filter((task) =>
        task.tags?.some((tag) => filters.tags.includes(tag))
      );
    }

    // Apply overdue filter
    if (filters.showOverdue) {
      filtered = filtered.filter((task) => {
        if (!task.due_date) return false;
        return new Date(task.due_date) < new Date();
      });
    }

    // Apply sorting
    switch (filters.sortBy) {
      case "priority":
        const priorityOrder = { High: 1, Medium: 2, Low: 3 };
        filtered.sort(
          (a, b) =>
            (priorityOrder[a.priority] || 4) - (priorityOrder[b.priority] || 4)
        );
        break;
      case "dueDate":
        filtered.sort((a, b) => {
          if (!a.due_date) return 1;
          if (!b.due_date) return -1;
          return new Date(a.due_date) - new Date(b.due_date);
        });
        break;
      case "created":
        filtered.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        break;
      default:
        // Keep original position order
        break;
    }

    return filtered;
  };

  return (
    <div className="board-container">
      <DragDropContext onDragEnd={handleDragEnd}>
        {data.columnOrder.map((columnId) => {
          const column = data.columns[columnId];

          // Filter tasks based on searchQuery
          let tasks = column.taskIds
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

          // Apply filters and sorting
          tasks = applyFiltersAndSort(tasks);

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
