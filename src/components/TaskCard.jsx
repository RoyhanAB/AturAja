import React from "react";
import { Draggable } from "@hello-pangea/dnd";
import { Clock, Trash2, Edit2 } from "lucide-react";

const TaskCard = ({ task, index, deleteTask, onEditTask, columnId }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`task-card ${snapshot.isDragging ? "is-dragging" : ""}`}
          style={{ ...provided.draggableProps.style }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "12px",
            }}
          >
            <div style={{ display: "flex", gap: "8px" }}>
              {task.priority && (
                <span
                  className="tag"
                  style={{
                    color: `var(--priority-${task.priority.toLowerCase()})`,
                    background: `var(--priority-${task.priority.toLowerCase()}-bg)`,
                  }}
                >
                  {task.priority === "High"
                    ? "Tinggi"
                    : task.priority === "Medium"
                      ? "Sedang"
                      : "Rendah"}
                </span>
              )}
              {task.tags?.map((tag) => (
                <span
                  key={tag}
                  className="tag"
                  style={{
                    background: "var(--bg-app)",
                    color: "var(--text-secondary)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <div style={{ display: "flex", gap: "4px" }}>
              <button
                onClick={() => onEditTask(task)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "var(--text-tertiary)",
                  cursor: "pointer",
                  padding: "4px",
                }}
                title="Edit tugas"
              >
                <Edit2 size={16} />
              </button>
              <button
                onClick={() => deleteTask(columnId, task.id)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "var(--priority-high)",
                  cursor: "pointer",
                  padding: "4px",
                }}
                title="Hapus tugas"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>

          <h4
            style={{
              margin: "0 0 8px 0",
              fontSize: "15px",
              fontWeight: "500",
              lineHeight: "1.4",
            }}
          >
            {task.content}
          </h4>

          {task.description && (
            <p
              style={{
                margin: "0 0 16px 0",
                fontSize: "13px",
                color: "var(--text-tertiary)",
                lineHeight: "1.5",
              }}
            >
              {task.description}
            </p>
          )}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTop: "1px dashed var(--border-light)",
              paddingTop: "12px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                color: "var(--text-tertiary)",
                fontSize: "12px",
                fontWeight: "500",
              }}
            >
              <Clock size={14} />
              <span>{task.dueDate || "Batas waktu tidak ada"}</span>
            </div>
            {/* Avatar dihapus agar lebih bersih dan fokus pada manajemen tugas pribadi */}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
