import React from "react";
import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";
import { Plus } from "lucide-react";

const Column = ({ column, tasks, deleteTask, onOpenModal }) => {
  return (
    <div className="kanban-column">
      <div className="kanban-header">
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: column.color || "var(--accent)",
            }}
          ></div>
          <span>{column.title}</span>
          <span
            style={{
              background: "var(--bg-app)",
              padding: "2px 8px",
              borderRadius: "12px",
              fontSize: "12px",
              color: "var(--text-secondary)",
              marginLeft: "4px",
            }}
          >
            {tasks.length}
          </span>
        </div>
        <button
          onClick={onOpenModal}
          style={{
            background: "transparent",
            border: "none",
            color: "var(--text-tertiary)",
            cursor: "pointer",
          }}
          title="Add Task to this Column (currently adds to Backlog default)"
        >
          <Plus size={16} />
        </button>
      </div>

      <div className="kanban-body">
        <Droppable droppableId={column.id}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{
                minHeight: "100px",
                height: "100%",
                transition: "background-color 0.2s",
                backgroundColor: snapshot.isDraggingOver
                  ? "rgba(255, 255, 255, 0.02)"
                  : "transparent",
                borderRadius: "8px",
              }}
            >
              {tasks.map((task, index) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  index={index}
                  deleteTask={deleteTask}
                  onEditTask={onOpenModal}
                  columnId={column.id}
                />
              ))}
              {provided.placeholder}

              {tasks.length === 0 && !snapshot.isDraggingOver && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "32px 16px",
                    color: "var(--text-tertiary)",
                    textAlign: "center",
                    border: "1px dashed var(--border-light)",
                    borderRadius: "8px",
                    marginTop: "8px",
                  }}
                >
                  <div style={{ fontSize: "24px", marginBottom: "8px" }}>
                    📂
                  </div>
                  <span style={{ fontSize: "13px" }}>Kosong</span>
                </div>
              )}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
};

export default Column;
