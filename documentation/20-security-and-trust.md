# 11 — Security and Trust

## Trust promise

Mody Cloud hosts developer-owned WordPress projects. Customers must trust the platform with code, content, credentials, domains, backups, and production availability.

Security should be part of the product foundation, not an enterprise add-on.

## Security principles

### Isolation by default

Each site should have isolated:

- Filesystem storage.
- Database credentials.
- Environment variables.
- Runtime limits.
- Logs and support access.

### Least privilege

Users, support staff, services, and agents should only access what they need.

### Secrets are not content

Secrets should never be treated like normal editable text.

Examples:

- Database passwords.
- Authentication salts.
- SMTP credentials.
- Private package credentials.
- API keys.
- SSL private keys.

### Validate before applying

All user-controlled environment or server settings should be validated before being applied.

### Auditable operations

Important changes should create audit records:

- Environment changes.
- Backup restores.
- Plan changes.
- Domain changes.
- Deployment events.
- Support access.
- Agent actions.

## Bari security conventions

Mody Cloud should preserve Bari security conventions:

- Do not edit WordPress core.
- Do not edit vendor dependencies directly.
- Keep business logic in plugins.
- Sanitize inputs.
- Escape outputs.
- Prepare SQL.
- Require REST permission callbacks.
- Validate nonces and capabilities for state-changing admin/AJAX actions.
- Avoid hardcoded paths and URLs.
- Do not commit secrets.

## WordPress-specific risks

Mody Cloud should plan for:

- Vulnerable third-party plugins.
- Weak admin credentials.
- Abandoned plugins/themes.
- Public REST endpoints exposing data.
- File upload abuse.
- Brute-force login attempts.
- Spam/comment abuse.
- SEO/plugin conflicts.
- Cache misconfiguration.

## Platform controls

Potential controls:

- Strong default admin onboarding.
- Optional 2FA recommendation or enforcement.
- Plugin vulnerability awareness.
- File integrity monitoring for managed baseline files.
- Rate limiting for sensitive endpoints.
- Web application firewall integration.
- Safe default permissions.
- Isolated backups.
- Malware scan integrations.

## Agent security

Agent-first workflows need special controls:

- Do not expose raw production secrets to agents by default.
- Log agent-authored changes.
- Require human approval for production deployment.
- Prevent agent edits to `app/wp/**`, `app/vendor/**`, and third-party plugins/themes.
- Require validation before deployment.
- Use scoped context packs instead of full secret-bearing environment dumps.
- Make destructive operations explicit and approval-based.

## `.env` management security

The future control panel should:

- Mask sensitive values.
- Validate non-sensitive values.
- Restrict settings by plan and role.
- Audit all changes.
- Use write-only secret fields.
- Separate staging and production variables.
- Run health checks after applying changes.
- Support rollback for safe settings.

## Backup trust

Backup system requirements:

- Backups are encrypted or stored in a protected environment.
- Backups are isolated from the running site.
- Restore process is tested regularly.
- Failed backups generate alerts.
- Retention is documented by plan.
- Customer data deletion policies are documented.

## Compliance posture

Mody Cloud should not overpromise early compliance. Start with a clear practical security posture and grow toward formal standards as the platform matures.

Initial trust docs should cover:

- Data storage location.
- Backup retention.
- Access control.
- Support access policy.
- Incident communication.
- Subprocessors/infrastructure providers.
- Customer responsibilities.

Future trust milestones:

- Public status page.
- Security policy.
- Vulnerability disclosure process.
- Data processing agreement.
- Formal access review process.
- Compliance roadmap.

