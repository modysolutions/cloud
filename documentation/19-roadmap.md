# 10 — Roadmap

## Roadmap principle

Mody Cloud should grow in phases. The first goal is operational reliability for a simple hosted Bari site. More control, speed, storage, automation, and ecosystem features should come after the core hosting loop is stable.

## Phase 0 — Business and technical definition

Deliverables:

- Mody Cloud product definition.
- Bari baseline hosting requirements.
- Initial pricing assumptions.
- Support boundaries.
- Security model.
- Provisioning architecture.
- Storage quota model.
- Backup policy.

Exit criteria:

- Clear MVP scope.
- Known operational risks.
- Initial infrastructure cost model.
- Internal demo site provisioned.

## Phase 1 — Private alpha

Goal: host real Bari sites for trusted users.

Features:

- Manual/semi-automated site provisioning.
- One plan: 1 site, 3GB storage.
- Fresh Bari stack per site.
- Managed domain/SSL flow.
- Basic backups.
- Basic monitoring.
- Internal support tooling.
- Documentation for early developers.

Exit criteria:

- Multiple live sites running.
- Provisioning process repeatable.
- Backup/restore tested.
- Support load understood.
- Storage usage measured.

## Phase 2 — Public beta

Goal: launch self-service basics.

Features:

- Public marketing site.
- Account signup.
- Billing integration.
- Self-service site creation.
- Basic dashboard.
- Storage usage display.
- WordPress admin access flow.
- Basic support/ticket flow.
- Knowledge base.

Exit criteria:

- Customers can subscribe without manual intervention.
- Site creation succeeds reliably.
- Billing works.
- Support process is manageable.

## Phase 3 — Developer workflow layer

Goal: make Mody Cloud clearly better for developers than generic hosting.

Features:

- Git deployment flow.
- Staging environments.
- WP-CLI task interface or controlled command runner.
- Migration status and runner UI.
- Build status for frontend assets.
- Developer documentation per site.
- Agent-ready context pack generation.

Exit criteria:

- Developers can build and deploy repeatably.
- Staging reduces production risk.
- Agent workflows produce measurable time savings.

## Phase 4 — Control panel and environment management

Goal: expose safe server/project controls.

Features:

- Validated `.env` management UI.
- Plan-aware memory/upload/storage settings.
- SMTP configuration UI.
- Cache configuration UI.
- Domain redirect controls.
- Environment setting audit logs.
- Rollback support for selected settings.

Exit criteria:

- Users can safely change common settings.
- Platform validates changes before applying them.
- Support can audit and rollback setting changes.

## Phase 5 — Performance and storage upgrades

Goal: monetize growth and support larger sites.

Features:

- Storage upgrade packages.
- Performance tiers.
- Redis/object-cache management.
- CDN integration.
- Image optimization workflows.
- Longer backup retention.
- Advanced monitoring.

Exit criteria:

- Clear upgrade path from the 3GB starter plan.
- Improved gross margin on advanced tiers.
- Performance upgrades are measurable.

## Phase 6 — Ecosystem and marketplace

Goal: help developers grow together.

Features:

- Curated Bari pattern library.
- Plugin skeleton generator.
- Native block examples.
- Agent workflow templates.
- Developer directory.
- Partner/agency profiles.
- Curated marketplace for Bari-compatible assets.

Exit criteria:

- Developers reuse ecosystem assets.
- Marketplace quality standards are enforced.
- Community contributes to Bari-compatible patterns and plugins.

## Phase 7 — Advanced application platform

Goal: support complex WordPress applications.

Features:

- Queues/background jobs.
- Enhanced database tooling.
- Application-level observability.
- Deployment approvals.
- Team permissions.
- Advanced access logs.
- Enterprise backup/restore policies.
- Dedicated support options.

Exit criteria:

- Mody Cloud can host more than brochure sites.
- Complex applications can scale without leaving the Bari ecosystem.

## Near-term priority order

1. Reliable provisioning.
2. Storage quota enforcement.
3. Backup/restore confidence.
4. Basic monitoring.
5. Clear documentation.
6. Initial billing.
7. Developer dashboard.
8. Agent-ready site context.
9. Staging.
10. Safe `.env` controls.

