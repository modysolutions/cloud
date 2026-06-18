# Mody Cloud — Documentation

_Last reviewed: 2026-06-18_

This directory is the single source of truth for **all Mody Cloud documentation** — technical, product, and business. Mody Cloud is a Barí-powered WordPress hosting and developer platform. It is a founding sponsor of the [Barí WordPress framework](https://github.com/bariwp/bari) and uses Barí as its canonical project runtime and development baseline.

Every document here is maintained as a living reference for developers, contributors, and automated agents working in this repository.

---

## Part 1 — Technical Reference (Stack & Development)

These documents cover how the Mody Cloud project is built, run, and extended locally using the Barí stack.

| File | Purpose |
|---|---|
| [01 — Architecture](01-architecture.md) | Full directory map and architectural decisions for the Mody Cloud project. |
| [02 — Infrastructure](02-infrastructure.md) | Docker services, Dockerfile, Nginx, and PHP configuration. |
| [03 — Environment Variables](03-environment.md) | Complete `.env` variable reference. |
| [04 — Quick Start](04-quick-start.md) | Step-by-step guide to running Mody Cloud locally. |
| [05 — CLI Scripts](05-cli-scripts.md) | Documentation for all `bin/` scripts. |
| [06 — PHP & WordPress](06-php-wordpress.md) | Composer setup, plugin dependencies, core isolation, and the `bari-cli` plugin. |
| [07 — Theme Development](07-theme.md) | Gutenberg-native theme architecture, block templates, `theme.json`, hook classes, and patterns. |
| [08 — Frontend Build](08-frontend-build.md) | Webpack, SCSS structure, entry points, and compiled output. |
| [09 — Known Issues](09-known-issues.md) | Log of resolved issues and current known issues. |
| [Coding Standards](coding-standards.md) | PHP, plugin, asset, REST/AJAX, database, and security standards. |
| [Plugin Development](plugin-development.md) | Rules and skeleton for creating new custom plugins. |
| [Tech Debt](tech-debt.md) | Concrete bugs, known issues, modernization work, and update recommendations. |
| [**Current Status**](current-status.md) | **Where the project stands today relative to the roadmap. Updated as milestones are reached.** |

---

## Part 2 — Product & Business (Mody Cloud Platform)

These documents define the Mody Cloud product vision, platform architecture, go-to-market strategy, and business model. They provide the context that makes technical decisions meaningful.

| File | Purpose |
|---|---|
| [10 — Business Vision](10-business-vision.md) | Vision, mission, positioning, and strategic principles. |
| [11 — Product Offer](11-product-offer.md) | Initial hosting subscription, the "virgin Barí stack", and future product tiers. |
| [12 — Platform Architecture](12-platform-architecture.md) | How Mody Cloud uses Barí as the technical foundation for a managed hosting platform. |
| [13 — Pricing & Packaging](13-pricing-and-packaging.md) | Pricing philosophy, tier design, resource limits, and upgrade paths. |
| [14 — Developer Ecosystem](14-developer-ecosystem.md) | Community, marketplace, templates, patterns, plugins, and developer growth programs. |
| [15 — Agent-First Development](15-agent-first-development.md) | Agent-assisted workflows, guardrails, and platform features enabled by Barí conventions. |
| [16 — Control Panel & Env Management](16-control-panel.md) | Future control panel design and safe `.env`/server-setting management. |
| [17 — Operations & Support](17-operations-and-support.md) | Operational model, support boundaries, backups, incidents, and maintenance. |
| [18 — Go To Market](18-go-to-market.md) | Audience, positioning, launch phases, channels, and content strategy. |
| [19 — Roadmap](19-roadmap.md) | Phased product roadmap from MVP to ecosystem. |
| [20 — Security & Trust](20-security-and-trust.md) | Security principles, site isolation, access control, data handling, and trust model. |
| [21 — Business Model](21-business-model.md) | Revenue streams, unit economics, expansion levers, risks, and north-star metrics. |

---

## High-level Stack Summary

Mody Cloud runs on the Barí WordPress stack:

- **Runtime:** Nginx + PHP-FPM WordPress image + MariaDB + Redis + Mailpit.
- **WordPress layout:** Core in `app/wp`; custom content in `app/web`, wired via `WP_CONTENT_DIR`/`WP_CONTENT_URL` in `app/wp-config.php`.
- **Dependency management:** PHP dependencies from `app/composer.json` into `app/vendor`; plugins/themes via Composer installer paths into `app/web/plugins` and `app/web/themes`.
- **Theme:** Gutenberg-native block theme using `theme.json`, block templates, and template parts.
- **Timber/Twig:** Installed globally through Composer for plugin SSR use cases; not the primary theme renderer.
- **Barí CLI:** The `bari-cli` plugin provides WP-CLI commands for database migrations and Gutenberg block pattern management.

---

## North Star

> Mody Cloud helps WordPress developers grow together by making modern, agent-first WordPress development repeatable, hosted, collaborative, and commercially viable.

---

## Source-of-truth priority

When documentation and source disagree, use this order:

1. Current source files in the repository.
2. `compose.yml`, `sample.env`, `wp-cli.yml`, `app/composer.json`, `app/wp-config.php`, `config/**`, `bin/**`.
3. Documents in this `documentation/` directory.
4. Older prose in `readme.md` or stale comments.

## Documentation Maintenance Rules

- Update documentation whenever a service, environment variable, build tool, custom plugin, block pattern, or workflow changes.
- When adding or changing product/platform features, update the relevant Part 2 document as well.
- Document verified behavior separately from intended behavior.
- Do not document secrets from `.env`; refer to variable names only.
- See `AGENTS.md` at the project root for the authoritative source of rules for automated agents.
