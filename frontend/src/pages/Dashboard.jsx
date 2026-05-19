import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Dashboard() {

  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [editingId, setEditingId] = useState(null);

  // FETCH NOTES
  const fetchNotes = async () => {
    try {

      const res = await API.get("/notes");

      setNotes(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  // CREATE OR UPDATE NOTE
  const saveNote = async () => {

    try {

      // UPDATE
      if (editingId) {

        await API.put(`/notes/${editingId}`, {
          title,
          content,
        });

        setEditingId(null);

      } else {

        // CREATE
        await API.post("/notes", {
          title,
          content,
        });

      }

      setTitle("");
      setContent("");

      fetchNotes();

    } catch (err) {
      console.log(err);
    }
  };

  // DELETE NOTE
  const deleteNote = async (id) => {

    try {

      await API.delete(`/notes/${id}`);

      fetchNotes();

    } catch (err) {
      console.log(err);
    }
  };

  // EDIT NOTE
  const editNote = (note) => {

    setTitle(note.title);
    setContent(note.content);

    setEditingId(note.id);
  };

  // CHECK LOGIN
  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
    }

    fetchNotes();

  }, []);

  return (
    <div style={styles.pageWrapper}>

      {/* Background effects */}
      <div style={styles.bgGlow1} />
      <div style={styles.bgGlow2} />

      <div style={styles.container}>

        {/* HEADER */}
        <div style={styles.header}>

          <div>
            <h1 style={styles.mainTitle}>✨ Your Secure Vault</h1>
            <p style={styles.headerSubtitle}>Create and manage your encrypted notes</p>
          </div>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/");
            }}
            style={styles.logoutButton}
          >
            Logout →
          </button>

        </div>

        {/* NOTE FORM */}
        <div style={styles.noteBox}>

          <div style={styles.formHeader}>
            <span style={styles.formIcon}>📝</span>
            <span style={styles.formTitle}>
              {editingId ? "Edit Your Note" : "Create New Note"}
            </span>
          </div>

          <div style={styles.inputGroup}>
            <input
              type="text"
              placeholder="Note Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={styles.input}
            />

            <textarea
              placeholder="Write your note content..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="5"
              style={styles.textarea}
            />
          </div>

          <button onClick={saveNote} style={styles.saveButton}>
            {editingId ? "💾 Update Note" : "➕ Create Note"}
          </button>

        </div>

        {/* NOTES GRID */}
        <div style={styles.notesSection}>
          <h2 style={styles.sectionTitle}>
            📚 Your Notes ({notes.length})
          </h2>

          {notes.length === 0 ? (
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>📭</div>
              <p style={styles.emptyText}>No notes yet. Create your first one!</p>
            </div>
          ) : (
            <div style={styles.notesGrid}>

              {notes.map((note) => (

                <div key={note.id} style={styles.card}>

                  <div style={styles.cardHeader}>
                    <h3 style={styles.cardTitle}>{note.title}</h3>
                  </div>

                  <p style={styles.cardContent}>{note.content}</p>

                  <div style={styles.actions}>

                    <button
                      onClick={() => editNote(note)}
                      style={styles.editButton}
                    >
                      ✏️ Edit
                    </button>

                    <button
                      onClick={() => deleteNote(note.id)}
                      style={styles.deleteButton}
                    >
                      🗑️ Delete
                    </button>

                  </div>

                </div>

              ))}

            </div>
          )}
        </div>

      </div>

    </div>
  );
}

const styles = {

  pageWrapper: {
    minHeight: "100vh",
    position: "relative",
    overflow: "hidden",
  },

  bgGlow1: {
    position: "fixed",
    width: "600px",
    height: "600px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)",
    top: "-100px",
    right: "-100px",
    pointerEvents: "none",
    zIndex: 0,
  },

  bgGlow2: {
    position: "fixed",
    width: "500px",
    height: "500px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(192,38,211,0.12) 0%, transparent 70%)",
    bottom: "-150px",
    left: "-150px",
    pointerEvents: "none",
    zIndex: 0,
  },

  container: {
    padding: "40px",
    maxWidth: "1400px",
    margin: "0 auto",
    position: "relative",
    zIndex: 1,
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "40px",
    padding: "24px 32px",
    background: "rgba(168, 85, 247, 0.06)",
    backdropFilter: "blur(24px)",
    WebkitBackdropFilter: "blur(24px)",
    borderRadius: "20px",
    border: "1px solid rgba(168, 85, 247, 0.18)",
  },

  mainTitle: {
    fontFamily: "'Syne', sans-serif",
    fontSize: "32px",
    fontWeight: "800",
    background: "linear-gradient(135deg, #a855f7, #c026d3)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    marginBottom: "4px",
  },

  headerSubtitle: {
    fontSize: "14px",
    color: "#7a6b96",
  },

  logoutButton: {
    padding: "12px 24px",
    borderRadius: "12px",
    border: "1px solid rgba(239, 68, 68, 0.3)",
    background: "rgba(239, 68, 68, 0.1)",
    color: "#fca5a5",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
    transition: "all 0.3s ease",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },

  noteBox: {
    marginBottom: "50px",
    padding: "32px",
    background: "rgba(168, 85, 247, 0.06)",
    backdropFilter: "blur(24px)",
    WebkitBackdropFilter: "blur(24px)",
    borderRadius: "20px",
    border: "1px solid rgba(168, 85, 247, 0.18)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
  },

  formHeader: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "24px",
  },

  formIcon: {
    fontSize: "24px",
  },

  formTitle: {
    fontFamily: "'Syne', sans-serif",
    fontSize: "20px",
    fontWeight: "700",
    color: "#1a0b2e",
  },

  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    marginBottom: "20px",
  },

  input: {
    width: "100%",
    padding: "14px 10px",
    borderRadius: "14px",
    border: "1px solid rgba(168, 85, 247, 0.18)",
    background: "rgba(168, 85, 247, 0.06)",
    color: "#1a0b2e",
    outline: "none",
    fontSize: "14px",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    transition: "all 0.3s ease",
    fontWeight: "500",
  },

  textarea: {
    width: "100%",
    padding: "14px 10px",
    borderRadius: "14px",
    border: "1px solid rgba(168, 85, 247, 0.18)",
    background: "rgba(168, 85, 247, 0.06)",
    color: "#1a0b2e",
    outline: "none",
    fontSize: "14px",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    resize: "vertical",
    minHeight: "120px",
    transition: "all 0.3s ease",
    fontWeight: "500",
  },

  saveButton: {
    padding: "14px 28px",
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
  },

  notesSection: {
    marginTop: "40px",
  },

  sectionTitle: {
    fontFamily: "'Syne', sans-serif",
    fontSize: "24px",
    fontWeight: "700",
    marginBottom: "24px",
    color: "#1a0b2e",
  },

  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "80px 20px",
    background: "rgba(168, 85, 247, 0.03)",
    borderRadius: "20px",
    border: "1px dashed rgba(168, 85, 247, 0.2)",
  },

  emptyIcon: {
    fontSize: "64px",
    marginBottom: "16px",
    opacity: 0.6,
  },

  emptyText: {
    fontSize: "15px",
    color: "#7a6b96",
  },

  notesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "24px",
  },

  card: {
    background: "rgba(168, 85, 247, 0.06)",
    backdropFilter: "blur(24px)",
    WebkitBackdropFilter: "blur(24px)",
    padding: "24px",
    borderRadius: "18px",
    border: "1px solid rgba(168, 85, 247, 0.18)",
    transition: "all 0.3s ease",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },

  cardHeader: {
    borderBottom: "1px solid rgba(168, 85, 247, 0.15)",
    paddingBottom: "12px",
  },

  cardTitle: {
    fontSize: "18px",
    fontWeight: "700",
    fontFamily: "'Syne', sans-serif",
    color: "#1a0b2e",
    marginBottom: "0",
  },

  cardContent: {
    fontSize: "14px",
    lineHeight: "1.6",
    color: "#2d1f3d",
    flex: 1,
  },

  actions: {
    display: "flex",
    gap: "10px",
    marginTop: "8px",
  },

  editButton: {
    flex: 1,
    padding: "10px 16px",
    borderRadius: "10px",
    border: "1px solid rgba(168, 85, 247, 0.3)",
    background: "rgba(168, 85, 247, 0.1)",
    color: "#c084fc",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "13px",
    transition: "all 0.3s ease",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },

  deleteButton: {
    flex: 1,
    padding: "10px 16px",
    borderRadius: "10px",
    border: "1px solid rgba(239, 68, 68, 0.3)",
    background: "rgba(239, 68, 68, 0.1)",
    color: "#fca5a5",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "13px",
    transition: "all 0.3s ease",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },

};

export default Dashboard;