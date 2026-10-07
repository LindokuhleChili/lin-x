import { VerifiedBadge, ReplyIcon, RetweetIcon, LikeIcon, ViewsIcon, ShareIcon } from "./Icons";

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

export function TweetCard({ project }) {
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

        <div className="tweet-stats">
          <span className="tweet-stat">
            <ReplyIcon />
            {project.stats.replies}
          </span>
          <span className="tweet-stat">
            <RetweetIcon />
            {project.stats.retweets}
          </span>
          <span className="tweet-stat">
            <LikeIcon />
            {project.stats.likes}
          </span>
          <span className="tweet-stat">
            <ViewsIcon />
            {project.stats.views}
          </span>
          <ShareIcon />
        </div>
      </div>
    </article>
  );
}
