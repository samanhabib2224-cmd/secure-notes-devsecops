import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const registerUser = async () => {
    try {
      const res = await API.post("/auth/register", {
        name,
        email,
        password,
      });

      console.log(res.data);

      alert("Registered Successfully 🚀");

      navigate("/");
    } catch (err) {
      console.log(err.response?.data || err.message);

      alert(
        err.response?.data?.message || "Register Failed ❌"
      );
    }
  };

  return (
    <div style={styles.pageWrapper}>

      {/* Glow blob */}
      <div style={styles.glowBlob} />

      <div style={styles.container}>

        {/* Top badge */}
        <div style={styles.badge}>✨ Join SecureNotes</div>

        <h2 style={styles.title}>Create Account</h2>
        <p style={styles.subtitle}>Your private, encrypted note space</p>

        <div style={styles.formGroup}>
          <label style={styles.label}>Full Name</label>
          <input
            type="text"
            placeholder="Your name"
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Email Address</label>
          <input
            type="email"
            placeholder="you@example.com"
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
        </div>

        <button onClick={registerUser} style={styles.button}>
          Create Account →
        </button>

        <div style={styles.divider}>
          <span style={styles.dividerLine} />
          <span style={styles.dividerText}>or</span>
          <span style={styles.dividerLine} />
        </div>

        <p style={styles.footerText}>
          Already have an account?{" "}
          <Link to="/" style={styles.link}>Sign In</Link>
        </p>

      </div>
    </div>
  );
}

const styles = {
  pageWrapper: {
    minHeight: "calc(100vh - 70px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
  },
  glowBlob: {
    position: "absolute",
    width: "500px",
    height: "500px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(192,38,211,0.15) 0%, transparent 70%)",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    pointerEvents: "none",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
    width: "400px",
    padding: "40px",
    background: "rgba(168, 85, 247, 0.06)",
    backdropFilter: "blur(24px)",
    WebkitBackdropFilter: "blur(24px)",
    borderRadius: "24px",
    border: "1px solid rgba(168, 85, 247, 0.2)",
    boxShadow: "0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(168,85,247,0.08) inset",
    position: "relative",
    zIndex: 1,
  },
  badge: {
    display: "inline-flex",
    alignSelf: "center",
    padding: "5px 16px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
    background: "rgba(192, 38, 211, 0.15)",
    border: "1px solid rgba(192, 38, 211, 0.3)",
    color: "#e879f9",
    letterSpacing: "0.4px",
  },
  title: {
    fontFamily: "'Syne', sans-serif",
    fontSize: "28px",
    fontWeight: "700",
    textAlign: "center",
    background: "linear-gradient(135deg, #a855f7, #c026d3)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    marginBottom: "2px",
  },
  subtitle: {
    textAlign: "center",
    fontSize: "13px",
    color: "#7a6b96",
    marginTop: "-10px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "7px",
  },
  label: {
    fontSize: "13px",
    fontWeight: "500",
    color: "#a89bc2",
    paddingLeft: "4px",
  },
  input: {
    width: "100%",
    padding: "13px 18px",
    borderRadius: "14px",
    border: "1px solid rgba(168, 85, 247, 0.18)",
    background: "rgba(168, 85, 247, 0.06)",
    color: "#f5f0ff",
    outline: "none",
    fontSize: "14px",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    transition: "all 0.3s ease",
  },
  button: {
    padding: "14px 20px",
    borderRadius: "14px",
    border: "none",
    cursor: "pointer",
    fontWeight: "700",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: "15px",
    background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #c026d3 100%)",
    color: "#fff",
    transition: "all 0.3s ease",
    letterSpacing: "0.3px",
    boxShadow: "0 4px 20px rgba(124, 58, 237, 0.4)",
    marginTop: "4px",
  },
  divider: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    margin: "2px 0",
  },
  dividerLine: {
    flex: 1,
    height: "1px",
    background: "rgba(168, 85, 247, 0.15)",
  },
  dividerText: {
    fontSize: "12px",
    color: "#7a6b96",
  },
  footerText: {
    textAlign: "center",
    fontSize: "13px",
    color: "#7a6b96",
  },
  link: {
    color: "#a855f7",
    textDecoration: "none",
    fontWeight: "600",
  },
};

export default Register;