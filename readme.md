# Mody Cloud

> Mody Cloud helps WordPress developers grow together by making modern, agent-first WordPress development repeatable, hosted, collaborative, and commercially viable.

Mody Cloud is a **Barí-powered WordPress hosting and developer platform**. It is designed for WordPress developers, small agencies, product builders, and businesses that want modern development workflows without abandoning WordPress. Mody Cloud is a founding sponsor of the [Barí WordPress framework](https://github.com/bariwp/bari) and uses Barí as its canonical project runtime and development baseline.

---

## What Mody Cloud is

Mody Cloud is not just "another WordPress host." It is a Barí-powered development ecosystem where:

- WordPress projects begin from a clean, modern, reproducible stack.
- Developers rely on predictable project structure enforced by the Barí framework.
- Gutenberg-native themes are treated as first-class architecture.
- Business logic belongs in plugins, not fragile theme hacks.
- AI agents can understand the codebase faster because conventions are documented.
- Hosting, development, and delivery workflows converge into one coherent platform.

### The Barí foundation

Every Mody Cloud project is a fresh **[Barí](https://github.com/bariwp/bari)** stack — a self-contained, Docker-based WordPress project framework:

| Layer | What it provides |
|---|---|
| **Nginx** | Reverse proxy, HTTPS, URL rewrites for isolated WP core, and transparent uploads proxy for local dev |
| **PHP-FPM** | Custom WordPress image with WP-CLI, Composer, Xdebug, Redis, and image processing pre-installed |
| **MariaDB** | Relational database, fully configured via environment variables |
| **Redis** | Available for WordPress object caching |
| **Mailpit** | Captures all outgoing email during development — nothing leaks to real inboxes |
| **`bari-cli` plugin** | WP-CLI commands for database migrations and Gutenberg block pattern management |

All configuration — database credentials, WordPress constants, SMTP, memory limits, debug flags — is injected via a `.env` file. No hardcoded configuration in the codebase.

---

## Repository structure

```
mody.cloud/
├── app/                   # WordPress application root
│   ├── wp/                # WordPress core (isolated, Bedrock-like)
│   ├── web/               # Public content root
│   │   ├── themes/theme/  # Gutenberg-native custom theme
│   │   └── plugins/       # Composer-managed + custom plugins
│   ├── composer.json      # PHP dependency manifest
│   └── wp-config.php      # WordPress configuration bootstrap
├── bin/                   # CLI proxy scripts (install, wp, composer, certs, version…)
├── config/                # Docker, Nginx, PHP, SSL, Webpack configuration
├── src/                   # Frontend JS/SCSS source → compiled to app/dist/
├── documentation/         # All project documentation (technical + product/business)
├── compose.yml            # Docker Compose service orchestration
├── package.json           # pnpm + @wordpress/scripts build scripts
├── sample.env             # Environment variable template
├── AGENTS.md              # Source of truth for automated agents
└── readme.md              # This file
```

---

## Quick start (local development)

```bash
# 1. Clone and configure
cp sample.env .env
# Edit .env: set SITE_NAME, HOST_NAME, APP_DOMAINS, admin credentials

# 2. Provision the full stack
./bin/install
```

After install:

| URL | Content |
|---|---|
| `https://mody.local` | Mody Cloud WordPress site |
| `https://mody.local/wp/wp-admin/` | WordPress admin |
| `https://mail.mody.local` | Mailpit email UI |

### Daily workflow

```bash
./bin/start                   # Start containers (no rebuild)
./bin/wp plugin list          # Run WP-CLI commands
./bin/wp migration migrate    # Run pending database migrations
./bin/composer require pkg    # Install PHP packages via Composer
pnpm start                    # Frontend — watch mode
pnpm build                    # Frontend — production build
```

See [`documentation/04-quick-start.md`](documentation/04-quick-start.md) for the full setup guide.

---

## The Gutenberg-native theme

The Mody Cloud theme (`app/web/themes/theme/`) is a **Gutenberg-native block theme**:

- **`theme.json`** — Design system source of truth: color palette, typography, layout widths, block styles, and style variation foundations.
- **`templates/*.html`** — Block templates owning the page shell (`index`, `page`, `single`, `archive`, `home`, `search`, `404`).
- **`parts/*.html`** — Reusable template parts (`header`, `footer`, `sidebar`).
- **Hook classes** (`App\Hooks\*`) — OOP PHP classes for theme supports, asset enqueuing, editor setup, security, and Timber/Twig compatibility.

Timber/Twig is available globally through Composer for plugin-owned server-rendered views. It is not the primary theme rendering model.

See [`documentation/07-theme.md`](documentation/07-theme.md) for the full theme architecture guide.

---

## The `bari-cli` plugin

The `app/web/plugins/bari-cli/` plugin provides two WP-CLI command groups via `./bin/wp`:

### Database migrations

```bash
./bin/wp migration create "create orders table"
./bin/wp migration migrate
./bin/wp migration rollback
./bin/wp migration status
```

### Gutenberg block pattern management

```bash
./bin/wp pattern create sections/hero
./bin/wp pattern export 42 sections/hero --title="Hero – Full Width"
./bin/wp pattern list
```

See [`documentation/06-php-wordpress.md`](documentation/06-php-wordpress.md) for full details.

---

## Mody Cloud product roadmap

Mody Cloud is currently in **Phase 0 — Business and technical definition**. The product will grow in phases:

| Phase | Goal |
|---|---|
| 0 | Business/technical definition and internal demo (current) |
| 1 | Private alpha — trusted developers, manual provisioning |
| 2 | Public beta — self-service signup, billing, basic dashboard |
| 3 | Developer workflow layer — Git deploy, staging, WP-CLI UI, agent context |
| 4 | Control panel — validated `.env` management, resource controls |
| 5 | Performance & storage upgrades |
| 6 | Ecosystem & marketplace — patterns, plugin skeletons, community |
| 7 | Advanced application platform |

See [`documentation/19-roadmap.md`](documentation/19-roadmap.md) for the full roadmap.

---

## Documentation

All documentation lives in [`documentation/`](documentation/README.md), organized into two parts:

**Part 1 — Technical:** Architecture, infrastructure, environment, quick start, CLI scripts, PHP/WordPress layer, theme, frontend build, coding standards, plugin development, known issues, tech debt.

**Part 2 — Product/Business:** Business vision, product offer, platform architecture, pricing, developer ecosystem, agent-first development, control panel, operations, go-to-market, roadmap, security and trust, business model.

→ **[Open the full documentation index](documentation/README.md)**

---

## Agents

This project is **agent-first**. The Barí framework's documented, predictable structure means AI agents can safely accelerate routine work — documentation, plugin scaffolding, migrations, maintenance, debugging, and feature implementation — without guessing project conventions.

→ **[`AGENTS.md`](AGENTS.md)** is the authoritative source of rules for all automated agents working in this repository.

---

## Target customers

- Freelance WordPress developers.
- Small WordPress agencies.
- Designers who collaborate with developers.
- Technical founders shipping WordPress-based MVPs.
- Businesses that need a controlled WordPress stack without full DevOps overhead.
- AI-assisted development teams that need predictable project conventions.

---

## License

GPL-2.0-or-later. Free to use, modify, and redistribute. The Barí framework is open source; Mody Cloud is the hosted platform and commercial ecosystem built on top of it.
