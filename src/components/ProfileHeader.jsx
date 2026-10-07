import { useEffect, useState } from "react";
import {
  VerifiedBadge,
  LocationPinIcon,
  LinkIcon,
  CalendarIcon,
  GitHubIcon,
  MailIcon,
  ArrowBackIcon
} from "./Icons";

const PROFILE = {
  name: "Lindo Chili",
  handle: "@LindoChili",
  bio: "3rd year Business IT student at the University of Johannesburg. Aspiring software engineer, DevOps engineer, and cloud engineer. Building real things on AWS.",
  location: "Johannesburg, South Africa",
  email: "lindo.chili18@gmail.com",
  githubUsername: "LindokuhleChili",
  githubUrl: "https://github.com/LindokuhleChili",
  githubHandle: "github.com/LindokuhleChili",
  postCount: 4
};

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function formatJoinedDate(isoDate) {
  const date = new Date(isoDate);
  return `Joined ${MONTH_NAMES[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}

export const TABS = ["Posts", "Replies", "Highlights", "Media"];

/**
 * The stats row below the bio is a real fetch against GitHub's public REST API,
 * not hardcoded numbers - contributionsCollection (the total shown on a real
 * GitHub profile) needs GraphQL plus an authenticated token to read, which isn't
 * something safe to ship in client-side code, so this shows the two stats that
 * are genuinely available unauthenticated: public repository count and followers.
 */
export function ProfileHeader({ activeTab, onTabChange }) {
  const [stats, setStats] = useState(null);
  const [statsError, setStatsError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    fetch(`https://api.github.com/users/${PROFILE.githubUsername}`)
      .then((response) => {
        if (!response.ok) throw new Error(`GitHub API returned ${response.status}`);
        return response.json();
      })
      .then((data) => {
        if (cancelled) return;
        setStats({
          publicRepos: data.public_repos,
          followers: data.followers,
          joinedLabel: formatJoinedDate(data.created_at)
        });
      })
      .catch(() => {
        if (!cancelled) setStatsError("Could not load live GitHub stats right now.");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div>
      <header className="top-header">
        <button className="icon-button" aria-label="Back">
          <ArrowBackIcon />
        </button>
        <div>
          <h1 className="header-title">{PROFILE.name}</h1>
          <p className="header-subtitle">{PROFILE.postCount} posts</p>
        </div>
      </header>

      <div className="banner" />

      <div className="profile-top-row">
        <div className="avatar">LC</div>
        <div className="profile-actions">
          <a href={`mailto:${PROFILE.email}`} className="icon-link-button" aria-label="Email">
            <MailIcon />
          </a>
          <a href={PROFILE.githubUrl} target="_blank" rel="noreferrer" className="icon-link-button" aria-label="GitHub">
            <GitHubIcon />
          </a>
          <button className="follow-button">Follow</button>
        </div>
      </div>

      <div className="profile-info">
        <div className="name-row">
          <h2 className="display-name">{PROFILE.name}</h2>
          <VerifiedBadge />
        </div>
        <p className="handle">{PROFILE.handle}</p>

        <p className="bio">{PROFILE.bio}</p>

        <button onClick={() => onTabChange("Media")} className="bio-cv-link">
          My CV is in the Media tab
        </button>

        <div className="meta-row">
          <span className="meta-item">
            <LocationPinIcon />
            {PROFILE.location}
          </span>
          <a href={PROFILE.githubUrl} target="_blank" rel="noreferrer" className="meta-link">
            <LinkIcon />
            {PROFILE.githubHandle}
          </a>
          {stats && (
            <span className="meta-item">
              <CalendarIcon />
              {stats.joinedLabel}
            </span>
          )}
        </div>

        {stats && (
          <div className="stats-row">
            <span>
              <span className="stat-value">{stats.publicRepos}</span> <span className="stat-label">Repositories</span>
            </span>
            <span>
              <span className="stat-value">{stats.followers}</span>{" "}
              <span className="stat-label">{stats.followers === 1 ? "Follower" : "Followers"}</span>
            </span>
          </div>
        )}
        {!stats && !statsError && <p className="stats-error">Loading live GitHub stats…</p>}
        {statsError && <p className="stats-error">{statsError}</p>}
      </div>

      <nav className="tabs">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={tab === activeTab ? "tab active" : "tab"}
          >
            {tab}
          </button>
        ))}
      </nav>
    </div>
  );
}
