import React from "react";
import { LayoutDashboard, CheckSquare, Settings, PieChart } from "lucide-react";

const Sidebar = ({ activeTab, setActiveTab, stats }) => {
  return (
    <div className="sidebar">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "0 14px",
          marginBottom: "40px",
          marginTop: "10px",
        }}
      >
        <img
          src="/img/AturAjaLogo.png"
          alt="AyoAtur Logo"
          style={{ width: "40px", height: "40px", objectFit: "contain" }}
        />
        <span
          style={{
            fontSize: "20px",
            fontWeight: "700",
            letterSpacing: "-0.5px",
          }}
        >
          AyoAtur
        </span>
      </div>

      <div
        style={{
          fontSize: "12px",
          color: "var(--text-tertiary)",
          fontWeight: "600",
          textTransform: "uppercase",
          letterSpacing: "1px",
          marginBottom: "12px",
          paddingLeft: "14px",
        }}
      >
        Menu Utama
      </div>

      <div
        className={`nav-item ${activeTab === "dashboard" ? "active" : ""}`}
        onClick={() => setActiveTab("dashboard")}
      >
        <LayoutDashboard size={18} />
        <span>Beranda</span>
      </div>
      <div
        className={`nav-item ${activeTab === "kanban" ? "active" : ""}`}
        onClick={() => setActiveTab("kanban")}
      >
        <CheckSquare size={18} />
        <span>Papan Kanban</span>
        {stats && stats.totalTasks > 0 && (
          <span
            style={{
              marginLeft: "auto",
              background: "var(--accent)",
              color: "white",
              padding: "2px 8px",
              borderRadius: "10px",
              fontSize: "11px",
              fontWeight: "600",
            }}
          >
            {stats.totalTasks}
          </span>
        )}
      </div>
      <div
        className={`nav-item ${activeTab === "analytics" ? "active" : ""}`}
        onClick={() => setActiveTab("analytics")}
      >
        <PieChart size={18} />
        <span>Analitik</span>
      </div>

      {stats && stats.overdueTasks > 0 && (
        <div
          style={{
            margin: "16px 14px",
            padding: "12px",
            background: "var(--priority-high-bg)",
            border: "1px solid var(--priority-high)",
            borderRadius: "8px",
          }}
        >
          <div
            style={{
              fontSize: "11px",
              color: "var(--priority-high)",
              fontWeight: "600",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              marginBottom: "6px",
            }}
          >
            ⚠️ Perhatian
          </div>
          <div style={{ fontSize: "13px", color: "var(--text-primary)" }}>
            {stats.overdueTasks} tugas terlambat
          </div>
        </div>
      )}

      <div style={{ marginTop: "auto" }}>
        <div
          className={`nav-item ${activeTab === "settings" ? "active" : ""}`}
          onClick={() => setActiveTab("settings")}
        >
          <Settings size={18} />
          <span>Pengaturan</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
