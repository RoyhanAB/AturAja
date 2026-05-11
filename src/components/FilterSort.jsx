import React from "react";
import { Filter, SortAsc, X } from "lucide-react";

const FilterSort = ({ filters, setFilters, allTags }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handlePriorityToggle = (priority) => {
    const newPriorities = filters.priorities.includes(priority)
      ? filters.priorities.filter((p) => p !== priority)
      : [...filters.priorities, priority];
    setFilters({ ...filters, priorities: newPriorities });
  };

  const handleTagToggle = (tag) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter((t) => t !== tag)
      : [...filters.tags, tag];
    setFilters({ ...filters, tags: newTags });
  };

  const handleClearFilters = () => {
    setFilters({
      priorities: [],
      tags: [],
      sortBy: "position",
      showOverdue: false,
    });
  };

  const activeFilterCount =
    filters.priorities.length +
    filters.tags.length +
    (filters.showOverdue ? 1 : 0);

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="btn-primary"
        style={{
          background: activeFilterCount > 0 ? "var(--accent)" : "var(--bg-card)",
          color: activeFilterCount > 0 ? "white" : "var(--text-primary)",
          border: "1px solid var(--border-light)",
          position: "relative",
        }}
      >
        <Filter size={16} />
        Filter & Sort
        {activeFilterCount > 0 && (
          <span
            style={{
              position: "absolute",
              top: "-6px",
              right: "-6px",
              background: "var(--priority-high)",
              color: "white",
              borderRadius: "50%",
              width: "20px",
              height: "20px",
              fontSize: "11px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "600",
            }}
          >
            {activeFilterCount}
          </span>
        )}
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
              width: "320px",
              padding: "20px",
              zIndex: 100,
              boxShadow: "0 12px 24px rgba(0,0,0,0.5)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <h4 style={{ fontSize: "16px", fontWeight: "600" }}>
                Filter & Sort
              </h4>
              {activeFilterCount > 0 && (
                <button
                  onClick={handleClearFilters}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "var(--priority-high)",
                    cursor: "pointer",
                    fontSize: "12px",
                    fontWeight: "500",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <X size={14} /> Clear
                </button>
              )}
            </div>

            {/* Sort By */}
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "13px",
                  color: "var(--text-secondary)",
                  marginBottom: "10px",
                  fontWeight: "500",
                }}
              >
                <SortAsc size={14} />
                Urutkan Berdasarkan
              </label>
              <select
                value={filters.sortBy}
                onChange={(e) =>
                  setFilters({ ...filters, sortBy: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  background: "var(--bg-app)",
                  border: "1px solid var(--border-light)",
                  borderRadius: "6px",
                  color: "white",
                  fontSize: "13px",
                  outline: "none",
                }}
              >
                <option value="position">Posisi Default</option>
                <option value="priority">Prioritas</option>
                <option value="dueDate">Batas Waktu</option>
                <option value="created">Tanggal Dibuat</option>
              </select>
            </div>

            {/* Priority Filter */}
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  fontSize: "13px",
                  color: "var(--text-secondary)",
                  marginBottom: "10px",
                  display: "block",
                  fontWeight: "500",
                }}
              >
                Prioritas
              </label>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {["High", "Medium", "Low"].map((priority) => (
                  <label
                    key={priority}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      cursor: "pointer",
                      padding: "8px",
                      borderRadius: "6px",
                      background: filters.priorities.includes(priority)
                        ? "var(--bg-card)"
                        : "transparent",
                      border: "1px solid",
                      borderColor: filters.priorities.includes(priority)
                        ? "var(--border-focus)"
                        : "transparent",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={filters.priorities.includes(priority)}
                      onChange={() => handlePriorityToggle(priority)}
                      style={{ cursor: "pointer" }}
                    />
                    <span
                      className="tag"
                      style={{
                        color: `var(--priority-${priority.toLowerCase()})`,
                        background: `var(--priority-${priority.toLowerCase()}-bg)`,
                      }}
                    >
                      {priority === "High"
                        ? "Tinggi"
                        : priority === "Medium"
                          ? "Sedang"
                          : "Rendah"}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Tags Filter */}
            {allTags.length > 0 && (
              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    fontSize: "13px",
                    color: "var(--text-secondary)",
                    marginBottom: "10px",
                    display: "block",
                    fontWeight: "500",
                  }}
                >
                  Label
                </label>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "8px",
                  }}
                >
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => handleTagToggle(tag)}
                      className="tag"
                      style={{
                        background: filters.tags.includes(tag)
                          ? "var(--accent)"
                          : "var(--bg-app)",
                        color: filters.tags.includes(tag)
                          ? "white"
                          : "var(--text-secondary)",
                        border: "1px solid",
                        borderColor: filters.tags.includes(tag)
                          ? "var(--accent)"
                          : "var(--border-light)",
                        cursor: "pointer",
                      }}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Overdue Filter */}
            <div>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  cursor: "pointer",
                  padding: "10px",
                  borderRadius: "6px",
                  background: filters.showOverdue
                    ? "var(--priority-high-bg)"
                    : "transparent",
                  border: "1px solid",
                  borderColor: filters.showOverdue
                    ? "var(--priority-high)"
                    : "var(--border-light)",
                }}
              >
                <input
                  type="checkbox"
                  checked={filters.showOverdue}
                  onChange={(e) =>
                    setFilters({ ...filters, showOverdue: e.target.checked })
                  }
                  style={{ cursor: "pointer" }}
                />
                <span style={{ fontSize: "13px", fontWeight: "500" }}>
                  Hanya Tugas Terlambat
                </span>
              </label>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FilterSort;
