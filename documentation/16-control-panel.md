# 07 — Control Panel and Environment Management

## Product direction

Mody Cloud should eventually provide a control panel where developers can manage selected server and WordPress settings without needing raw server access.

The control panel should expose power progressively. The MVP can start with simple hosting and later add safe `.env` management, plan-aware resource controls, staging settings, and observability.

## Why `.env` management matters

Bari is environment-driven. Important settings are controlled through variables such as:

- Site domain.
- WordPress environment type.
- Debug flags.
- Database credentials.
- WordPress table prefix.
- Memory limits.
- SMTP settings.
- SSL/admin behavior.
- Cron behavior.
- Cache/performance flags.
- Default theme.

A Mody Cloud interface can make these settings safer and more understandable than manual file edits.

## Design principle

The UI should not simply expose raw `.env` editing. It should provide validated controls backed by environment variables.

Example:

- User sees: “WordPress Debug Log: Enabled/Disabled”.
- Platform stores: `WORDPRESS_DEBUG_LOG` with a safe value.
- Platform validates: allowed values, environment, plan, and deployment impact.
- Platform records: who changed it, when, and why.

## MVP control panel

Initial account/site panel:

- Site name.
- Primary domain.
- Storage usage out of 3GB.
- WordPress admin link.
- Basic health status.
- Backup status.
- Plan details.
- Support link.

## Future environment controls

### Safe basic settings

- Site title.
- Environment type.
- Debug mode for staging.
- Debug log visibility.
- SMTP host/port/provider.
- Admin SSL enforcement.
- WordPress cron behavior.

### Resource settings

- PHP memory limit within plan boundaries.
- Upload size limit within plan boundaries.
- Storage upgrades.
- Cache toggles.
- Redis/object-cache status.

### Deployment settings

- Staging vs production variables.
- Maintenance mode.
- Git branch/environment mapping.
- Build command status.
- Migration execution controls.

### Domain and SSL settings

- Primary domain.
- Additional domains.
- SSL certificate status.
- Redirect behavior.
- WWW/non-WWW preference.

## Sensitive settings

The platform should hide or heavily restrict:

- Database passwords.
- Authentication salts.
- Private package credentials.
- API keys.
- SMTP passwords.
- Private keys.
- Internal infrastructure identifiers.

Sensitive values should be write-only or masked where appropriate.

## Audit trail

Every control panel change should log:

- Account.
- User.
- Site.
- Setting changed.
- Previous safe representation.
- New safe representation.
- Timestamp.
- Deployment/restart impact.
- Rollback availability.

## Validation rules

All setting changes should be:

- Validated by type.
- Checked against plan limits.
- Checked against environment restrictions.
- Applied through controlled jobs.
- Reversible where practical.
- Tested with a health check after application.

## Developer experience

Advanced users should be able to understand which Bari variable a UI setting maps to. The panel can show a “developer details” drawer with:

- Variable name.
- Current effective value or masked value.
- Description.
- Allowed values.
- Requires restart: yes/no.
- Applies to staging/production.

## Long-term vision

The control panel should become the bridge between managed hosting simplicity and developer-level control. Users should feel they can grow from a simple subscription into a serious WordPress application platform without leaving Mody Cloud.

