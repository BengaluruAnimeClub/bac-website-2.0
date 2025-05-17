"use client";
import { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Comment {
  id: string;
  name: string;
  message: string;
  createdAt: string;
  image?: string; // Add image field for profile picture
}

export function CommentSection({ slug }: { slug: string }) {
  const { data: session, status } = useSession();
  const [comments, setComments] = useState<Comment[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/comments?slug=${encodeURIComponent(slug)}`)
      .then((res) => res.json())
      .then((data) => {
        setComments(data.comments || []);
        if (data.comments && data.comments.length > 0) {
          // Debug: log the first comment's image field
          // Remove this after debugging
          // eslint-disable-next-line no-console
          console.log('First comment image:', data.comments[0].image);
        }
      });
  }, [slug]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    if (!session?.user?.name) {
      setLoading(false);
      setError("You must be logged in to comment.");
      return;
    }
    const res = await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slug,
        name: session.user.name,
        message,
        image: session.user.image || null,
      }),
    });
    setLoading(false);
    if (!res.ok) {
      setError("Failed to post comment. Please try again.");
      return;
    }
    setMessage("");
    const data = await res.json();
    setComments(data.comments);
  }

  return (
    <section className="mt-10 border-t pt-8">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      {status === "loading" ? (
        <div>Loading...</div>
      ) : !session ? (
        <div className="mb-6">
          <button
            className="bg-[#ea4167] text-white px-4 py-2 rounded"
            onClick={() => signIn()}
          >
            Login with GitHub to comment
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mb-6 space-y-2">
          <input
            className="border rounded px-3 py-2 w-full bg-gray-100 text-gray-500 cursor-not-allowed"
            value={session?.user?.name || ""}
            disabled
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
      )}
      <div className="space-y-4">
        {comments.length === 0 && <div className="text-muted-foreground">No comments yet.</div>}
        {comments.map((c) => (
          <div key={c.id} className="border rounded p-3 bg-muted flex gap-3 items-start">
            <div style={{ width: 32, height: 32, minWidth: 32, minHeight: 32, borderRadius: '50%', overflow: 'hidden', background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {c.image ? (
                <img
                  src={c.image}
                  alt={c.name || "User"}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%', display: 'block' }}
                  referrerPolicy="no-referrer"
                />
              ) : (
                <span style={{ fontWeight: 600, color: '#888', fontSize: 18 }}>
                  {c.name ? c.name.charAt(0).toUpperCase() : "?"}
                </span>
              )}
            </div>
            <div className="flex-1">
              <div className="text-sm text-muted-foreground mb-1">
                {c.name ? c.name : "Anonymous"} · {c.createdAt && !isNaN(Date.parse(c.createdAt)) ? new Date(c.createdAt).toLocaleString() : ""}
              </div>
              {c.message && (
                <div className="whitespace-pre-line text-base">{String(c.message)}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
