import React from "react";
import { User, Shield, CreditCard, LogOut } from "lucide-react";

const Settings = ({ userEmail, onLogout }) => {
  const initial = userEmail ? userEmail.charAt(0).toUpperCase() : "?";

  return (
    <div
      style={{
        padding: "32px",
        overflowY: "auto",
        height: "100%",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <h2 style={{ fontSize: "24px", fontWeight: "600", marginBottom: "32px" }}>
        Pengaturan Akun
      </h2>

      <div
        className="glass-panel"
        style={{ padding: "32px", marginBottom: "24px" }}
      >
        <h3
          style={{
            fontSize: "18px",
            marginBottom: "24px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <User size={20} color="var(--accent)" /> Informasi Profil
        </h3>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "var(--accent)",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "600",
              fontSize: "32px",
              border: "3px solid var(--bg-app)",
            }}
          >
            {initial}
          </div>
          <div>
            <p
              style={{
                fontSize: "13px",
                color: "var(--text-secondary)",
                marginBottom: "4px",
              }}
            >
              Alamat Email
            </p>
            <p style={{ fontSize: "16px", fontWeight: "500" }}>{userEmail}</p>
          </div>
          <button
            className="btn-primary"
            style={{
              marginLeft: "auto",
              background: "var(--bg-card)",
              color: "var(--text-primary)",
              border: "1px solid var(--border-light)",
            }}
          >
            Ubah Kata Sandi
          </button>
        </div>
      </div>

      <div
        className="glass-panel"
        style={{ padding: "32px", marginBottom: "24px" }}
      >
        <h3
          style={{
            fontSize: "18px",
            marginBottom: "24px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <CreditCard size={20} color="var(--priority-medium)" /> Paket
          Langganan
        </h3>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px",
            background: "var(--bg-app)",
            borderRadius: "8px",
            border: "1px solid var(--accent)",
          }}
        >
          <div>
            <h4
              style={{
                fontSize: "16px",
                color: "var(--accent)",
                marginBottom: "4px",
              }}
            >
              Pro Workspace
            </h4>
            <p style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
              Akses papan dan anggota tim tidak terbatas.
            </p>
          </div>
          <span
            style={{
              padding: "6px 12px",
              background: "var(--accent)",
              color: "white",
              borderRadius: "16px",
              fontSize: "12px",
              fontWeight: "600",
            }}
          >
            Aktif
          </span>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: "32px" }}>
        <h3
          style={{
            fontSize: "18px",
            marginBottom: "24px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "var(--priority-high)",
          }}
        >
          <Shield size={20} /> Zona Berbahaya
        </h3>
        <p
          style={{
            fontSize: "14px",
            color: "var(--text-secondary)",
            marginBottom: "20px",
          }}
        >
          Keluar akan mengakhiri sesi Anda saat ini. Anda harus masuk kembali
          untuk mengakses papan Anda.
        </p>
        <button
          onClick={onLogout}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 24px",
            background: "var(--priority-high-bg)",
            color: "var(--priority-high)",
            border: "1px solid var(--priority-high)",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "500",
          }}
        >
          <LogOut size={18} /> Keluar dengan Aman
        </button>
      </div>
    </div>
  );
};

export default Settings;
