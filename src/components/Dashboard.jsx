import React from "react";
import { CheckCircle2, ListTodo, AlertCircle, Clock } from "lucide-react";

const Dashboard = ({ data, userEmail }) => {
  const allTasks = Object.values(data.tasks);
  const totalTasks = allTasks.length;
  const doneTasks = data.columns["column-4"].taskIds.length;
  const highPriority = allTasks.filter((t) => t.priority === "High").length;
  
  // Calculate overdue tasks
  const overdueTasks = allTasks.filter((task) => {
    if (!task.due_date) return false;
    return new Date(task.due_date) < new Date() && task.column_id !== "column-4";
  }).length;

  const recentTasks = allTasks
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 5);

  return (
    <div style={{ padding: "32px", overflowY: "auto", height: "100%" }}>
      <div style={{ marginBottom: "32px" }}>
        <h2
          style={{ fontSize: "28px", fontWeight: "600", marginBottom: "8px" }}
        >
          Selamat datang kembali!
        </h2>
        <p style={{ color: "var(--text-secondary)" }}>
          Berikut adalah ringkasan pekerjaan Anda hari ini,{" "}
          <span style={{ color: "var(--text-primary)" }}>{userEmail}</span>.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "24px",
          marginBottom: "40px",
        }}
      >
        <div
          className="glass-panel"
          style={{
            padding: "24px",
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "rgba(99, 102, 241, 0.1)",
              color: "var(--accent)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ListTodo size={24} />
          </div>
          <div>
            <p
              style={{
                fontSize: "13px",
                color: "var(--text-secondary)",
                marginBottom: "4px",
              }}
            >
              Total Tugas
            </p>
            <h3 style={{ fontSize: "24px" }}>{totalTasks}</h3>
          </div>
        </div>

        <div
          className="glass-panel"
          style={{
            padding: "24px",
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "var(--priority-low-bg)",
              color: "var(--priority-low)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CheckCircle2 size={24} />
          </div>
          <div>
            <p
              style={{
                fontSize: "13px",
                color: "var(--text-secondary)",
                marginBottom: "4px",
              }}
            >
              Tugas Selesai
            </p>
            <h3 style={{ fontSize: "24px" }}>{doneTasks}</h3>
          </div>
        </div>

        <div
          className="glass-panel"
          style={{
            padding: "24px",
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "var(--priority-high-bg)",
              color: "var(--priority-high)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AlertCircle size={24} />
          </div>
          <div>
            <p
              style={{
                fontSize: "13px",
                color: "var(--text-secondary)",
                marginBottom: "4px",
              }}
            >
              Prioritas Tinggi
            </p>
            <h3 style={{ fontSize: "24px" }}>{highPriority}</h3>
          </div>
        </div>

        <div
          className="glass-panel"
          style={{
            padding: "24px",
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: overdueTasks > 0 ? "var(--priority-high-bg)" : "var(--priority-low-bg)",
              color: overdueTasks > 0 ? "var(--priority-high)" : "var(--priority-low)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Clock size={24} />
          </div>
          <div>
            <p
              style={{
                fontSize: "13px",
                color: "var(--text-secondary)",
                marginBottom: "4px",
              }}
            >
              Tugas Terlambat
            </p>
            <h3 style={{ fontSize: "24px" }}>{overdueTasks}</h3>
          </div>
        </div>
      </div>

      <div>
        <h3 style={{ fontSize: "18px", marginBottom: "20px" }}>
          Aktivitas Terakhir
        </h3>
        <div className="glass-panel" style={{ padding: "0" }}>
          {recentTasks.length > 0 ? (
            recentTasks.map((task, i) => (
              <div
                key={task.id}
                style={{
                  padding: "16px 24px",
                  borderBottom:
                    i !== recentTasks.length - 1
                      ? "1px solid var(--border-light)"
                      : "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "16px" }}
                >
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      background: "var(--bg-app)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--text-tertiary)",
                    }}
                  >
                    <Clock size={16} />
                  </div>
                  <div>
                    <p
                      style={{
                        fontWeight: "500",
                        fontSize: "14px",
                        marginBottom: "4px",
                      }}
                    >
                      {task.content}
                    </p>
                    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                      <p
                        style={{
                          fontSize: "12px",
                          color: "var(--text-secondary)",
                        }}
                      >
                        {data.columns[task.column_id]?.title || "Unknown"}
                      </p>
                      {task.due_date && (
                        <>
                          <span style={{ color: "var(--text-tertiary)" }}>•</span>
                          <p
                            style={{
                              fontSize: "12px",
                              color: new Date(task.due_date) < new Date() && task.column_id !== "column-4"
                                ? "var(--priority-high)"
                                : "var(--text-secondary)",
                            }}
                          >
                            {new Date(task.due_date).toLocaleDateString("id-ID", {
                              day: "numeric",
                              month: "short",
                            })}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                {task.priority && (
                  <span
                    className="tag"
                    style={{
                      color: `var(--priority-${task.priority.toLowerCase()})`,
                      background: `var(--priority-${task.priority.toLowerCase()}-bg)`,
                    }}
                  >
                    {task.priority}
                  </span>
                )}
              </div>
            ))
          ) : (
            <div
              style={{
                padding: "32px",
                textAlign: "center",
                color: "var(--text-tertiary)",
              }}
            >
              Belum ada aktivitas. Silakan buat tugas baru.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
