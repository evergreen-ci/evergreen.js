import { plainToClass } from "class-transformer";

// current as of 1370c53df007bf03b6d297a0a1e01b63843b08c7
export function ConvertToAdminSettings(raw: string): AdminSettings {
    return plainToClass(AdminSettings, JSON.parse(raw) as object);
}

/* tslint:disable:variable-name */
export class AdminSettings {
    public alerts?: AlertsConfig;
    public amboy?: AmboyConfig;
    public api?: APIConfig;
    public api_url?: string;
    public auth?: AuthConfig;
    public banner?: string;
    public banner_theme?: string;
    public client_binaries_dir?: string;
    public configdir?: string;
    public container_pools?: ContainerPools;
    public credentials?: object;
    public jasper?: JasperConfig;
    public expansions?: object;
    public google_analytics?: string;
    public github_pr_creator_org?: string;
    public hostinit?: HostInitConfig;
    public jira?: JiraConfig;
    public jira_notifications?: JiraNotificationsConfig;
    public keys?: object;
    public logger_config?: LoggerConfig;
    public log_path?: string;
    public notify?: NotifyConfig;
    public plugins?: object;
    public pprof_port?: string;
    public providers?: CloudProviders;
    public repotracker?: RepoTrackerConfig;
    public scheduler?: SchedulerConfig;
    public service_flags?: ServiceFlags;
    public slack?: SlackConfig;
    public splunk?: SplunkConnectionInfo;
    public superusers: string[];
    public triggers: TriggerConfig;
    public ui: UIConfig;
}

export class SMTPConfig {
    public server?: string;
    public port: number;
    public use_ssl: boolean;
    public username?: string;
    public password?: string;
    public from?: string;
    public admin_email?: string[];
}

export class AlertsConfig {
    public smtp?: SMTPConfig;
}

export class AmboyConfig {
    public name?: string;
    public single_name?: string;
    public database?: string;
    public pool_size_local: number;
    public pool_size_remote: number;
    public local_storage_size: number;
}

export class APIConfig {
    public http_listen_addr?: string;
    public github_webhook_secret?: string;
}

export class AuthConfig {
    public ldap?: LDAPConfig;
    public naive?: NaiveAuthConfig;
    public github?: GithubAuthConfig;
}

export class LDAPConfig {
    public url?: string;
    public port?: string;
    public path?: string;
    public service_path?: string;
    public group?: string;
    public service_group?: string;
    public expire_after_minutes?: string;
}

export class NaiveAuthConfig {
    public users?: AuthUser[];
}

export class AuthUser {
    public username?: string;
    public display_name?: string;
    public password?: string;
    public email?: string;
}

export class GithubAuthConfig {
    public client_id?: string;
    public client_secret?: string;
    public users?: string[];
    public organization?: string;
}

export class HostInitConfig {
    public ssh_timeout_secs: number;
}

export class JiraConfig {
    public host?: string;
    public username?: string;
    public password?: string;
    public default_project?: string;
}

export class LoggerConfig {
    public buffer?: LogBuffering;
    public default_level?: string;
    public threshold_level?: string;
    public logkeeper_url?: string;
}

export class LogBuffering {
    public duration_seconds: number;
    public count: number;
}

export class NotifyConfig {
    public buffer_target_per_interval: number;
    public buffer_interval_seconds: number;
    public smtp?: SMTPConfig;
}

export class CloudProviders {
    public aws?: AWSConfig;
    public docker?: DockerConfig;
    public gce?: GCEConfig;
    public openstack?: OpenStackConfig;
    public vsphere?: VSphereConfig;
}

export class ContainerPools {
    public pools?: ContainerPool[];
}

export class ContainerPool {
    public distro?: string;
    public id?: string;
    public max_containers: number;
    public port: number;
}

export class AWSConfig {
    public aws_secret?: string;
    public aws_id?: string;
    public s3_key?: string;
    public s3_secret?: string;
    public bucket?: string;
    public s3_base_url?: string;
}

export class DockerConfig {
    public api_version?: string;
}

export class GCEConfig {
    public client_email?: string;
    public private_key?: string;
    public private_key_id?: string;
    public token_uri?: string;
}

export class OpenStackConfig {
    public identity_endpoint?: string;
    public username?: string;
    public password?: string;
    public domain_name?: string;
    public project_name?: string;
    public project_id?: string;
    public region?: string;
}

export class VSphereConfig {
    public host?: string;
    public username?: string;
    public password?: string;
}

export class RepoTrackerConfig {
    public revs_to_fetch: number;
    public max_revs_to_search: number;
    public max_con_requests: number;
}

export class SchedulerConfig {
    public task_finder?: string;
    public host_allocator?: string;
    public free_host_fraction: number;
    public cache_duration_seconds: number;
}

export class ServiceFlags {
    public task_dispatch_disabled: boolean;
    public host_init_disabled: boolean;
    public monitor_disabled: boolean;
    public alerts_disabled: boolean;
    public agent_start_disabled: boolean;
    public repotracker_disabled: boolean;
    public scheduler_disabled: boolean;
    public github_pr_testing_disabled: boolean;
    public cli_updates_disabled: boolean;
    public background_stats_disabled: boolean;
    public task_logging_disabled: boolean;
    public cache_stats_job_disabled: boolean;
    public cache_stats_endpoint_disabled: boolean;
    public commit_queue_disabled: boolean;
    public planner_disabled: boolean;
    public host_allocator_disabled: boolean;
    public event_processing_disabled: boolean;
    public jira_notifications_disabled: boolean;
    public slack_notifications_disabled: boolean;
    public email_notifications_disabled: boolean;
    public webhook_notifications_disabled: boolean;
    public github_status_api_disabled: boolean;
}

export class SlackConfig {
    public options?: SlackOptions;
    public token?: string;
    public level?: string;
}

export class SlackOptions {
    public channel?: string;
    public hostname?: string;
    public name?: string;
    public username?: string;
    public icon_url?: string;
    public add_basic_metadata: boolean;
    public use_fields: boolean;
    public all_fields: boolean;
    public fields: object;
}

export class SplunkConnectionInfo {
    public url?: string;
    public token?: string;
    public channel?: string;
}

export class UIConfig {
    public url?: string;
    public help_url?: string;
    public http_listen_addr?: string;
    public secret?: string;
    public default_project?: string;
    public cache_templates: boolean;
    public csrf_key?: string;
    public cors_origin?: string;
}

export class JiraNotificationsConfig {
    public custom_fields: object;
}

export class TriggerConfig {
    public generate_distro?: string;
}

export class JasperConfig {
    public binary_name?: string;
    public download_file_name?: string;
    public port?: number;
    public url?: string;
    public version?: string;
}
