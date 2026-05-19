import { Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div>

      {/* NAVBAR */}
      <nav style={styles.nav}>

        <div style={styles.logoWrapper}>
          <div style={styles.logoIcon}>🔐</div>
          <div style={styles.logo}>SecureNotes</div>
        </div>

        <div style={styles.links}>
          <Link to="/" style={styles.link}>Login</Link>
          <Link to="/register" style={styles.link}>Register</Link>
        </div>

      </nav>

      {/* ROUTES */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>

    </div>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 36px",
    background: "rgba(6, 2, 15, 0.8)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    borderBottom: "1px solid rgba(168, 85, 247, 0.18)",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  logoWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  logoIcon: {
    fontSize: "20px",
    filter: "drop-shadow(0 0 8px rgba(168, 85, 247, 0.7))",
  },
  logo: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: "800",
    fontSize: "20px",
    background: "linear-gradient(135deg, #a855f7, #c026d3)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    letterSpacing: "-0.3px",
  },
  links: {
    display: "flex",
    gap: "6px",
    alignItems: "center",
  },
  link: {
    color: "#a89bc2",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "500",
    padding: "8px 18px",
    borderRadius: "10px",
    transition: "all 0.25s ease",
  },
};

export default App;