import React from "react";
import { Search, Bell, Plus, User } from "lucide-react";

const Topbar = ({
  searchQuery,
  setSearchQuery,
  onOpenModal,
  userEmail,
  setActiveTab,
  searchInputRef,
}) => {
  const initial = userEmail ? userEmail.charAt(0).toUpperCase() : "?";

  return (
    <div className="topbar">
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div>
          <h2 style={{ fontSize: "20px", fontWeight: "600" }}>Proyek Utama</h2>
          <span style={{ fontSize: "13px", color: "var(--text-tertiary)" }}>
            Aktivitas terbaru
          </span>
        </div>

        <button
          className="btn-primary"
          onClick={onOpenModal}
          style={{ marginLeft: "16px", padding: "6px 12px", fontSize: "13px" }}
        >
          <Plus size={16} /> Tugas Baru
        </button>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
        <div style={{ position: "relative" }}>
          <Search
            size={16}
            style={{
              position: "absolute",
              left: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--text-tertiary)",
            }}
          />
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Cari tugas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-light)",
              borderRadius: "20px",
              padding: "8px 16px 8px 36px",
              color: "var(--text-primary)",
              fontSize: "13px",
              outline: "none",
              width: "240px",
            }}
          />
        </div>

        <div
          style={{
            position: "relative",
            cursor: "pointer",
            color: "var(--text-secondary)",
          }}
        >
          <Bell size={20} />
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "8px",
              height: "8px",
              background: "var(--priority-high)",
              borderRadius: "50%",
              border: "2px solid var(--bg-app)",
            }}
          ></div>
        </div>

        <div
          onClick={() => setActiveTab("settings")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            paddingLeft: "12px",
            borderLeft: "1px solid var(--border-light)",
            cursor: "pointer",
          }}
          title="Pengaturan Profil"
        >
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: "var(--accent)",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "600",
              fontSize: "14px",
              border: "2px solid var(--bg-card)",
            }}
          >
            {initial}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
