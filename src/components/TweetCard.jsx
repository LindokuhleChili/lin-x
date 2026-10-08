import { useEffect, useRef, useState } from "react";
import { VerifiedBadge, LikeIcon, ViewsIcon, ShareIcon } from "./Icons";
import { usePostStats } from "../usePostStats";

function TweetImage({ project }) {
  const image = (
    <img
      src={project.image}
      alt={project.imageAlt ?? `Screenshot of ${project.id}`}
      className="tweet-image"
      width={project.imageWidth}
      height={project.imageHeight}
      style={
        project.imageMaxWidth
          ? { maxWidth: `min(100%, ${project.imageMaxWidth}px)`, height: "auto" }
          : undefined
      }
    />
  );

  const framed = project.linkUrl ? (
    <a href={project.linkUrl} target="_blank" rel="noreferrer" className="tweet-image-link">
      {image}
    </a>
  ) : (
    <div className="tweet-image-link">{image}</div>
  );

  if (!project.imageCredit) return framed;

  return (
    <figure className="tweet-figure">
      {framed}
      <figcaption className="tweet-image-credit">{project.imageCredit}</figcaption>
    </figure>
  );
}

function copyWithTextarea(text) {
  const field = document.createElement("textarea");
  field.value = text;
  field.setAttribute("readonly", "");
  field.style.position = "fixed";
  field.style.top = "0";
  field.style.left = "0";
  field.style.width = "1px";
  field.style.height = "1px";
  field.style.opacity = "0";
  document.body.appendChild(field);
  field.focus();
  field.select();
  field.setSelectionRange(0, text.length);
  let copied = false;
  try {
    copied = document.execCommand("copy");
  } catch {
    copied = false;
  }
  document.body.removeChild(field);
  return copied;
}

async function copyText(text) {
  // execCommand has to run inside the click, before any await, or the browser
  // drops the user gesture and the copy fails.
  if (copyWithTextarea(text)) return;

  if (!navigator.clipboard?.writeText) throw new Error("copy failed");

  await Promise.race([
    navigator.clipboard.writeText(text),
    new Promise((_, reject) => {
      setTimeout(() => reject(new Error("clipboard timeout")), 1000);
    })
  ]);
}

function useCopySiteLink() {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  async function copySiteLink() {
    try {
      await copyText(window.location.origin);
      setCopied(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return { copied, copySiteLink };
}

function likeLabel(liked, stats) {
  const action = liked ? "Liked" : "Like";
  if (!stats) return action;
  const noun = stats.likes === 1 ? "like" : "likes";
  return `${action}, ${stats.likes} ${noun}`;
}

export function TweetCard({ project }) {
  const { stats, liked, ready, liking, like } = usePostStats(project.id);
  const { copied, copySiteLink } = useCopySiteLink();

  return (
    <article className="tweet">
      <div className="tweet-avatar">LC</div>

      <div className="tweet-body">
        <div className="tweet-header">
          <span className="tweet-name">Lindo Chili</span>
          <VerifiedBadge size={16} />
          <span className="tweet-dim">@LindoChili</span>
          <span className="tweet-dim">·</span>
          <span className="tweet-dim">{project.date}</span>
        </div>

        <p className="tweet-text">{project.text}</p>

        {project.hashtags?.length > 0 && (
          <p className="tweet-hashtags">
            {project.hashtags.map((tag) => (
              <span key={tag}>#{tag}</span>
            ))}
          </p>
        )}

        {project.image && <TweetImage project={project} />}

        {project.embedUrl && (
          <div className="tweet-embed">
            <iframe
              className="tweet-embed-frame"
              src={project.embedUrl}
              title={project.embedTitle}
              loading="lazy"
              allow="fullscreen; picture-in-picture; encrypted-media"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        )}

        {project.linkUrl && (
          <a href={project.linkUrl} target="_blank" rel="noreferrer" className="tweet-link-card">
            <div className="tweet-link-card-inner">
              <p className="tweet-link-label">{project.linkLabel}</p>
              <p className="tweet-link-title">{project.linkTitle ?? "View the live project"}</p>
            </div>
          </a>
        )}

        <div className="tweet-actions">
          <button
            type="button"
            className={liked ? "tweet-action like liked" : "tweet-action like"}
            onClick={like}
            disabled={liked || liking || !ready}
            aria-pressed={liked}
            aria-label={likeLabel(liked, stats)}
          >
            <span className="tweet-action-icon">
              <LikeIcon liked={liked} />
            </span>
            {stats ? <span className="tweet-action-count">{stats.likes}</span> : null}
          </button>

          {stats ? (
            <span
              className="tweet-stat"
              aria-label={`${stats.views} ${stats.views === 1 ? "view" : "views"}`}
            >
              <span className="tweet-stat-icon">
                <ViewsIcon />
              </span>
              <span className="tweet-action-count" aria-hidden="true">
                {stats.views}
              </span>
            </span>
          ) : (
            <span className="tweet-stat" />
          )}

          <button
            type="button"
            className={copied ? "tweet-action share copied" : "tweet-action share"}
            onClick={copySiteLink}
            aria-label={copied ? "Link copied" : "Copy link to this site"}
          >
            <span className="tweet-action-icon">
              <ShareIcon />
            </span>
            {copied ? <span className="tweet-action-count">Copied</span> : null}
            <span className="visually-hidden" aria-live="polite">
              {copied ? "Link copied" : ""}
            </span>
          </button>
        </div>
      </div>
    </article>
  );
}
