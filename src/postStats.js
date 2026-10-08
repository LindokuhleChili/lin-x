import { doc, getDoc, increment, updateDoc } from "firebase/firestore/lite";
import { getDb } from "./firebase";

const COLLECTION = "postStats";

// In-flight view writes, so React strict mode cannot count the same view twice
// before sessionStorage is set.
const viewWrites = new Map();

function statsRef(postId) {
  return doc(getDb(), COLLECTION, postId);
}

function likedKey(postId) {
  return `linx:liked:${postId}`;
}

function viewedKey(postId) {
  return `linx:viewed:${postId}`;
}

function storageGet(storage, key) {
  try {
    return storage.getItem(key);
  } catch {
    return null;
  }
}

function storageSet(storage, key, value) {
  try {
    storage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

function storageRemove(storage, key) {
  try {
    storage.removeItem(key);
  } catch {
    // Storage can be blocked. Callers still update in-memory state.
  }
}

export function readLiked(postId) {
  return storageGet(localStorage, likedKey(postId)) === "1";
}

export function rememberLiked(postId) {
  storageSet(localStorage, likedKey(postId), "1");
}

export function forgetLiked(postId) {
  storageRemove(localStorage, likedKey(postId));
}

function asCount(value) {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

export async function fetchPostStats(postId) {
  const snap = await getDoc(statsRef(postId));
  if (!snap.exists()) return null;
  const data = snap.data();
  const likes = asCount(data.likes);
  const views = asCount(data.views);
  if (likes === null || views === null) return null;
  return { likes, views };
}

/**
 * Counts one view per post per browser session.
 * Rules accept only a single-field +1, so this updates views and nothing else.
 * Resolves true when this call performed the write.
 */
export function recordViewOnce(postId) {
  const key = viewedKey(postId);
  if (storageGet(sessionStorage, key) === "1") return Promise.resolve(false);

  const pending = viewWrites.get(postId);
  if (pending) return pending;

  const write = updateDoc(statsRef(postId), { views: increment(1) })
    .then(() => {
      storageSet(sessionStorage, key, "1");
      return true;
    })
    .catch((error) => {
      viewWrites.delete(postId);
      throw error;
    });

  viewWrites.set(postId, write);
  return write;
}

/**
 * Rules accept +1 like and reject any decrease, so a like cannot be undone.
 */
export function incrementLike(postId) {
  return updateDoc(statsRef(postId), { likes: increment(1) });
}
