import Axios, { AxiosPromise, AxiosRequestConfig, Method } from "axios";
import * as models from "./models";

export class client {
  public username: string;
  public key: string;
  public apiURL: string;
  public uiURL: string;

  constructor(serverURL: string, webURL: string, username?: string, key?: string) {
    this.apiURL = serverURL;
    this.uiURL = webURL;
    this.username = username;
    this.key = key;
  }

  /**
   * General function to send a HTTP GET to the Evergreen API
   *
   * @param resource - resource to GET, can be a path
   * @param params - query params to append to the request URL, in the format {"param": "value"}
   * @returns a promise for the caller to handle responses
   */
  public getAPIResource(resource: string, params?: object): AxiosPromise {
    const url = this.apiURL + "/" + resource + queryString(params);
    return Axios(this.formRequest("GET", url, true));
  }

  /**
   * General function to send a HTTP GET to the Evergreen UI
   *
   * @param resource - resource to GET, can be a path
   * @param params - query params to append to the request URL, in the format {"param": "value"}
   * @returns a promise for the caller to handle responses
   */
  public getUIResource(resource: string, params?: object): AxiosPromise {
    const url = this.uiURL + "/" + resource + queryString(params);
    return Axios(this.formRequest("GET", url, false));
  }

  /**
   * General function to send a HTTP POST to Evergreen
   *
   * @param resource - resource to POST to, can be a path
   * @param body - body of the request, usually as an object
   * @returns a promise for the caller to handle responses
   */
  public postAPIResource(resource: string, body: any): AxiosPromise {
    const url = this.apiURL + "/" + resource;
    return Axios(this.formRequest("POST", url, true, body));
  }

  /**
   * General function to send a HTTP POST to the Evergreen UI
   *
   * @param resource - resource to POST to, can be a path
   * @param body - body of the request, usually as an object
   * @returns a promise for the caller to handle responses
   */
  public postUIResource(resource: string, body: any): AxiosPromise {
    const url = this.uiURL + "/" + resource;
    return Axios(this.formRequest("POST", url, false, body));
  }

  // routes are below

  /**
   * Gets all distros
   *
   * @returns a promise for the caller to handle responses
   */
  public getDistros(): AxiosPromise<any> { // TODO: add type of resp
    return this.getAPIResource(apiV2Resource("distros"));
  }

  /**
   * Gets aggregated or detailed stats for tasks that have finished recently
   *
   * @param verbose - returns task details rather than aggregated stats
   * @param lookbackMins - look for tasks that ended at most this many minutes before now
   * @param status - task statuses (can be comma-separated list) to filter on
   * @returns a promise for the caller to handle responses
   */
  public getRecentTasks(verbose?: boolean, lookbackMins?: number, status?: string): AxiosPromise<any> { // TODO: add type of resp
    const params = {
      verbose: verbose,
      minutes: lookbackMins,
      status: status,
    };
    return this.getAPIResource(apiV2Resource("status/recent_tasks"), params);
  }

  /**
   * Updates header cookies when given login credentials
   *
   * @param username - Evergreen user's username
   * @param password - Evergreen user's password
   * @returns a promise for the caller to handle responses
   */
  public getToken(username?: string, password?: string): AxiosPromise<any> { // TODO: add type of resp
    const params = {
      username: username,
      password: password,
    };
    return this.postUIResource("login", params);
  }

  /**
   * Gets patches for a particular user
   * @param username - Evergreen user's username
   * @returns a promise for the caller to handle responses
   */
  public getPatches(username?: string, page?: number): AxiosPromise<models.Patches> {
    const resource = "json/patches/user/" + username;
    const params = {
      page: page,
    };
    return this.getUIResource(resource, params);
  }

  /**
   * Gets patches for a particular project
   * @param projectName - Evergreen project name
   * @returns a promise for the caller to handle responses
   */
  public getProjectPatches(projectName?: string, page?: number): AxiosPromise<models.Patches> {
    const resource = "json/patches/project/" + projectName
    const params = {
      page: page,
    };
    return this.getUIResource(resource, params);
  }

  /**
   * Gets logs of a particular type for a particular task/
   * @param taskId - identifier for the task whose logs we want
   * @param type - type of log to return
   * @returns a promise for the caller to handle responses
   */

  public getLogs(taskId: string, type: string, executionNumber: number): AxiosPromise<string> {
    const params = {
      type: type,
      text: true,
    };
    const resource = "task_log_raw/" + taskId + "/" + executionNumber + queryString(params);
    return this.getUIResource(resource);
  }

  /**
   * Gets build for a given build ID
   * @param id - build ID whose tasks we want
   * @returns a promise for the caller to handle responses
   */
  public getBuild(id: string): AxiosPromise<models.Build> {
    const resource = "builds/" + id;
    return this.getAPIResource(apiV2Resource(resource));
  }

  /**
   * Gets tasks for a given build ID
   * @param buildId - build ID whose tasks we want
   * @returns a promise for the caller to handle responses
   */
  public getTasksForBuild(buildId: string): AxiosPromise<models.APITask[]> {
    const resource = "builds/" + buildId + "/tasks";
    return this.getAPIResource(apiV2Resource(resource));
  }

  /**
   * Gets tests for a given task ID
   * @param taskId - task ID whose tests we want
   * @returns a promise for the caller to handle responses
   */
  public getTestsForTask(taskId: string): AxiosPromise<models.APITest[]> {
    const resource = "tasks/" + taskId + "/tests";
    return this.getAPIResource(apiV2Resource(resource));
  }

  /**
   * Gets the admin settings
   *
   * @param callback - function to process the response
   * @returns a promise for the caller to handle responses
   */
  public getAdminConfig(): AxiosPromise<models.AdminSettings> {
    return this.getAPIResource(apiV2Resource("admin/settings"));
  }

  /**
   * Sets the admin settings
   *
   * @param callback - function to process the response
   * @param settings - settings object to set in the db
   * @returns a promise for the caller to handle responses
   */
  public setAdminConfig(settings: models.AdminSettings): AxiosPromise<models.AdminSettings> {
    return this.postAPIResource(apiV2Resource("admin/settings"), settings);
  }

  /**
   * Gets the Evergreen banner message
   *
   * @param callback - function to process the response
   * @returns a promise for the caller to handle responses
   */
  public getBanner(): AxiosPromise<any> {  // TODO: add type of resp
    return this.getAPIResource(apiV2Resource("admin/banner"));
  }

  /**
   * Sets the Evergreen banner message
   *
   * @param message - text to set in the banner
   * @param theme - color theme to use
   * @returns a promise for the caller to handle responses
   */
  public setBanner(message: string, theme: string): AxiosPromise<any> {  // TODO: add type of resp
    const body = {
      banner: message,
      theme: theme,
    };
    return this.postAPIResource(apiV2Resource("admin/settings"), body);
  }

  // end routes
  private formRequest(method: Method, url: string, requireHeaders: boolean, body?: any): AxiosRequestConfig {
    let headers = {};
    if (requireHeaders) {
      headers = {
        "Api-User": this.username,
        "Api-Key": this.key,
      };
    }
    const opts: AxiosRequestConfig = {
      headers: headers,
      url: url,
      withCredentials: true,
      method: method,
    };
    if (body) {
      opts.data = body;
    }
    return opts;
  }
}

export function apiV2Resource(resource: string): string {
  return "rest/v2/" + resource;
}

export function queryString(params?: object): string {
  if (!params || params === {}) {
    return "";
  }
  let queryStr = "?";
  for (const key in params) {
    if (params[key] !== undefined && params[key] !== null) {
      queryStr += (key + "=" + params[key] + "&");
    }
  }

  return queryStr.slice(0, -1);
}
