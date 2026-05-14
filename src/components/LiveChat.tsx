import { useState, useEffect, useRef } from "react";

const OWNER = "granddia2";
const REPO  = "test";
const DISCUSSION_NUMBER = 1; // change to your discussion number

const GRAPHQL = `
  query($owner:String!,$repo:String!,$num:Int!){
    repository(owner:$owner,name:$repo){
      discussion(number:$num){
        title
        comments(last:30){
          nodes{
            id
            body
            createdAt
            author{ login avatarUrl }
          }
        }
      }
    }
  }
`;

async function fetchComments(token?: string) {
  const headers: Record<string,string> = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `bearer ${token}`;
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers,
    body: JSON.stringify({ query: GRAPHQL, variables: { owner: OWNER, repo: REPO, num: DISCUSSION_NUMBER } }),
  });
  const data = await res.json();
  return data?.data?.repository?.discussion?.comments?.nodes ?? [];
}

async function postComment(body: string, token: string) {
  // First get the discussion node_id via REST
  const res = await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/discussions`,
    { headers: { Authorization: `token ${token}`, Accept: "application/vnd.github+json" } }
  );
  const discussions = await res.json();
  const disc = discussions.find((d: any) => d.number === DISCUSSION_NUMBER);
  if (!disc) throw new Error("Discussion not found");

  await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/discussions/${DISCUSSION_NUMBER}/comments`, {
    method: "POST",
    headers: { Authorization: `token ${token}`, "Content-Type": "application/json", Accept: "application/vnd.github+json" },
    body: JSON.stringify({ body }),
  });
}

export default function LiveChat() {
  const [comments, setComments] = useState<any[]>([]);
  const [input, setInput]       = useState("");
  const [token, setToken]       = useState(() => localStorage.getItem("gh_token") ?? "");
  const [name, setName]         = useState(() => localStorage.getItem("gh_name") ?? "");
  const [loading, setLoading]   = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  const load = async () => {
    const msgs = await fetchComments(token || undefined);
    setComments(msgs);
    setLoading(false);
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  useEffect(() => { load(); const t = setInterval(load, 15000); return () => clearInterval(t); }, []);

  const send = async () => {
    if (!input.trim() || !token) return;
    await postComment(input.trim(), token);
    setInput("");
    await load();
  };

  const saveToken = (v: string) => { setToken(v); localStorage.setItem("gh_token", v); };
  const saveName  = (v: string) => { setName(v);  localStorage.setItem("gh_name", v); };

  return (
    <div style={{ display:"flex", flexDirection:"column", height:"500px", border:"1px solid #e1e4e8", borderRadius:"8px", overflow:"hidden", fontFamily:"sans-serif" }}>
      {/* Header */}
      <div style={{ padding:"12px 16px", background:"#f6f8fa", borderBottom:"1px solid #e1e4e8", display:"flex", alignItems:"center", gap:"8px" }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
        <strong style={{ fontSize:"14px" }}>Live Chat</strong>
        <span style={{ fontSize:"12px", color:"#57606a", marginLeft:"auto" }}>via GitHub Discussions</span>
      </div>

      {/* Messages */}
      <div style={{ flex:1, overflowY:"auto", padding:"12px 16px", display:"flex", flexDirection:"column", gap:"10px" }}>
        {loading && <p style={{ color:"#57606a", fontSize:"13px" }}>Loading messages…</p>}
        {!loading && comments.length === 0 && <p style={{ color:"#57606a", fontSize:"13px" }}>No messages yet. Be the first!</p>}
        {comments.map((c) => (
          <div key={c.id} style={{ display:"flex", gap:"8px" }}>
            <img src={c.author.avatarUrl} alt="" width={28} height={28} style={{ borderRadius:"50%", flexShrink:0 }} />
            <div>
              <div style={{ fontSize:"12px", fontWeight:600, color:"#24292f" }}>{c.author.login}</div>
              <div style={{ fontSize:"14px", background:"#f6f8fa", borderRadius:"4px 12px 12px 12px", padding:"6px 10px", marginTop:"2px", display:"inline-block", maxWidth:"420px", wordBreak:"break-word" }}>{c.body}</div>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Token setup (if no token) */}
      {!token && (
        <div style={{ padding:"10px 16px", background:"#fff8c5", borderTop:"1px solid #e1e4e8", fontSize:"12px" }}>
          To post messages, enter a GitHub token:{" "}
          <input placeholder="ghp_..." style={{ fontSize:"12px", padding:"2px 6px", border:"1px solid #ccc", borderRadius:"4px", width:"180px" }}
            onBlur={(e) => saveToken(e.target.value)} />
        </div>
      )}

      {/* Composer */}
      <div style={{ display:"flex", gap:"8px", padding:"10px 16px", borderTop:"1px solid #e1e4e8" }}>
        <input
          value={input} onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
          placeholder={token ? "Type a message…" : "Add a GitHub token above to post"}
          disabled={!token}
          style={{ flex:1, padding:"6px 12px", border:"1px solid #d0d7de", borderRadius:"20px", fontSize:"14px", outline:"none" }}
        />
        <button onClick={send} disabled={!token || !input.trim()}
          style={{ padding:"6px 16px", background:"#0969da", color:"white", border:"none", borderRadius:"20px", fontSize:"13px", cursor:"pointer" }}>
          Send
        </button>
      </div>
    </div>
  );
}
