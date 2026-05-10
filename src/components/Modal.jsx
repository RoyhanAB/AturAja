import React, { useState } from "react";
import { X } from "lucide-react";

const Modal = ({ onClose, onSave, initialData }) => {
  const [content, setContent] = useState(
    initialData ? initialData.content : "",
  );
  const [description, setDescription] = useState(
    initialData && initialData.description ? initialData.description : "",
  );
  const [priority, setPriority] = useState(
    initialData && initialData.priority ? initialData.priority : "Medium",
  );
  const [tagsInput, setTagsInput] = useState(
    initialData && initialData.tags ? initialData.tags.join(", ") : "",
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    // Format date for mock
    const today = new Date();
    const dueDate = today.toLocaleDateString("id-ID", {
      month: "short",
      day: "numeric",
    });

    onSave({
      content,
      description,
      priority,
      tags,
      dueDate,
    });
  };

  return (
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
    >
      <div
        style={{
          background: "var(--bg-panel)",
          border: "1px solid var(--border-light)",
          borderRadius: "12px",
          width: "100%",
          maxWidth: "500px",
          boxShadow: "0 24px 48px rgba(0,0,0,0.5)",
          animation: "slideUp 0.3s ease",
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
          <h3 style={{ margin: 0, fontSize: "18px" }}>
            {initialData ? "Edit Tugas" : "Buat Tugas Baru"}
          </h3>
          <button
            onClick={onClose}
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

        <form
          onSubmit={handleSubmit}
          style={{
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontSize: "13px",
                color: "var(--text-secondary)",
              }}
            >
              Judul Tugas *
            </label>
            <input
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Contoh: Perbarui Halaman Utama"
              style={{
                width: "100%",
                padding: "10px 14px",
                background: "var(--bg-app)",
                border: "1px solid var(--border-light)",
                borderRadius: "6px",
                color: "white",
                outline: "none",
              }}
              autoFocus
              required
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontSize: "13px",
                color: "var(--text-secondary)",
              }}
            >
              Deskripsi
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tambahkan detail lainnya..."
              rows={3}
              style={{
                width: "100%",
                padding: "10px 14px",
                background: "var(--bg-app)",
                border: "1px solid var(--border-light)",
                borderRadius: "6px",
                color: "white",
                outline: "none",
                resize: "vertical",
              }}
            />
          </div>

          <div style={{ display: "flex", gap: "16px" }}>
            <div style={{ flex: 1 }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontSize: "13px",
                  color: "var(--text-secondary)",
                }}
              >
                Prioritas
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  background: "var(--bg-app)",
                  border: "1px solid var(--border-light)",
                  borderRadius: "6px",
                  color: "white",
                  outline: "none",
                  appearance: "none",
                }}
              >
                <option value="High">🔴 Tinggi</option>
                <option value="Medium">🟡 Sedang</option>
                <option value="Low">🟢 Rendah</option>
              </select>
            </div>

            <div style={{ flex: 1 }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontSize: "13px",
                  color: "var(--text-secondary)",
                }}
              >
                Label (pisahkan dengan koma)
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="Contoh: Frontend, Bug"
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  background: "var(--bg-app)",
                  border: "1px solid var(--border-light)",
                  borderRadius: "6px",
                  color: "white",
                  outline: "none",
                }}
              />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "12px",
              marginTop: "12px",
            }}
          >
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: "10px 16px",
                background: "transparent",
                border: "none",
                color: "var(--text-primary)",
                cursor: "pointer",
                borderRadius: "6px",
              }}
            >
              Batal
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={!content.trim()}
            >
              {initialData ? "Simpan Perubahan" : "Simpan Tugas"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
