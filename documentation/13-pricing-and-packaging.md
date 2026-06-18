# 04 — Pricing and Packaging

## Pricing philosophy

Mody Cloud should start with a simple, predictable monthly subscription. The first offer should be easy to buy and easy to operate.

Early pricing should avoid unlimited claims. Instead, plans should define clear resource boundaries and upgrade paths.

## MVP package

### Mody Cloud Site

A simple monthly plan for one Bari-powered WordPress site.

Included:

- 1 WordPress site.
- Fresh Bari stack.
- 3GB storage.
- Standard PHP/MariaDB runtime.
- Managed SSL.
- Standard backup policy.
- Basic uptime monitoring.
- Access to developer workflows.
- Basic support.

The exact price should be selected after infrastructure cost testing, but the value proposition should be:

> Affordable enough for landing pages and small client sites, but professional enough to support real developer workflows.

## Suggested future tiers

### Starter

For landing pages and small business sites.

- 1 site.
- 3GB storage.
- Standard resources.
- Basic backups.
- Basic support.
- No advanced server-setting control.

### Builder

For professional developers and small agencies.

- 1–3 sites or bundled site credits.
- 10GB storage per site.
- Better PHP resources.
- Staging environment.
- Git deployment.
- Safer `.env` setting controls.
- Migration runner UI.
- Priority support.

### Studio

For agencies managing multiple client sites.

- Multiple Bari sites.
- Larger storage pools.
- Team access.
- Role-based permissions.
- Shared pattern/plugin library.
- Advanced backups.
- Faster runtime options.
- Client handoff tools.

### Application

For complex WordPress web applications.

- More compute.
- More storage.
- Advanced caching.
- Queue/background job support.
- Enhanced observability.
- Deployment approvals.
- More granular environment management.
- Dedicated support channel.

## Add-ons

Potential add-ons:

- Extra storage blocks.
- Extra staging environments.
- Premium backup retention.
- CDN/performance package.
- Advanced Redis/object-cache setup.
- Migration assistance.
- Agent-assisted maintenance package.
- White-label agency portal.
- Custom plugin review.
- Security hardening review.

## Storage packaging

The first plan should include exactly **3GB per site**.

Storage should include:

- WordPress uploads.
- Site-specific generated media.
- Site logs only if retained inside the quota.
- Any local backups only if stored in the site account.

Storage should not silently include:

- Platform-level backups.
- Global build caches.
- Internal observability data.

Those should be modeled separately so quotas remain understandable.

## Upgrade logic

Customers should upgrade when they need:

- More storage.
- More traffic/performance.
- More control.
- More environments.
- More sites.
- More collaboration.
- More automation.

## Avoiding pricing traps

Mody Cloud should avoid:

- Unlimited storage.
- Unlimited visits without fair-use definitions.
- Hidden fees for basic SSL.
- Charging for essential security.
- Overcomplicated early pricing.
- Enterprise promises before operational maturity.

## Pricing metrics to track

- Average storage per site.
- Backup storage multiplier.
- Bandwidth per site.
- PHP CPU/memory usage.
- Database size.
- Support time per customer.
- Churn by plan.
- Upgrade triggers.
- Gross margin by tier.
- Cost of agent-assisted services.

