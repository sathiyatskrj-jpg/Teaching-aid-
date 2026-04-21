import { useState, useEffect } from "react";

const PARTS = [
  {
    key: "protocol",
    label: "Protocol",
    emoji: "🔒",
    color: "#ff6b6b",
    bg: "#fff0f0",
    border: "#ff6b6b",
    kidName: "The Lock",
    kidDesc: "This tells your browser HOW to talk to a website. Think of it like choosing between a SECRET tunnel (https://) or an open road (http://). The 'S' means SECURE — your data is locked!",
    analogy: "🏠 Like choosing to whisper a secret vs speaking out loud",
    examples: ["https://", "http://"],
    funFact: "Always look for 🔒 HTTPS before entering passwords!",
    quiz: "Which protocol keeps your data safe and secure?",
    options: ["http://", "https://", "ftp://", "smtp://"],
    correct: 1,
  },
  {
    key: "subdomain",
    label: "Subdomain",
    emoji: "🌿",
    color: "#f59e0b",
    bg: "#fffbeb",
    border: "#f59e0b",
    kidName: "The Branch",
    kidDesc: "A subdomain is like a section of a big website. 'www' is the most common one. Big sites use subdomains like 'mail.google.com' for Gmail or 'maps.google.com' for Maps.",
    analogy: "🏬 Like different departments in a big mall",
    examples: ["www.", "mail.", "blog.", "maps."],
    funFact: "www stands for World Wide Web! 🌐",
    quiz: "What does 'www' stand for?",
    options: ["World Wide Web", "Wide Wireless World", "World Web Works", "Web Wide Windows"],
    correct: 0,
  },
  {
    key: "domain",
    label: "Domain Name",
    emoji: "🏠",
    color: "#10b981",
    bg: "#f0fdf4",
    border: "#10b981",
    kidName: "The Home Name",
    kidDesc: "The domain name is the main NAME of the website — like 'google', 'youtube', or 'wikipedia'. It's what you remember and type to visit a site!",
    analogy: "📍 Like the name of your school or house",
    examples: ["google", "youtube", "amazon", "wikipedia"],
    funFact: "There are over 350 million domain names registered worldwide! 🤯",
    quiz: "In 'www.youtube.com', what is the domain name?",
    options: ["www", "youtube", ".com", "https"],
    correct: 1,
  },
  {
    key: "tld",
    label: "Extension (TLD)",
    emoji: "🌍",
    color: "#3b82f6",
    bg: "#eff6ff",
    border: "#3b82f6",
    kidName: "The Category Tag",
    kidDesc: "This is the ending of the website address. It tells you what TYPE of website it is. .com = company, .edu = school, .gov = government, .in = India!",
    analogy: "🏷️ Like labels on folders — school, games, government",
    examples: [".com", ".edu", ".gov", ".in", ".org"],
    funFact: ".edu websites are only for real schools and universities! 🎓",
    quiz: "Which extension is used by government websites?",
    options: [".com", ".org", ".gov", ".edu"],
    correct: 2,
  },
  {
    key: "path",
    label: "Path",
    emoji: "🗺️",
    color: "#8b5cf6",
    bg: "#f5f3ff",
    border: "#8b5cf6",
    kidName: "The Road Map",
    kidDesc: "The path shows WHICH page or section you want to see on the website. It's like giving directions inside a building. Each '/' means going one level deeper!",
    analogy: "🏫 Like saying: School → 7th Floor → Classroom B",
    examples: ["/home", "/class7/maths", "/games/puzzle"],
    funFact: "The path / (just one slash) means the homepage! 🏠",
    quiz: "What does each '/' in the path represent?",
    options: ["A new website", "Going one level deeper", "A search", "A password"],
    correct: 1,
  },
  {
    key: "query",
    label: "Query String",
    emoji: "🔍",
    color: "#ec4899",
    bg: "#fdf2f8",
    border: "#ec4899",
    kidName: "The Search Question",
    kidDesc: "This is extra information sent to the website, like your search words! It starts with a '?' and uses '=' to pair names with values. Multiple questions use '&' to join them.",
    analogy: "📝 Like filling a form: Name=Rahul&Class=7",
    examples: ["?search=cats", "?game=chess&level=2", "?subject=maths"],
    funFact: "When you search on Google, your words become a query string! 🔎",
    quiz: "What symbol STARTS a query string?",
    options: ["#", "&", "?", "="],
    correct: 2,
  },
  {
    key: "fragment",
    label: "Fragment",
    emoji: "⚓",
    color: "#14b8a6",
    bg: "#f0fdfa",
    border: "#14b8a6",
    kidName: "The Bookmark",
    kidDesc: "The fragment jumps you to a SPECIFIC part of a page — like a bookmark! It starts with '#'. When you click 'Skip to main content', that often uses a fragment.",
    analogy: "📖 Like a bookmark that opens a book to page 50",
    examples: ["#top", "#chapter3", "#comments"],
    funFact: "The fragment is NEVER sent to the server — your browser handles it alone! 🤫",
    quiz: "What symbol starts a fragment in a URL?",
    options: ["?", "&", "@", "#"],
    correct: 3,
  },
];

const DEFAULT_URL = "https://www.youtube.com/watch?v=abc123#comments";

function parseURL(raw) {
  try {
    const url = new URL(raw.trim());
    const hostParts = url.hostname.split(".");
    let subdomain = "", domain = "", tld = "";
    if (hostParts.length >= 3) {
      subdomain = hostParts.slice(0, -2).join(".") + ".";
      domain = hostParts[hostParts.length - 2];
      tld = "." + hostParts[hostParts.length - 1];
    } else if (hostParts.length === 2) {
      domain = hostParts[0];
      tld = "." + hostParts[1];
    } else { domain = hostParts[0]; }
    return {
      protocol: url.protocol + "//",
      subdomain,
      domain,
      tld,
      port: url.port ? ":" + url.port : "",
      path: url.pathname !== "/" ? url.pathname : "",
      query: url.search || "",
      fragment: url.hash || "",
    };
  } catch { return null; }
}

function Confetti() {
  const colors = ["#ff6b6b","#ffd93d","#6bcb77","#4d96ff","#c77dff","#ff9f43"];
  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 999 }}>
      {Array.from({ length: 22 }).map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          left: `${Math.random() * 100}%`,
          top: "-10px",
          width: 10, height: 10,
          background: colors[i % colors.length],
          borderRadius: i % 3 === 0 ? "50%" : "2px",
          animation: `fall${i % 3} ${1.2 + Math.random()}s ease-in forwards`,
          animationDelay: `${Math.random() * 0.5}s`,
          transform: `rotate(${Math.random() * 360}deg)`,
        }} />
      ))}
    </div>
  );
}

export default function URLClass7() {
  const [tab, setTab] = useState("learn");
  const [activeIdx, setActiveIdx] = useState(0);
  const [inputURL, setInputURL] = useState(DEFAULT_URL);
  const [parsed, setParsed] = useState(null);
  const [quizIdx, setQuizIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [stars, setStars] = useState([]);

  useEffect(() => { setParsed(parseURL(inputURL)); }, [inputURL]);

  const active = PARTS[activeIdx];

  function handleOption(i) {
    if (selected !== null) return;
    setSelected(i);
    const correct = PARTS[quizIdx].correct === i;
    if (correct) {
      setScore(s => s + 1);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 1800);
    }
  }

  function nextQuiz() {
    if (quizIdx + 1 >= PARTS.length) { setDone(true); return; }
    setQuizIdx(q => q + 1);
    setSelected(null);
  }

  function resetQuiz() {
    setQuizIdx(0); setSelected(null); setScore(0); setDone(false);
  }

  const segments = parsed
    ? PARTS.map(p => ({ ...p, value: parsed[p.key] })).filter(p => p.value)
    : [];

  return (
    <div style={{
      fontFamily: "'Nunito', 'Segoe UI', sans-serif",
      background: "linear-gradient(135deg, #667eea22 0%, #764ba222 100%), #f8f9ff",
      minHeight: "100vh",
      padding: "16px",
      boxSizing: "border-box",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Fredoka+One&display=swap');
        * { box-sizing: border-box; }
        .bounce { animation: bounceIn 0.5s cubic-bezier(0.34,1.56,0.64,1); }
        @keyframes bounceIn { 0%{transform:scale(0.7);opacity:0} 100%{transform:scale(1);opacity:1} }
        .wiggle:hover { animation: wiggle 0.4s ease; }
        @keyframes wiggle { 0%,100%{transform:rotate(0)} 25%{transform:rotate(-5deg)} 75%{transform:rotate(5deg)} }
        .pop:hover { transform: scale(1.04); transition: transform 0.15s; }
        @keyframes fall0 { to { transform: translateY(110vh) rotate(360deg); } }
        @keyframes fall1 { to { transform: translateY(110vh) rotate(-270deg) translateX(30px); } }
        @keyframes fall2 { to { transform: translateY(110vh) rotate(180deg) translateX(-20px); } }
        .tab-btn { border: none; border-radius: 50px; padding: 10px 20px; font-family: 'Nunito', sans-serif; font-weight: 800; font-size: 0.92em; cursor: pointer; transition: all 0.2s; }
        .tab-btn:hover { transform: translateY(-2px); }
        .card { background: white; border-radius: 20px; padding: 18px; box-shadow: 0 4px 20px rgba(0,0,0,0.07); }
        .seg-badge { display: inline-block; border-radius: 10px; padding: 5px 10px; font-weight: 800; font-size: 1.05em; cursor: pointer; transition: all 0.15s; border: 2.5px solid transparent; }
        .seg-badge:hover { transform: translateY(-3px) scale(1.06); }
        .seg-badge.active { transform: translateY(-4px) scale(1.08); border-color: #333; box-shadow: 0 6px 18px rgba(0,0,0,0.18); }
        .opt-btn { width: 100%; padding: 12px 16px; border-radius: 14px; border: 2.5px solid #e5e7eb; background: white; font-family: 'Nunito',sans-serif; font-weight: 700; font-size: 0.95em; cursor: pointer; text-align: left; transition: all 0.18s; margin-bottom: 8px; }
        .opt-btn:hover:not(:disabled) { border-color: #6366f1; background: #f5f3ff; transform: translateX(4px); }
        .opt-btn.correct { background: #f0fdf4; border-color: #22c55e; color: #15803d; }
        .opt-btn.wrong { background: #fff1f2; border-color: #f43f5e; color: #be123c; }
        .opt-btn:disabled { cursor: default; }
        .nav-dot { width: 10px; height: 10px; border-radius: 50%; border: none; cursor: pointer; transition: all 0.2s; }
      `}</style>

      {showConfetti && <Confetti />}

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: "2em", background: "linear-gradient(90deg,#6366f1,#ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: 4 }}>
          🌐 URL Explorer!
        </div>
        <div style={{ color: "#6b7280", fontSize: "0.88em", fontWeight: 600 }}>For Class 7 · Learn how website addresses work!</div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 20, flexWrap: "wrap" }}>
        {[
          { id: "learn", label: "📚 Learn", color: "#6366f1" },
          { id: "dissect", label: "🔬 Dissect a URL", color: "#10b981" },
          { id: "quiz", label: "🏆 Quiz Time!", color: "#f59e0b" },
        ].map(t => (
          <button key={t.id} className="tab-btn"
            onClick={() => setTab(t.id)}
            style={{
              background: tab === t.id ? t.color : "white",
              color: tab === t.id ? "white" : "#6b7280",
              boxShadow: tab === t.id ? `0 4px 14px ${t.color}55` : "0 2px 8px rgba(0,0,0,0.08)",
            }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* ===== LEARN TAB ===== */}
      {tab === "learn" && (
        <div>
          {/* URL = Address analogy */}
          <div className="card" style={{ marginBottom: 16, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "white" }}>
            <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: "1.2em", marginBottom: 8 }}>💡 What is a URL?</div>
            <p style={{ margin: 0, lineHeight: 1.7, fontSize: "0.92em" }}>
              A <strong>URL</strong> is like the <strong>complete address</strong> of a website — just like your home address tells the postman where you live, a URL tells your browser exactly WHERE to find a web page! 📮
            </p>
            <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 12, padding: "10px 14px", marginTop: 12, fontFamily: "monospace", fontSize: "0.85em", wordBreak: "break-all" }}>
              https://www.youtube.com/watch?v=abc123#comments
            </div>
          </div>

          {/* Part Navigator */}
          <div className="card" style={{ marginBottom: 16 }}>
            <div style={{ fontWeight: 800, color: "#374151", marginBottom: 12, fontSize: "0.88em" }}>📋 PARTS OF A URL — Tap to explore!</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
              {PARTS.map((p, i) => (
                <button key={p.key}
                  onClick={() => setActiveIdx(i)}
                  className="wiggle"
                  style={{
                    background: activeIdx === i ? p.color : p.bg,
                    color: activeIdx === i ? "white" : p.color,
                    border: `2px solid ${p.border}`,
                    borderRadius: 50, padding: "6px 14px",
                    fontFamily: "'Nunito',sans-serif", fontWeight: 800, fontSize: "0.82em",
                    cursor: "pointer", transition: "all 0.18s",
                    boxShadow: activeIdx === i ? `0 4px 14px ${p.color}55` : "none",
                  }}>
                  {p.emoji} {p.label}
                </button>
              ))}
            </div>

            {/* Active Part Card */}
            <div className="bounce" key={activeIdx} style={{
              background: active.bg, border: `2.5px solid ${active.border}`,
              borderRadius: 18, padding: 18,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <div style={{ fontSize: "2.5em" }}>{active.emoji}</div>
                <div>
                  <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: "1.3em", color: active.color }}>{active.label}</div>
                  <div style={{ fontWeight: 800, color: "#374151", fontSize: "0.88em" }}>"{active.kidName}"</div>
                </div>
                <div style={{ marginLeft: "auto", background: active.color, color: "white", borderRadius: 20, padding: "3px 12px", fontSize: "0.78em", fontWeight: 800 }}>
                  {activeIdx + 1}/{PARTS.length}
                </div>
              </div>

              <p style={{ color: "#374151", lineHeight: 1.8, fontSize: "0.93em", margin: "0 0 12px" }}>{active.kidDesc}</p>

              <div style={{ background: "white", borderRadius: 12, padding: "10px 14px", marginBottom: 10, display: "flex", alignItems: "center", gap: 8, fontSize: "0.88em" }}>
                <span style={{ fontSize: "1.3em" }}>🧠</span>
                <span style={{ color: "#6b7280", fontStyle: "italic" }}><strong>Think of it like:</strong> {active.analogy.replace(/^[^\s]+ /, "")}</span>
              </div>

              <div style={{ background: "#fffbeb", border: "1.5px solid #fcd34d", borderRadius: 12, padding: "8px 14px", fontSize: "0.85em", color: "#92400e" }}>
                ⭐ <strong>Fun Fact:</strong> {active.funFact}
              </div>

              <div style={{ marginTop: 12 }}>
                <div style={{ fontWeight: 800, color: "#374151", fontSize: "0.8em", marginBottom: 6 }}>Examples:</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {active.examples.map(ex => (
                    <span key={ex} style={{ background: "white", color: active.color, border: `1.5px solid ${active.color}`, borderRadius: 8, padding: "3px 10px", fontFamily: "monospace", fontWeight: 700, fontSize: "0.85em" }}>
                      {ex}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Prev/Next */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 14 }}>
              <button onClick={() => setActiveIdx(i => Math.max(0, i - 1))} disabled={activeIdx === 0}
                style={{ background: activeIdx === 0 ? "#f3f4f6" : active.color, color: activeIdx === 0 ? "#9ca3af" : "white", border: "none", borderRadius: 50, padding: "8px 20px", fontFamily: "'Nunito',sans-serif", fontWeight: 800, cursor: activeIdx === 0 ? "default" : "pointer", fontSize: "0.9em" }}>
                ← Prev
              </button>
              <div style={{ display: "flex", gap: 6 }}>
                {PARTS.map((p, i) => (
                  <button key={i} className="nav-dot" onClick={() => setActiveIdx(i)}
                    style={{ background: i === activeIdx ? active.color : "#e5e7eb", width: i === activeIdx ? 22 : 10 }} />
                ))}
              </div>
              <button onClick={() => setActiveIdx(i => Math.min(PARTS.length - 1, i + 1))} disabled={activeIdx === PARTS.length - 1}
                style={{ background: activeIdx === PARTS.length - 1 ? "#f3f4f6" : active.color, color: activeIdx === PARTS.length - 1 ? "#9ca3af" : "white", border: "none", borderRadius: 50, padding: "8px 20px", fontFamily: "'Nunito',sans-serif", fontWeight: 800, cursor: activeIdx === PARTS.length - 1 ? "default" : "pointer", fontSize: "0.9em" }}>
                Next →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== DISSECT TAB ===== */}
      {tab === "dissect" && (
        <div>
          <div className="card" style={{ marginBottom: 16 }}>
            <div style={{ fontWeight: 800, color: "#374151", marginBottom: 8, fontSize: "0.9em" }}>🔬 Type any URL — we'll break it apart!</div>
            <input type="text" value={inputURL} onChange={e => setInputURL(e.target.value)}
              style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: "2px solid #e5e7eb", fontFamily: "'Nunito',sans-serif", fontSize: "0.92em", outline: "none", background: "#f9fafb", color: "#111827", marginBottom: 8 }}
              placeholder="https://www.youtube.com/watch?v=abc#comments" />
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["https://www.youtube.com/watch?v=abc123#comments", "https://en.wikipedia.org/wiki/Internet", "http://www.google.co.in/search?q=class7"].map((ex, i) => (
                <button key={i} onClick={() => setInputURL(ex)}
                  style={{ background: "#f3f4f6", color: "#6366f1", border: "1.5px solid #c7d2fe", borderRadius: 8, padding: "5px 10px", fontFamily: "'Nunito',sans-serif", fontWeight: 700, fontSize: "0.75em", cursor: "pointer" }}>
                  Example {i + 1}
                </button>
              ))}
            </div>
          </div>

          {parsed && segments.length > 0 ? (
            <>
              <div className="card" style={{ marginBottom: 16 }}>
                <div style={{ fontWeight: 800, color: "#374151", marginBottom: 12, fontSize: "0.88em" }}>🎨 Click each coloured block to learn about it!</div>
                <div style={{ lineHeight: 2.6, wordBreak: "break-all", fontSize: "1em" }}>
                  {segments.map((seg, i) => (
                    <span key={seg.key}
                      className={`seg-badge${activeIdx === PARTS.findIndex(p => p.key === seg.key) && tab === "dissect" ? " active" : ""}`}
                      style={{ background: seg.bg, color: seg.color, border: `2px solid ${seg.border}`, marginRight: 2 }}
                      onClick={() => { setActiveIdx(PARTS.findIndex(p => p.key === seg.key)); }}>
                      {seg.value}
                    </span>
                  ))}
                </div>
              </div>

              {/* Parts table */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {segments.map(seg => {
                  const part = PARTS.find(p => p.key === seg.key);
                  return (
                    <div key={seg.key} className="card pop" onClick={() => setActiveIdx(PARTS.findIndex(p => p.key === seg.key))}
                      style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer", border: `2px solid ${part.border}22`, padding: "12px 16px" }}>
                      <div style={{ fontSize: "1.8em", width: 36 }}>{part.emoji}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 800, color: "#374151", fontSize: "0.88em" }}>{part.label}</div>
                        <div style={{ color: "#6b7280", fontSize: "0.78em" }}>{part.kidName}</div>
                      </div>
                      <div style={{ background: part.bg, color: part.color, border: `1.5px solid ${part.border}`, borderRadius: 8, padding: "4px 10px", fontFamily: "monospace", fontWeight: 800, fontSize: "0.85em", maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {seg.value}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="card" style={{ textAlign: "center", color: "#6b7280", padding: 32 }}>
              <div style={{ fontSize: "2.5em", marginBottom: 8 }}>🤔</div>
              <div style={{ fontWeight: 700 }}>Hmm, that doesn't look like a valid URL!</div>
              <div style={{ fontSize: "0.85em", marginTop: 4 }}>Try starting with https:// or http://</div>
            </div>
          )}
        </div>
      )}

      {/* ===== QUIZ TAB ===== */}
      {tab === "quiz" && (
        <div>
          {done ? (
            <div className="card bounce" style={{ textAlign: "center", padding: 32 }}>
              <div style={{ fontSize: "3.5em", marginBottom: 8 }}>
                {score >= 6 ? "🏆" : score >= 4 ? "⭐" : "💪"}
              </div>
              <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: "1.8em", color: "#6366f1", marginBottom: 8 }}>
                {score >= 6 ? "Amazing!" : score >= 4 ? "Well Done!" : "Keep Practicing!"}
              </div>
              <div style={{ fontSize: "2.5em", fontWeight: 900, color: score >= 6 ? "#10b981" : score >= 4 ? "#f59e0b" : "#f43f5e", marginBottom: 8 }}>
                {score} / {PARTS.length}
              </div>
              <div style={{ color: "#6b7280", fontSize: "0.92em", marginBottom: 24, lineHeight: 1.7 }}>
                {score >= 6 ? "🎉 You're a URL superstar! You got " + score + " out of " + PARTS.length + " correct!" :
                  score >= 4 ? "Good job! Review the parts you missed and try again!" :
                    "No worries! Go back to 'Learn' and review the parts again. You can do it! 💪"}
              </div>
              <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 20 }}>
                {Array.from({ length: PARTS.length }).map((_, i) => (
                  <div key={i} style={{ fontSize: "1.4em" }}>{i < score ? "⭐" : "☆"}</div>
                ))}
              </div>
              <button onClick={resetQuiz}
                style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "white", border: "none", borderRadius: 50, padding: "12px 32px", fontFamily: "'Nunito',sans-serif", fontWeight: 800, fontSize: "1em", cursor: "pointer", boxShadow: "0 4px 14px #6366f155" }}>
                🔄 Try Again!
              </button>
            </div>
          ) : (
            <div>
              {/* Score + Progress */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <div style={{ background: "white", borderRadius: 20, padding: "6px 16px", fontWeight: 800, fontSize: "0.88em", color: "#374151", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
                  ⭐ Score: <span style={{ color: "#6366f1" }}>{score}</span>
                </div>
                <div style={{ background: "white", borderRadius: 20, padding: "6px 16px", fontWeight: 800, fontSize: "0.88em", color: "#374151", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
                  Question {quizIdx + 1} of {PARTS.length}
                </div>
              </div>

              {/* Progress bar */}
              <div style={{ background: "white", borderRadius: 10, height: 10, marginBottom: 16, overflow: "hidden", boxShadow: "inset 0 2px 4px rgba(0,0,0,0.06)" }}>
                <div style={{ width: `${(quizIdx / PARTS.length) * 100}%`, background: "linear-gradient(90deg,#6366f1,#ec4899)", height: "100%", borderRadius: 10, transition: "width 0.5s" }} />
              </div>

              <div className="card bounce" key={quizIdx}>
                {/* Question */}
                <div style={{ textAlign: "center", marginBottom: 20 }}>
                  <div style={{ fontSize: "3em", marginBottom: 8 }}>{PARTS[quizIdx].emoji}</div>
                  <div style={{ fontFamily: "'Fredoka One', cursive", color: PARTS[quizIdx].color, fontSize: "1.1em", marginBottom: 6 }}>{PARTS[quizIdx].label}</div>
                  <div style={{ fontWeight: 800, color: "#111827", fontSize: "1em", lineHeight: 1.6, background: "#f9fafb", borderRadius: 12, padding: "12px 16px" }}>
                    {PARTS[quizIdx].quiz}
                  </div>
                </div>

                {/* Options */}
                {PARTS[quizIdx].options.map((opt, i) => {
                  let cls = "opt-btn";
                  let icon = "";
                  if (selected !== null) {
                    if (i === PARTS[quizIdx].correct) { cls += " correct"; icon = " ✅"; }
                    else if (i === selected && selected !== PARTS[quizIdx].correct) { cls += " wrong"; icon = " ❌"; }
                  }
                  return (
                    <button key={i} className={cls} onClick={() => handleOption(i)} disabled={selected !== null}>
                      <span style={{ display: "inline-block", width: 24, height: 24, borderRadius: "50%", background: selected === null ? "#e5e7eb" : i === PARTS[quizIdx].correct ? "#22c55e" : i === selected ? "#f43f5e" : "#e5e7eb", color: "white", textAlign: "center", lineHeight: "24px", fontSize: "0.8em", marginRight: 10, fontWeight: 800 }}>
                        {["A", "B", "C", "D"][i]}
                      </span>
                      {opt}{icon}
                    </button>
                  );
                })}

                {selected !== null && (
                  <div className="bounce" style={{
                    background: selected === PARTS[quizIdx].correct ? "#f0fdf4" : "#fff1f2",
                    border: `2px solid ${selected === PARTS[quizIdx].correct ? "#22c55e" : "#f43f5e"}`,
                    borderRadius: 14, padding: "12px 16px", marginTop: 4, textAlign: "center"
                  }}>
                    <div style={{ fontSize: "1.6em", marginBottom: 4 }}>
                      {selected === PARTS[quizIdx].correct ? "🎉 Correct! Great job!" : "😅 Oops! That's okay, keep going!"}
                    </div>
                    <button onClick={nextQuiz}
                      style={{ background: selected === PARTS[quizIdx].correct ? "#22c55e" : "#6366f1", color: "white", border: "none", borderRadius: 50, padding: "10px 28px", fontFamily: "'Nunito',sans-serif", fontWeight: 800, fontSize: "0.95em", cursor: "pointer", marginTop: 8 }}>
                      {quizIdx + 1 >= PARTS.length ? "🏆 See My Score!" : "Next Question →"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      <div style={{ textAlign: "center", marginTop: 24, color: "#9ca3af", fontSize: "0.75em", fontWeight: 600 }}>
        🌐 URL Explorer · Class 7 Digital Teaching Aid
      </div>
    </div>
  );
}
