# Current Status

_Last reviewed: 2026-06-18_

This document summarises where the Mody Cloud project stands today relative to the roadmap defined in [`19-roadmap.md`](19-roadmap.md). It should be updated whenever a phase milestone is reached or a significant deliverable changes state.

---

## Active phase

### ✅ Phase 0 — Business and technical definition

We are in the **final stage of Phase 0**. The business definition, product vision, platform architecture, pricing assumptions, support model, security model, and technical stack are all fully documented. The Barí-powered local development environment is functional and validated. Most Phase 0 deliverables are complete; the remaining exit criteria are operational (requiring infrastructure provisioning, not more documentation).

---

## Phase 0 deliverables

| Deliverable | Status | Reference |
|---|---|---|
| Mody Cloud product definition | ✅ Complete | [`10-business-vision.md`](10-business-vision.md) |
| Barí baseline hosting requirements | ✅ Complete | [`12-platform-architecture.md`](12-platform-architecture.md) |
| Initial pricing assumptions | ✅ Complete | [`13-pricing-and-packaging.md`](13-pricing-and-packaging.md) |
| Support boundaries | ✅ Complete | [`17-operations-and-support.md`](17-operations-and-support.md) |
| Security model | ✅ Complete | [`20-security-and-trust.md`](20-security-and-trust.md) |
| Provisioning architecture | ✅ Complete | [`12-platform-architecture.md`](12-platform-architecture.md) |
| Storage quota model | ✅ Complete | [`13-pricing-and-packaging.md`](13-pricing-and-packaging.md) |
| Backup policy (design) | ✅ Complete | [`17-operations-and-support.md`](17-operations-and-support.md) |
| Agent-first documentation (`AGENTS.md`) | ✅ Complete | [`AGENTS.md`](../AGENTS.md) |
| Full technical documentation | ✅ Complete | [`documentation/`](README.md) |
| Go-to-market strategy | ✅ Complete | [`18-go-to-market.md`](18-go-to-market.md) |
| Business model | ✅ Complete | [`21-business-model.md`](21-business-model.md) |
| Developer ecosystem plan | ✅ Complete | [`14-developer-ecosystem.md`](14-developer-ecosystem.md) |
| Roadmap | ✅ Complete | [`19-roadmap.md`](19-roadmap.md) |

---

## Phase 0 exit criteria

| Criterion | Status | Notes |
|---|---|---|
| Clear MVP scope | ✅ Met | Defined in [`11-product-offer.md`](11-product-offer.md) and [`13-pricing-and-packaging.md`](13-pricing-and-packaging.md) |
| Known operational risks | ✅ Met | Documented in [`21-business-model.md`](21-business-model.md) and [`20-security-and-trust.md`](20-security-and-trust.md) |
| Initial infrastructure cost model | ⚠️ Partial | Revenue/cost drivers listed in [`21-business-model.md`](21-business-model.md); actual per-site cost figures require infrastructure provisioning tests |
| Internal demo site provisioned | ⚠️ Pending | Local Barí stack is fully functional; a hosted production demo has not yet been provisioned |

---

## What is working today

- **Local development stack** — fully functional. `./bin/install` provisions a complete Barí-powered WordPress environment locally in one command.
- **WordPress core** — isolated in `app/wp/`, running version 7.0.
- **Gutenberg-native theme** — in `app/web/themes/theme/` with `theme.json`, block templates, template parts, hook classes, and frontend build pipeline.
- **`bari-cli` plugin** — fully implemented with `wp migration` and `wp pattern` command groups.
- **Frontend build pipeline** — `@wordpress/scripts` + custom Webpack config, compiling from `src/` to `app/dist/`.
- **Composer dependency management** — WPackagist, production plugins (Yoast, EWWW, Spectra/UAGB, etc.), and dev tools (Query Monitor, Pint).
- **Documentation** — complete, merged, and structured across 25 files covering both technical and product/business domains.
- **`AGENTS.md`** — authoritative agent source of truth in place.

---

## What does not exist yet

These are Phase 1+ features — they are designed and documented but not yet built:

- Hosted production infrastructure (servers, networking, SSL provisioning).
- Multi-tenant site isolation and database separation.
- Automated site provisioning pipeline.
- Billing integration (Stripe or equivalent).
- Customer dashboard / control panel.
- `.env` management UI.
- Backup automation system.
- Uptime monitoring.
- Staging environments.
- Git-based deployment.

---

## Immediate next actions to exit Phase 0

1. **Provision a hosted internal demo site** — deploy one Barí site to a real server (VPS or cloud) to validate the production runtime model and measure actual infrastructure costs.
2. **Establish per-site cost baseline** — record compute, database, storage, and bandwidth costs for one live site to complete the unit economics model.
3. **Define infrastructure provider** — select VPS/cloud provider and document the production hosting architecture.

Once the demo site is live and costs are measured, Phase 0 exit criteria are fully met and **Phase 1 (Private Alpha)** can begin.

---

## Entry into Phase 1 — Private Alpha

Phase 1 goal: host real Barí sites for trusted users.

Minimum required to start Phase 1:

- [ ] At least one successfully hosted internal Barí site.
- [ ] Reproducible provisioning process (even if partially manual).
- [ ] Backup/restore tested on real hosted data.
- [ ] Infrastructure cost per site measured.
- [ ] Basic monitoring in place (uptime check).
- [ ] Support process defined (even if just email/chat).

See [`19-roadmap.md`](19-roadmap.md) for the full Phase 1 feature list and exit criteria.

