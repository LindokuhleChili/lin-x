export function CredentialCard({ certification }) {
  return (
    <div className="credential-card">
      <img
        className="credential-badge"
        src={certification.badge}
        alt={certification.badgeAlt}
        width="96"
        height="96"
      />

      <div className="credential-body">
        <p className="credential-issuer">{certification.issuer}</p>
        <h3 className="credential-name">{certification.name}</h3>
        <p className="credential-meta">Earned {certification.earned}</p>
        <p className="credential-meta">Expires {certification.expires}</p>
        <p className="credential-id">Credential ID {certification.credentialId}</p>
        <a
          className="credential-verify"
          href={certification.verifyUrl}
          target="_blank"
          rel="noreferrer"
        >
          Verify credential
        </a>
      </div>
    </div>
  );
}
