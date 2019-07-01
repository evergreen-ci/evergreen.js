import { plainToClass } from "class-transformer";

// current as of 1370c53df007bf03b6d297a0a1e01b63843b08c7
export function ConvertToAdminSettings(raw: string): AdminSettings {
    return plainToClass(AdminSettings, JSON.parse(raw) as object);
}

export function ConvertToPatches(raw: string): Patches {
    return plainToClass(Patches, JSON.parse(raw) as object);
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

export class Patches {
    public VersionsMap?: Record<string, UIVersion>;
    public UIPatches?: UIPatch[];
    public PageNum?: number;
}

export class UIVersion {
    public Version?: Version;
    public Builds?: UIBuild[];
    public PatchInfo?: UIPatch;
    public active_tasks?: number;
    public repo_owner?: string;
    public repo_name?: string;
    public upstream?: UIUpstreamData;
}

export class UIBuild {
    public Build?: Build;
    public Version?: Version;
    public PatchInfo?: UIPatch;
    public Tasks?: UITask[];
    public Elapsed?: number;
    public CurrentTime?: number;
    public repo_owner?: string;
    public repo_name?: string;
    public taskStatusCount?: TaskStatusCount;
    public UpstreamData?: UIUpstreamData;
}

export class TaskStatusCount {
    public succeeded?: number;
    public failed?: number;
    public started?: number;
    public undispatched?: number;
    public inactive?: number;
    public dispatched?: number;
    public timed_out?: number;
}

export class UITask {
    public Task?: Task;
    public Gitspec?: string;
    public BuildDisplay?: string;
    public TaskLog?: LogMessage[];
    public NextTasks?: Task[];
    public PreviousTasks?: Task[];
    public Elapsed?: number;
    public StartTime?: number;
    public failed_test_names?: string[];
    public expected_duration?: number;
}

export class Task {

}

export class LogMessage {
    public t?: string;
    public s?: string;
    public m?: string;
    public ts?: Time;
    public v?: number;
}

export class UIPatch {
    public Patch?: Patch;
    public StatusDiffs?: object;
    public base_time_taken?: number;
    public BaseVersionId?: string;
    public BaseBuildId?: string;
    public BaseTaskId?: string;
}

export class UIUpstreamData {
    public owner?: string;
    public repo: string;
    public revision?: string;
    public project_name?: string;
    public trigger_id?: string;
    public trigger_type?: string;
}

export class Version {
    public _id?: string;
    public create_time?: Time;
    public start_time?: Time;
    public finish_time?: Time;
    public gitspec?: string;
    public author?: string;
    public author_email?: string;
    public message?: string;
    public status?: string;
    public order?: number;
    public config?: string;
    public ignored?: boolean;
    public owner_name?: string;
    public repo_name?: string;
    public branch_name?: string;
    public repo_kind?: string;
    public build_variants_status?: VersionBuildStatus[];
    public builds?: string[];
    public identifier?: string;
    public remote?: boolean;
    public remote_path?: string;
    public requester?: string;
    public errors?: string[];
    public warnings?: string[];
    public author_id?: string;
    public satisfied_triggers?: string[];
    public trigger_id?: string;
    public trigger_type?: string;
    public trigger_event?: string;
}

class Build {
	_id: string;
	create_time: Date;
	start_time: Date;
	finish_time: Date;
	version: string;
	branch: string;
	gitspec: string;
	build_variant: string;
	build_number: string;
	status: string;
	activated: boolean;
	activated_by: string;
	activated_time: Date;
	order: number;
	tasks: BuildTaskCache[];
	time_taken: number;
	display_name: string;
	predicted_makespan: number;
	actual_makespan: number;
	r: string;
	trigger_id: string;
	trigger_type: string;
	trigger_event: string;
}

export class BuildTaskCache {
  
}

export class VersionBuildStatus {

}

export class Patch {
    public Id?: string;
    public Description?: string;
    public Project?: string;
    public Githash?: string;
    public PatchNumber?: number;
    public Author?: string;
    public Version?: string;
    public Status?: string;
    public CreateTime?: Time;
    public StartTime?: Time;
    public FinishTime?: Time;
    public BuildVariants?: string[];
    public Tasks?: string[];
    public VariantTasks?: VariantTasks[];
    public Patches?: ModulePatch[];
    public Activated?: boolean;
    public PatchedConfig?: string;
    public Alias?: string;
    public GithubPatchData?: GithubPatch;
}

export class Time {
    public wall?: number;
    public ext?: number;
    public loc?: Location;
}

export class GithubPatch {
    public pr_number?: number;
    public base_owner?: string;
    public base_repo?: string;
    public base_branch?: string;
    public head_owner?: string;
    public head_repo?: string;
    public head_hash?: string;
    public author?: string;
    public author_uid?: number;
    public merge_commit_sha?: string;
}

export class ModulePatch {
    public name?: string;
    public githash?: string;
    public patch_set?: PatchSet;
}

export class PatchSet {
    public patch?: string;
    public patch_file_id?: string;
    public summary?: Summary[];
}

export class Summary {
    public filename?: string;
    public additions?: number;
    public deletions?: number;
}

export class VariantTasks {
    public Variant?: string;
    public Tasks?: string[];
    public DisplayTasks?: DisplayTask[];
}

export class DisplayTask {
    public Name?: string;
    public ExecTasks?: string[];
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
