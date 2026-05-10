import React from "react";
import { Mail, Briefcase } from "lucide-react";

const mockTeam = [
  {
    id: 1,
    name: "Alice Freeman",
    role: "Product Manager",
    email: "alice@ayoatur.com",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 2,
    name: "Bob Smith",
    role: "Lead Designer",
    email: "bob@ayoatur.com",
    avatar: "https://i.pravatar.cc/150?img=11",
  },
  {
    id: 3,
    name: "Charlie Davis",
    role: "Frontend Engineer",
    email: "charlie@ayoatur.com",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 4,
    name: "Diana Prince",
    role: "Backend Engineer",
    email: "diana@ayoatur.com",
    avatar: "https://i.pravatar.cc/150?img=9",
  },
  {
    id: 5,
    name: "Evan Wright",
    role: "QA Tester",
    email: "evan@ayoatur.com",
    avatar: "https://i.pravatar.cc/150?img=8",
  },
];

const Team = () => {
  return (
    <div style={{ padding: "32px", overflowY: "auto", height: "100%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "32px",
        }}
      >
        <div>
          <h2
            style={{ fontSize: "24px", fontWeight: "600", marginBottom: "8px" }}
          >
            Team Directory
          </h2>
          <p style={{ color: "var(--text-tertiary)" }}>
            Manage your team members and their roles.
          </p>
        </div>
        <button className="btn-primary">Invite Member</button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "24px",
        }}
      >
        {mockTeam.map((member) => (
          <div
            key={member.id}
            className="glass-card"
            style={{
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <img
              src={member.avatar}
              alt={member.name}
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                marginBottom: "16px",
                border: "3px solid var(--border-light)",
              }}
            />
            <h3
              style={{
                fontSize: "16px",
                fontWeight: "600",
                marginBottom: "4px",
              }}
            >
              {member.name}
            </h3>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                color: "var(--accent)",
                fontSize: "13px",
                marginBottom: "16px",
              }}
            >
              <Briefcase size={14} />
              <span>{member.role}</span>
            </div>

            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "12px",
                background: "var(--bg-app)",
                borderRadius: "8px",
                color: "var(--text-secondary)",
                fontSize: "13px",
              }}
            >
              <Mail size={14} />
              <span>{member.email}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
