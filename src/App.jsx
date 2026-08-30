import { useState } from "react";
import "./App.css";
import { ProfileHeader } from "./components/ProfileHeader";
import { TweetCard } from "./components/TweetCard";
import { MediaTab } from "./components/MediaTab";
import { projects } from "./data/projects";

export default function App() {
  const [activeTab, setActiveTab] = useState("Posts");

  return (
    <div className="app-shell">
      <ProfileHeader activeTab={activeTab} onTabChange={setActiveTab} />

      <main>
        {activeTab === "Posts" &&
          projects.map((project) => <TweetCard key={project.id} project={project} />)}

        {activeTab === "Media" && <MediaTab />}

        {(activeTab === "Replies" || activeTab === "Highlights") && (
          <p className="empty-state">Nothing here yet.</p>
        )}
      </main>

      <footer className="app-footer">
        Lin X is a personal portfolio page styled after X, built to showcase real projects. Not affiliated with X Corp.
      </footer>
    </div>
  );
}
