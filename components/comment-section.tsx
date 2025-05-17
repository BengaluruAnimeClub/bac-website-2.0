"use client";
import { useEffect, useState } from "react";

interface Comment {
  id: string;
  name: string;
  message: string;
  createdAt: string;
}

export function CommentSection({ slug }: { slug: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/comments?slug=${encodeURIComponent(slug)}`)
      .then((res) => res.json())
      .then((data) => setComments(data.comments || []));
  }, [slug]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, name, message }),
    });
    setLoading(false);
    if (!res.ok) {
      setError("Failed to post comment. Please try again.");
      return;
    }
    setName("");
    setMessage("");
    const data = await res.json();
    setComments(data.comments);
  }

  return (
    <section className="mt-10 border-t pt-8">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      <form onSubmit={handleSubmit} className="mb-6 space-y-2">
        <input
          className="border rounded px-3 py-2 w-full"
          placeholder="Your name (optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={32}
        />
        <textarea
          className="border rounded px-3 py-2 w-full min-h-[80px]"
          placeholder="Write a comment..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          maxLength={500}
        />
        <button
          type="submit"
          className="bg-[#ea4167] text-white px-4 py-2 rounded disabled:opacity-60"
          disabled={loading || !message.trim()}
        >
          {loading ? "Posting..." : "Post Comment"}
        </button>
        {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
      </form>
      <div className="space-y-4">
        {comments.length === 0 && <div className="text-muted-foreground">No comments yet.</div>}
        {comments.map((c) => (
          <div key={c.id} className="border rounded p-3 bg-muted">
            <div className="text-sm text-muted-foreground mb-1">
              {c.name ? c.name : "Anonymous"} · {c.createdAt && !isNaN(Date.parse(c.createdAt)) ? new Date(c.createdAt).toLocaleString() : ""}
            </div>
            {c.message && (
              <div className="whitespace-pre-line text-base">{String(c.message)}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
