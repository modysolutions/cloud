# 02 — Product Offer

## Product summary

Mody Cloud initially offers a simple managed hosting subscription for a single WordPress site powered by a fresh Bari stack.

The first version should be easy to understand:

> Subscribe monthly, launch a clean Bari-powered WordPress site, and get 3GB of managed storage with a modern developer workflow ready from day one.

## Initial subscription: Mody Cloud Site

### Included

- One WordPress site.
- One fresh Bari stack.
- 3GB storage per site.
- Managed Nginx + PHP-FPM + MariaDB + Redis-capable runtime.
- Mail capture or transactional email integration depending on environment.
- Isolated WordPress core and content layout inherited from Bari.
- Gutenberg-native starter theme.
- Composer-managed plugin/theme dependency model.
- WP-CLI support through controlled platform tooling.
- Automated provisioning from a known-good template.
- Standard backups and restore path.
- Basic monitoring and uptime checks.

### Not included at launch

To keep the first product operationally simple, the MVP should not initially promise:

- Unlimited storage.
- Arbitrary server customization.
- Root/server SSH access.
- High-availability multi-region infrastructure.
- Advanced autoscaling.
- Enterprise compliance commitments.
- Unlimited plugin support for every third-party plugin.

These can become paid upgrades or later tiers once the operational model is stable.

## The “virgin Bari stack”

Each new site should start from a clean Bari baseline:

- WordPress core isolated in `app/wp/`.
- Public content in `app/web/`.
- Gutenberg-native theme in `app/web/themes/theme/`.
- Custom plugin area ready for project-specific business logic.
- Bari CLI tooling available for migrations and pattern workflows.
- Frontend source centralized in `src/` and compiled to `app/dist/`.
- Safe environment configuration based on `.env`-style variables.
- Documentation and agent instructions included as part of the project baseline.

## Customer outcomes

Customers should be able to:

- Launch a modern WordPress site without setting up hosting manually.
- Build with Gutenberg-native theme conventions instead of fragile theme hacks.
- Add business logic through custom plugins.
- Use AI agents more safely because Bari projects are documented and structured.
- Move from a landing page to a richer application without abandoning the stack.
- Upgrade storage, performance, and control as the project grows.

## Product expansion paths

### Storage upgrades

Increase per-site storage beyond 3GB:

- 10GB for content-heavy business sites.
- 25GB+ for media-heavy sites.
- Object storage integration for large media libraries.
- Upload proxy/cache options for local and staging workflows.

### Speed upgrades

Improve performance through:

- More CPU/RAM allocation.
- Better PHP workers.
- Redis object-cache configuration.
- Page-cache integration.
- CDN integration.
- Image optimization workflows.
- Production asset optimization.

### Control upgrades

Give advanced users controlled access to settings:

- Environment variable management through a UI.
- Toggle selected WordPress constants safely.
- Manage PHP memory limits within plan boundaries.
- Configure SMTP providers.
- Configure cache behavior.
- Configure domain and SSL settings.
- Manage staging/production environment differences.

### Workflow upgrades

Add developer productivity features:

- Staging environments.
- Git-based deployment.
- Preview environments.
- Agent-assisted maintenance tasks.
- Migration runner UI.
- Pattern and block library management.
- Team collaboration and role-based access.

## Product boundaries

Mody Cloud should host and enable Bari projects, not absorb every possible client-specific responsibility.

Business-specific features should live in custom plugins. Theme changes should remain presentation-focused. Infrastructure-specific controls should be exposed only when they can be validated, audited, and safely rolled back.

