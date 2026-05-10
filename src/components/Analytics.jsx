import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

const Analytics = ({ data }) => {
  const statusData = data.columnOrder
    .map((columnId) => {
      const column = data.columns[columnId];
      return {
        name: column.title,
        value: column.taskIds.length,
        color: column.color,
      };
    })
    .filter((item) => item.value > 0);

  const priorityCount = { High: 0, Medium: 0, Low: 0 };
  Object.values(data.tasks).forEach((task) => {
    if (task.priority) {
      priorityCount[task.priority] = (priorityCount[task.priority] || 0) + 1;
    }
  });

  const priorityData = [
    { name: "Tinggi", count: priorityCount.High, fill: "#f87171" },
    { name: "Sedang", count: priorityCount.Medium, fill: "#fbbf24" },
    { name: "Rendah", count: priorityCount.Low, fill: "#34d399" },
  ];

  return (
    <div style={{ padding: "32px", overflowY: "auto", height: "100%" }}>
      <h2 style={{ marginBottom: "8px", fontSize: "24px" }}>
        Ringkasan Analitik
      </h2>
      <p style={{ color: "var(--text-tertiary)", marginBottom: "32px" }}>
        Wawasan real-time dari papan Kanban Anda.
      </p>

      <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
        <div
          className="glass-panel"
          style={{
            flex: "1 1 400px",
            padding: "24px",
            height: "400px",
            background: "var(--bg-panel)",
            border: "1px solid var(--border-light)",
            borderRadius: "12px",
          }}
        >
          <h3
            style={{
              marginBottom: "24px",
              fontSize: "16px",
              fontWeight: "600",
            }}
          >
            Tugas berdasarkan Status
          </h3>
          {statusData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-light)",
                    borderRadius: "8px",
                    color: "var(--text-primary)",
                  }}
                  itemStyle={{ color: "var(--text-primary)" }}
                />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p
              style={{
                color: "var(--text-tertiary)",
                textAlign: "center",
                marginTop: "100px",
              }}
            >
              Tidak ada tugas ditemukan.
            </p>
          )}
        </div>

        <div
          className="glass-panel"
          style={{
            flex: "1 1 400px",
            padding: "24px",
            height: "400px",
            background: "var(--bg-panel)",
            border: "1px solid var(--border-light)",
            borderRadius: "12px",
          }}
        >
          <h3
            style={{
              marginBottom: "24px",
              fontSize: "16px",
              fontWeight: "600",
            }}
          >
            Tugas berdasarkan Prioritas
          </h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={priorityData}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--border-light)"
                vertical={false}
              />
              <XAxis
                dataKey="name"
                stroke="var(--text-secondary)"
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="var(--text-secondary)"
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
              />
              <Tooltip
                cursor={{ fill: "rgba(255, 255, 255, 0.05)" }}
                contentStyle={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-light)",
                  borderRadius: "8px",
                  color: "var(--text-primary)",
                }}
              />
              <Bar dataKey="count" radius={[4, 4, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
