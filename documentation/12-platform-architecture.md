# 03 — Platform Architecture

## Architecture principle

Mody Cloud should use Bari as the canonical project runtime and development baseline. Bari is not only a starter repository; it is the contract that makes hosting, tooling, automation, and agent-assisted development predictable.

## Bari foundation

A Bari project provides:

- Nginx reverse proxy.
- PHP-FPM WordPress runtime.
- MariaDB database.
- Redis-capable object cache layer.
- Mailpit/local mail capture pattern for development.
- Isolated WordPress core in `app/wp/`.
- Public content root in `app/web/`.
- Gutenberg-native theme in `app/web/themes/theme/`.
- Composer-managed dependencies in `app/composer.json`.
- Shared frontend build from `src/` to `app/dist/`.
- Custom WP-CLI plugin `bari-cli` for migrations and pattern workflows.
- Project scripts in `bin/` for setup, WP-CLI, Composer, certificates, startup, tests, and WordPress core versioning.

## Mody Cloud production adaptation

The local Bari stack is Docker-first. Mody Cloud should adapt the same concepts to a production-safe managed environment.

### Site runtime

Each site should have:

- An isolated application filesystem.
- Isolated database credentials.
- Controlled PHP runtime settings.
- A bounded storage allocation.
- Managed Nginx configuration.
- Managed SSL.
- Managed backups.
- Runtime logs visible through the platform when safe.

### Site provisioning

Provisioning should create:

1. A new site record in Mody Cloud.
2. A fresh Bari codebase from the approved baseline.
3. Database/schema resources.
4. Environment variables for domain, database, WordPress constants, mail, and plan limits.
5. Initial WordPress installation.
6. Default admin user flow.
7. Storage quota tracking.
8. Baseline health checks.

### Code model

Mody Cloud should support a controlled code lifecycle:

- Baseline Bari stack managed by Mody.
- Project customizations tracked separately.
- Third-party dependencies managed through Composer where possible.
- Custom business features implemented as custom plugins.
- Theme changes limited to Gutenberg-native presentation concerns.

## Multi-tenant considerations

Mody Cloud can start simple, but its architecture should prepare for multi-tenant growth.

Important concerns:

- Filesystem isolation between sites.
- Database isolation between sites.
- Secret isolation and safe environment variable storage.
- Per-site storage quotas.
- Per-site CPU/memory/process limits.
- Centralized logs with tenant scoping.
- Backups stored independently from the running site.
- Clear boundaries between Mody-managed code and customer-managed code.

## Control plane vs runtime plane

### Control plane

The Mody Cloud control plane should manage:

- Accounts and billing.
- Site records and plan limits.
- Provisioning jobs.
- Environment variables and server settings.
- Deployment state.
- Backups and restores.
- Monitoring and alerts.
- Support access.
- Audit logs.

### Runtime plane

The runtime plane should host:

- WordPress application containers/processes.
- Nginx or reverse proxy routes.
- MariaDB databases.
- Redis/cache services.
- Storage volumes/object storage.
- Background jobs.

## Gutenberg-native theme stance

The hosted Bari baseline should preserve the current theme direction:

- Block templates in `templates/*.html`.
- Template parts in `parts/*.html`.
- Design system in `theme.json`.
- Style variations in `styles/*.json`.
- Presentation-only patterns.
- Business logic in plugins.

Mody Cloud should not promote Twig-first theme architecture. Timber/Twig may remain available for plugin SSR use cases when a plugin benefits from server-rendered templates.

## Agent-readiness as architecture

Every provisioned site should include:

- Current `AGENTS.md` guidance.
- Documentation describing project conventions.
- Clear boundaries for editable/non-editable areas.
- Standard validation commands.
- Security and environment rules.

This makes agent-assisted maintenance and development safer because an agent can reason from stable conventions instead of guessing project structure.

