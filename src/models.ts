import { plainToClass } from 'class-transformer';

// current as of 1370c53df007bf03b6d297a0a1e01b63843b08c7
export namespace models {
    export function ConvertToAdminSettings(raw:object): AdminSettings {
        return  plainToClass(models.AdminSettings, raw);
    }

    export class AdminSettings {
        alerts?: AlertsConfig;
        amboy?: AmboyConfig;
        api?: APIConfig;
        api_url?: string;
        auth?: AuthConfig;
        banner?: string;
        banner_theme?: string;
        client_binaries_dir?: string;
        configdir?: string;
        container_pools?: ContainerPools;
        credentials?: object;
        jasper?: JasperConfig;
        expansions?: object;
        google_analytics?: string;
        github_pr_creator_org?: string;
        hostinit?: HostInitConfig;
        jira?: JiraConfig;
        jira_notifications?: JiraNotificationsConfig;
        keys?: object;
        logger_config?: LoggerConfig;
        log_path?: string;
        notify?: NotifyConfig;
        plugins?: object;
        pprof_port?: string;
        providers?: CloudProviders;
        repotracker?: RepoTrackerConfig;
        scheduler?: SchedulerConfig;
        service_flags?: ServiceFlags;
        slack?: SlackConfig;
        splunk?: SplunkConnectionInfo;
        superusers: string[];
        triggers: TriggerConfig;
        ui: UIConfig;
    }

    export class SMTPConfig {
        server?: string;
        port: number;
        use_ssl: boolean;
        username?: string;
        password?: string;
        from?: string;
        admin_email?: string[];
    }

    export class AlertsConfig {
        smtp?: SMTPConfig;
    }

    export class AmboyConfig {
        name?: string;
        single_name?: string;
        database?: string;
        pool_size_local: number;
        pool_size_remote: number;
        local_storage_size: number;
    }

    export class APIConfig {
        http_listen_addr?: string;
        github_webhook_secret?: string;
    }

    export class AuthConfig {
        ldap?: LDAPConfig;
        naive?: NaiveAuthConfig;
        github?: GithubAuthConfig;
    }

    export class LDAPConfig {
        url?: string;
        port?: string;
        path?: string;
        service_path?: string;
        group?: string;
        service_group?: string;
        expire_after_minutes?: string;
    }

    export class NaiveAuthConfig {
        users?: AuthUser[];
    }

    export class AuthUser {
        username?: string;
        display_name?: string;
        password?: string;
        email?: string;
    }

    export class GithubAuthConfig {
        client_id?: string;
        client_secret?: string;
        users?: string[];
        organization?: string;
    }

    export class HostInitConfig {
        ssh_timeout_secs: number;
    }

    export class JiraConfig {
        host?: string;
        username?: string;
        password?: string;
        default_project?: string;
    }

    export class LoggerConfig {
        buffer?: LogBuffering;
        default_level?: string;
        threshold_level?: string;
        logkeeper_url?: string;
    }

    export class LogBuffering {
        duration_seconds: number;
        count: number;
    }

    export class NotifyConfig {
        buffer_target_per_interval: number;
        buffer_interval_seconds: number;
        smtp?: SMTPConfig;
    }

    export class CloudProviders {
        aws?: AWSConfig;
        docker?: DockerConfig;
        gce?: GCEConfig;
        openstack?: OpenStackConfig;
        vsphere?: VSphereConfig;
    }

    export class ContainerPools {
        pools?: ContainerPool[];
    }

    export class ContainerPool {
        distro?: string;
        id?: string;
        max_containers: number;
        port: number;
    }

    export class AWSConfig {
        aws_secret?: string;
        aws_id?: string;
        s3_key?: string;
        s3_secret?: string;
        bucket?: string;
        s3_base_url?: string;
    }

    export class DockerConfig {
        api_version?: string;
    }

    export class GCEConfig {
        client_email?: string;
        private_key?: string;
        private_key_id?: string;
        token_uri?: string;
    }

    export class OpenStackConfig {
        identity_endpoint?: string;
        username?: string;
        password?: string;
        domain_name?: string;
        project_name?: string;
        project_id?: string;
        region?: string;
    }

    export class VSphereConfig {
        host?: string;
        username?: string;
        password?: string;
    }

    export class RepoTrackerConfig {
        revs_to_fetch: number;
        max_revs_to_search: number;
        max_con_requests: number;
    }

    export class SchedulerConfig {
        task_finder?: string;
        host_allocator?: string;
        free_host_fraction: number;
        cache_duration_seconds: number;
    }

    export class ServiceFlags {
        task_dispatch_disabled: boolean;
        host_init_disabled: boolean;
        monitor_disabled: boolean;
        alerts_disabled: boolean;
        agent_start_disabled: boolean;
        repotracker_disabled: boolean;
        scheduler_disabled: boolean;
        github_pr_testing_disabled: boolean;
        cli_updates_disabled: boolean;
        background_stats_disabled: boolean;
        task_logging_disabled: boolean;
        cache_stats_job_disabled: boolean;
        cache_stats_endpoint_disabled: boolean;
        commit_queue_disabled: boolean;
        planner_disabled: boolean;
        host_allocator_disabled: boolean;
        event_processing_disabled: boolean;
        jira_notifications_disabled: boolean;
        slack_notifications_disabled: boolean;
        email_notifications_disabled: boolean;
        webhook_notifications_disabled: boolean;
        github_status_api_disabled: boolean;
    }

    export class SlackConfig {
        options?: SlackOptions;
        token?: string;
        level?: string;
    }

    export class SlackOptions {
        channel?: string;
        hostname?: string;
        name?: string;
        username?: string;
        icon_url?: string;
        add_basic_metadata: boolean;
        use_fields: boolean;
        all_fields: boolean;
        fields: object;
    }

    export class SplunkConnectionInfo {
        url?: string;
        token?: string;
        channel?: string;
    }

    export class UIConfig {
        url?: string;
        help_url?: string;
        http_listen_addr?: string;
        secret?: string;
        default_project?: string;
        cache_templates: boolean;
        csrf_key?: string;
        cors_origin?: string;
    }

    export class JiraNotificationsConfig {
        custom_fields: object;
    }

    export class TriggerConfig {
        generate_distro?: string;
    }

    export class JasperConfig {
        binary_name?: string;
        download_file_name?: string;
        port?: number;
        url?: string;
        version?: string;
    }
}