import { useEffect, useRef, useState } from "react";
import { fetchPostStats, forgetLiked, incrementLike, readLiked, recordViewOnce, rememberLiked } from "./postStats";

export function usePostStats(postId) {
  const [stats, setStats] = useState(null);
  const [liked, setLiked] = useState(() => readLiked(postId));
  const [ready, setReady] = useState(false);
  const likingRef = useRef(false);
  const [liking, setLiking] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        await recordViewOnce(postId);
      } catch {
        // The view write can fail when Firestore is blocked. Still try to read.
      }

      try {
        const next = await fetchPostStats(postId);
        if (!cancelled) setStats(next);
      } catch {
        if (!cancelled) setStats(null);
      } finally {
        if (!cancelled) setReady(true);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [postId]);

  async function like() {
    if (liked || likingRef.current) return;

    likingRef.current = true;
    setLiking(true);

    const previousStats = stats;
    setLiked(true);
    rememberLiked(postId);
    setStats((current) => (current ? { ...current, likes: current.likes + 1 } : current));

    try {
      await incrementLike(postId);
      try {
        const next = await fetchPostStats(postId);
        if (next) setStats(next);
      } catch {
        // The like landed. Keep the optimistic total if the refresh read fails.
      }
    } catch {
      forgetLiked(postId);
      likingRef.current = false;
      setLiked(false);
      setStats(previousStats);
    } finally {
      setLiking(false);
    }
  }

  return { stats, liked, ready, liking, like };
}
