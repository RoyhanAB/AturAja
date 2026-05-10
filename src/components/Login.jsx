import React, { useState } from "react";
import { supabase } from "../supabaseClient";

const Login = ({ setSession }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      let error;
      if (isRegister) {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });
        error = signUpError;
        if (!error) {
          setErrorMsg(
            "Registrasi berhasil! Silakan periksa email Anda atau langsung login jika auto-confirm aktif.",
          );
          setIsRegister(false);
        }
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        error = signInError;
      }

      if (error) throw error;
    } catch (error) {
      setErrorMsg(error.message || "Terjadi kesalahan saat autentikasi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg-app)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="app-background"></div>

      <div
        className="glass-panel"
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "40px",
          background: "var(--bg-panel)",
          borderRadius: "16px",
          border: "1px solid var(--border-light)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
          zIndex: 10,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "24px",
          }}
        >
          <img
            src="/img/AturAjaLogo.png"
            alt="AyoAtur Logo"
            style={{ width: "80px", height: "80px", objectFit: "contain" }}
          />
        </div>

        <h2
          style={{
            textAlign: "center",
            marginBottom: "8px",
            fontSize: "24px",
            fontWeight: "600",
          }}
        >
          {isRegister ? "Buat Akun Baru" : "Selamat Datang"}
        </h2>
        <p
          style={{
            textAlign: "center",
            color: "var(--text-tertiary)",
            marginBottom: "32px",
            fontSize: "14px",
          }}
        >
          {isRegister
            ? "Daftar sekarang untuk mengelola proyek Anda."
            : "Masuk untuk mengakses papan tugas Anda."}
        </p>

        {errorMsg && (
          <div
            style={{
              background: "var(--priority-high-bg)",
              color: "var(--priority-high)",
              padding: "12px",
              borderRadius: "8px",
              marginBottom: "20px",
              fontSize: "13px",
              textAlign: "center",
            }}
          >
            {errorMsg}
          </div>
        )}

        <form
          onSubmit={handleAuth}
          style={{ display: "flex", flexDirection: "column", gap: "16px" }}
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
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="anda@email.com"
              style={{
                width: "100%",
                padding: "12px 16px",
                background: "var(--bg-card)",
                border: "1px solid var(--border-light)",
                borderRadius: "8px",
                color: "white",
                outline: "none",
              }}
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
              Kata Sandi
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                width: "100%",
                padding: "12px 16px",
                background: "var(--bg-card)",
                border: "1px solid var(--border-light)",
                borderRadius: "8px",
                color: "white",
                outline: "none",
              }}
              required
            />
          </div>

          <button
            type="submit"
            className="btn-primary"
            style={{
              marginTop: "12px",
              width: "100%",
              justifyContent: "center",
              padding: "12px",
            }}
            disabled={loading}
          >
            {loading ? "Memproses..." : isRegister ? "Daftar" : "Masuk"}
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: "24px",
            fontSize: "14px",
            color: "var(--text-tertiary)",
          }}
        >
          {isRegister ? "Sudah punya akun? " : "Belum punya akun? "}
          <span
            onClick={() => setIsRegister(!isRegister)}
            style={{
              color: "var(--accent)",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            {isRegister ? "Masuk" : "Daftar"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
