import { VerifiedBadge, ReplyIcon, RetweetIcon, LikeIcon, ViewsIcon, ShareIcon } from "./Icons";

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

        <p className="tweet-hashtags">
          {project.hashtags.map((tag) => (
            <span key={tag}>#{tag}</span>
          ))}
        </p>

        {project.image && (
          <a href={project.linkUrl} target="_blank" rel="noreferrer" className="tweet-image-link">
            <img src={project.image} alt={`Screenshot of ${project.id}`} className="tweet-image" />
          </a>
        )}

        <a href={project.linkUrl} target="_blank" rel="noreferrer" className="tweet-link-card">
          <div className="tweet-link-card-inner">
            <p className="tweet-link-label">{project.linkLabel}</p>
            <p className="tweet-link-title">View the live project</p>
          </div>
        </a>

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
