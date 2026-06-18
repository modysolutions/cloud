# 06 — Agent-First Development

## What “agent-first” means

Mody Cloud should treat AI agents as first-class collaborators in WordPress development. This does not mean agents replace developers. It means Bari projects are structured so agents can safely accelerate routine work, documentation, maintenance, debugging, and feature implementation.

Agent-first development requires:

- Predictable file structure.
- Clear coding standards.
- Documented architecture.
- Safe edit boundaries.
- Repeatable validation commands.
- Strong separation between theme presentation and plugin business logic.
- Explicit security rules.
- Source-of-truth documentation such as `AGENTS.md`.

## Why Bari enables this

Bari is naturally agent-friendly because it defines:

- Where WordPress core lives.
- Where public content lives.
- Where the custom theme lives.
- Where custom plugins should live.
- How frontend assets are built.
- How migrations are created and run.
- How Composer dependencies are managed.
- How WP-CLI commands are executed.
- Which files should not be edited directly.
- How changes should be validated.

This reduces ambiguity, which is one of the biggest risks when agents work in WordPress repositories.

## Agent-assisted workflows

### Project setup

Agents can help:

- Explain the Bari structure.
- Generate project documentation.
- Create plugin skeletons.
- Add safe environment variable documentation.
- Prepare onboarding checklists.

### Theme development

Agents can help:

- Edit Gutenberg block templates.
- Create block patterns.
- Adjust `theme.json` presets.
- Create style variations.
- Keep frontend/editor parity in mind.

Agents should not convert the theme to Twig-first rendering or move business logic into templates.

### Plugin development

Agents can help:

- Scaffold custom plugins.
- Register CPTs and taxonomies.
- Add REST routes with permission callbacks.
- Create migrations.
- Prepare server-rendered templates when plugin SSR is appropriate.
- Enqueue plugin assets through WordPress APIs.

### Maintenance

Agents can help:

- Inspect logs.
- Summarize changes.
- Update documentation.
- Find stale architecture references.
- Review security checklists.
- Prepare release notes.
- Identify missing validation steps.

### Customer support

Agents can help support teams:

- Triage common WordPress issues.
- Explain plan limits.
- Generate safe debugging checklists.
- Summarize incident timelines.
- Draft customer-facing responses.

## Platform features for agents

Future Mody Cloud features could include:

- Site-aware agent context packs.
- One-click “explain this site” summaries.
- Safe maintenance task runners.
- Automated documentation refreshes.
- Plugin scaffolding assistants.
- Migration review assistants.
- Security checklist assistants.
- Release note generation.
- Support ticket summarization.

## Guardrails

Agent-first does not mean uncontrolled automation.

Required guardrails:

- Never expose secrets to agents unnecessarily.
- Restrict production write actions.
- Require human approval for destructive changes.
- Require validation before deployment.
- Log agent actions.
- Define safe editable areas.
- Prevent edits to WordPress core, vendor code, and third-party plugins.
- Require capability and nonce checks for generated admin/AJAX code.
- Require REST permission callbacks.

## Business advantage

Agent-first Bari hosting can reduce delivery time because:

- Every site starts from a known architecture.
- Agents can reuse the same project mental model.
- Developers spend less time explaining structure.
- Maintenance tasks become more repeatable.
- Documentation becomes a living operational asset.

This is a core differentiator for Mody Cloud.

