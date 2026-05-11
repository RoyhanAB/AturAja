import React, { useEffect } from "react";
import { Keyboard, X } from "lucide-react";

const KeyboardShortcuts = ({ onNewTask, setActiveTab, setSearchFocus }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  useEffect(() => {
    const handleKeyPress = (e) => {
      // Ignore if user is typing in input/textarea
      if (
        e.target.tagName === "INPUT" ||
        e.target.tagName === "TEXTAREA" ||
        e.target.isContentEditable
      ) {
        return;
      }

      // Ctrl/Cmd + K = New Task
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        onNewTask();
      }

      // Ctrl/Cmd + / = Show shortcuts
      if ((e.ctrlKey || e.metaKey) && e.key === "/") {
        e.preventDefault();
        setIsOpen(true);
      }

      // Ctrl/Cmd + F = Focus search
      if ((e.ctrlKey || e.metaKey) && e.key === "f") {
        e.preventDefault();
        setSearchFocus();
      }

      // Number keys for navigation (1-4)
      if (e.key >= "1" && e.key <= "4" && !e.ctrlKey && !e.metaKey) {
        const tabs = ["dashboard", "kanban", "analytics", "settings"];
        setActiveTab(tabs[parseInt(e.key) - 1]);
      }

      // Escape to close modals
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [onNewTask, setActiveTab, setSearchFocus]);

  const shortcuts = [
    { keys: ["Ctrl", "K"], description: "Buat tugas baru" },
    { keys: ["Ctrl", "F"], description: "Fokus ke pencarian" },
    { keys: ["Ctrl", "/"], description: "Tampilkan shortcut" },
    { keys: ["1"], description: "Buka Beranda" },
    { keys: ["2"], description: "Buka Papan Kanban" },
    { keys: ["3"], description: "Buka Analitik" },
    { keys: ["4"], description: "Buka Pengaturan" },
    { keys: ["Esc"], description: "Tutup modal" },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        style={{
          background: "transparent",
          border: "none",
          color: "var(--text-tertiary)",
          cursor: "pointer",
          padding: "8px",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          fontSize: "13px",
          transition: "color 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-tertiary)")}
        title="Keyboard Shortcuts (Ctrl + /)"
      >
        <Keyboard size={18} />
      </button>

      {isOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.7)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100,
          }}
          onClick={() => setIsOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "var(--bg-panel)",
              border: "1px solid var(--border-light)",
              borderRadius: "12px",
              width: "100%",
              maxWidth: "500px",
              boxShadow: "0 24px 48px rgba(0,0,0,0.5)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "20px 24px",
                borderBottom: "1px solid var(--border-light)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Keyboard size={20} color="var(--accent)" />
                <h3 style={{ margin: 0, fontSize: "18px" }}>
                  Keyboard Shortcuts
                </h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "var(--text-tertiary)",
                  cursor: "pointer",
                }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ padding: "24px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {shortcuts.map((shortcut, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "12px",
                      background: "var(--bg-app)",
                      borderRadius: "8px",
                      border: "1px solid var(--border-light)",
                    }}
                  >
                    <span style={{ fontSize: "14px" }}>
                      {shortcut.description}
                    </span>
                    <div style={{ display: "flex", gap: "6px" }}>
                      {shortcut.keys.map((key, i) => (
                        <React.Fragment key={i}>
                          <kbd
                            style={{
                              padding: "4px 8px",
                              background: "var(--bg-card)",
                              border: "1px solid var(--border-light)",
                              borderRadius: "4px",
                              fontSize: "12px",
                              fontWeight: "600",
                              fontFamily: "monospace",
                              color: "var(--accent)",
                            }}
                          >
                            {key}
                          </kbd>
                          {i < shortcut.keys.length - 1 && (
                            <span
                              style={{
                                color: "var(--text-tertiary)",
                                fontSize: "12px",
                              }}
                            >
                              +
                            </span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div
                style={{
                  marginTop: "20px",
                  padding: "12px",
                  background: "var(--priority-low-bg)",
                  borderRadius: "8px",
                  fontSize: "13px",
                  color: "var(--text-secondary)",
                  textAlign: "center",
                }}
              >
                💡 Tip: Gunakan <kbd style={{ fontWeight: "600" }}>Ctrl</kbd> di
                Windows atau <kbd style={{ fontWeight: "600" }}>Cmd</kbd> di Mac
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default KeyboardShortcuts;
