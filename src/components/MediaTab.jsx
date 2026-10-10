import { DocumentIcon, DownloadIcon } from "./Icons";

const CV_PATH = "/Lindo%20Chile%20CV%20General%20October.pdf";

export function MediaTab() {
  return (
    <div className="media-tab">
      <a href={CV_PATH} target="_blank" rel="noreferrer" className="media-card">
        <div className="media-icon-wrap">
          <DocumentIcon />
        </div>

        <div className="media-info">
          <p className="media-title">Lindo Chile CV General October</p>
          <p className="media-subtitle">PDF, updated October 2026</p>
        </div>

        <span className="media-view-button">
          <DownloadIcon />
          View
        </span>
      </a>

      <p className="media-note">
        Opens in a new tab. Get in touch using the contact details above if you would like to discuss it.
      </p>
    </div>
  );
}
