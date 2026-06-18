# 08 — Operations and Support

## Operational goal

Mody Cloud should provide managed WordPress hosting without hiding the engineering reality from developers. Operations should be reliable, transparent, and designed around Bari conventions.

## MVP operations scope

For the first launch, operations should cover:

- Site provisioning.
- Domain/SSL setup.
- WordPress installation.
- Storage quota tracking.
- Basic backups.
- Basic restore workflow.
- Uptime checks.
- Runtime logs for internal support.
- Platform-level updates to the Bari baseline.
- Support for issues within the managed stack.

## Support boundaries

### Supported

- Mody Cloud account and billing issues.
- Provisioning failures.
- SSL/domain issues within supported configurations.
- Runtime availability.
- Storage quota questions.
- Backup/restore requests.
- Bari baseline issues.
- Platform-managed environment setting issues.

### Best-effort or paid support

- Debugging custom plugins.
- Debugging third-party plugin conflicts.
- Performance tuning for complex sites.
- Custom migrations.
- Site cleanup after customer-introduced errors.
- Agent-assisted custom development.

### Not supported by default

- Editing WordPress core.
- Patching third-party plugin code directly.
- Supporting abandoned/insecure plugins.
- Unlimited custom application debugging under a basic hosting plan.
- Restoring data that was intentionally deleted outside backup retention.

## Backups

The MVP should define a clear backup policy before launch.

Minimum suggested policy:

- Daily automated backups.
- Backup includes database and uploads.
- Retention period based on plan.
- Restore available through support initially.
- Future self-service restore UI.

Questions to resolve before launch:

- Are backups counted against the 3GB site quota? Prefer no; count them as platform backup storage.
- What is the retention period for Starter?
- Are on-demand backups available?
- How are failed backups surfaced?

## Monitoring

MVP monitoring should include:

- Site HTTP availability.
- SSL certificate status.
- Storage quota threshold.
- Database connectivity.
- Runtime container/process health.
- Backup success/failure.

Future monitoring:

- PHP error rate.
- Slow requests.
- Cache hit rate.
- Database size growth.
- WordPress cron status.
- Plugin/theme update status.
- Security event signals.

## Incident response

Incident process:

1. Detect issue.
2. Classify severity.
3. Identify affected sites/accounts.
4. Mitigate immediate impact.
5. Communicate status to affected customers.
6. Restore service.
7. Write internal incident summary.
8. Add prevention tasks to roadmap.

## Maintenance windows

Maintenance should be communicated clearly.

Maintenance types:

- Platform infrastructure updates.
- Bari baseline updates.
- Security patches.
- Database maintenance.
- Storage maintenance.
- Control panel deployments.

## Updates

Mody Cloud should distinguish:

- Platform updates managed by Mody.
- Bari baseline updates.
- WordPress core updates.
- Composer dependency updates.
- Third-party plugin/theme updates.
- Customer custom code updates.

Automatic updates should be conservative at first. Developer control and staging validation should be added before aggressively automating customer-site changes.

## Support tooling

Support team should have safe tools for:

- Viewing site metadata.
- Viewing plan limits.
- Checking storage usage.
- Triggering backups.
- Triggering restores.
- Viewing masked environment settings.
- Running health checks.
- Reading scoped logs.
- Recording support actions.

Support tooling should never require exposing raw secrets to support staff by default.

