import React from "react";
import { Download, FileJson, FileSpreadsheet } from "lucide-react";

const ExportData = ({ data }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const exportToJSON = () => {
    const exportData = {
      exportDate: new Date().toISOString(),
      tasks: Object.values(data.tasks),
      columns: data.columns,
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `ayoatur-tasks-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setIsOpen(false);
  };

  const exportToCSV = () => {
    const tasks = Object.values(data.tasks);
    const headers = [
      "ID",
      "Judul",
      "Deskripsi",
      "Prioritas",
      "Status",
      "Label",
      "Batas Waktu",
      "Dibuat",
    ];

    const rows = tasks.map((task) => {
      const column = data.columns[task.column_id];
      return [
        task.id,
        `"${task.content.replace(/"/g, '""')}"`,
        `"${(task.description || "").replace(/"/g, '""')}"`,
        task.priority || "",
        column ? column.title : "",
        task.tags ? task.tags.join("; ") : "",
        task.due_date || "",
        task.created_at || "",
      ];
    });

    const csv = [headers.join(","), ...rows.map((row) => row.join(","))].join(
      "\n",
    );

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `ayoatur-tasks-${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setIsOpen(false);
  };

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="btn-primary"
        style={{
          background: "var(--bg-card)",
          color: "var(--text-primary)",
          border: "1px solid var(--border-light)",
        }}
      >
        <Download size={16} />
        Export
      </button>

      {isOpen && (
        <>
          <div
            onClick={() => setIsOpen(false)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 99,
            }}
          />
          <div
            className="glass-panel"
            style={{
              position: "absolute",
              top: "calc(100% + 8px)",
              right: 0,
              width: "240px",
              padding: "12px",
              zIndex: 100,
              boxShadow: "0 12px 24px rgba(0,0,0,0.5)",
            }}
          >
            <button
              onClick={exportToJSON}
              style={{
                width: "100%",
                padding: "12px",
                background: "transparent",
                border: "1px solid var(--border-light)",
                borderRadius: "6px",
                color: "var(--text-primary)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "8px",
                fontSize: "14px",
                fontWeight: "500",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--bg-card)";
                e.currentTarget.style.borderColor = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderColor = "var(--border-light)";
              }}
            >
              <FileJson size={18} color="var(--accent)" />
              <div style={{ textAlign: "left" }}>
                <div>Export JSON</div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "var(--text-tertiary)",
                    fontWeight: "400",
                  }}
                >
                  Data lengkap
                </div>
              </div>
            </button>

            <button
              onClick={exportToCSV}
              style={{
                width: "100%",
                padding: "12px",
                background: "transparent",
                border: "1px solid var(--border-light)",
                borderRadius: "6px",
                color: "var(--text-primary)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                fontSize: "14px",
                fontWeight: "500",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--bg-card)";
                e.currentTarget.style.borderColor = "var(--priority-low)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderColor = "var(--border-light)";
              }}
            >
              <FileSpreadsheet size={18} color="var(--priority-low)" />
              <div style={{ textAlign: "left" }}>
                <div>Export CSV</div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "var(--text-tertiary)",
                    fontWeight: "400",
                  }}
                >
                  Untuk Excel
                </div>
              </div>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ExportData;
