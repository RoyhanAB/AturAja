import React from "react";
import { LayoutDashboard, CheckSquare, Settings, PieChart } from "lucide-react";

const Sidebar = ({ activeTab, setActiveTab }) => {
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
      </div>
      <div
        className={`nav-item ${activeTab === "analytics" ? "active" : ""}`}
        onClick={() => setActiveTab("analytics")}
      >
        <PieChart size={18} />
        <span>Analitik</span>
      </div>

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
