import * as request from "request";

export class client {
    public username: string;
    public key: string;
    public apiURL: string;
    public uiURL: string;

    constructor(username: string, key: string, serverURL: string, webURL: string) {
        this.username = username;
        this.key = key;
        this.apiURL = serverURL;
        this.uiURL = webURL;
    }

    /**
     * General function to send a HTTP GET to the Evergreen API
     *
     * @param callback - function to process the response
     * @param resource - resource to GET, can be a path
     * @param params - query params to append to the request URL, in the format {"param": "value"}
     * @returns nothing
     */
    public getAPIResource(callback: request.RequestCallback, resource: string, params?: object) {
        const url = this.apiURL + "/" + resource + queryString(params);
        request.get(this.formRequest(url), callback);
    }

    /**
     * General function to send a HTTP GET to the Evergreen UI
     *
     * @param callback - function to process the response
     * @param resource - resource to GET, can be a path
     * @param params - query params to append to the request URL, in the format {"param": "value"}
     * @returns nothing
     */
    public getUIResource(callback: request.RequestCallback, resource: string, params?: object) {
        const url = this.uiURL + "/" + resource + queryString(params);
        request.get(this.formRequest(url), callback);
  }

    /**
     * General function to send a HTTP POST to Evergreen
     *
     * @param callback - function to process the response
     * @param resource - resource to POST to, can be a path
     * @param body - body of the request, usually as an object
     * @returns nothing
     */
    public postAPIResource(callback: request.RequestCallback, resource: string, body: any) {
        const url = this.apiURL + "/" + resource;
        request.post(this.formRequest(url, body), callback);
    }

    /**
     * General function to send a HTTP POST to the Evergreen UI
     *
     * @param callback - function to process the response
     * @param resource - resource to POST to, can be a path
     * @param body - body of the request, usually as an object
     * @returns nothing
     */
    public postUIResource(callback: request.RequestCallback, resource: string, body: any) {
        const url = this.uiURL + "/" + resource;
        request.post(this.formRequest(url, body), callback);
  }

    // routes are below

    /**
     * Gets all distros
     *
     * @param callback - function to process the response
     * @returns nothing
     */
    public getDistros(callback: request.RequestCallback) {
        this.getAPIResource(callback, apiV2Resource("distros"));
    }

    /**
     * Gets aggregated or detailed stats for tasks that have finished recently
     *
     * @param callback - function to process the response
     * @param verbose - returns task details rather than aggregated stats
     * @param lookbackMins - look for tasks that ended at most this many minutes before now
     * @param status - task statuses (can be comma-separated list) to filter on
     * @returns nothing
     */
    public getRecentTasks(callback: request.RequestCallback, verbose?: boolean, lookbackMins?: number, status?: string) {
        const params = {
            verbose: verbose,
            minutes: lookbackMins,
            status: status,
        };
        this.getAPIResource(callback, apiV2Resource("status/recent_tasks"), params);
    }

    /**
     * Updates header cookies when given login credentials
     *
     * @param callback - function to process the response
     * @param username - Evergreen user's username
     * @param password - Evergreen user's password
     * @returns nothing
     */
    public getToken(callback: request.RequestCallback, username?: string, password?: string) {
        const params = {
            username: username,
            password: password,
        };
        this.postUIResource(callback, "login", params);
    }

    /**
     * Gets patches for a particular user
     * @param callback - function to process the response
     * @param username - Evergreen user's username
     * @returns nothing
     */
    public getPatches(callback: request.RequestCallback, username?: string) {
        const resource =  "json/patches/user/" + username;
        this.getUIResource(callback, resource, {});
    }

    /**
     * Gets the admin settings
     *
     * @param callback - function to process the response
     * @returns nothing
     */
    public getAdminConfig(callback: request.RequestCallback) {
        this.getAPIResource(callback, apiV2Resource("admin/settings"));
    }

    /**
     * Sets the admin settings
     *
     * @param callback - function to process the response
     * @param settings - settings object to set in the db. TODO: this should probably be of type models.AdminSettings
     * @returns nothing
     */
    public setAdminConfig(callback: request.RequestCallback, settings: any) {
        this.postAPIResource(callback, apiV2Resource("admin/settings"), settings);
    }

    /**
     * Gets the Evergreen banner message
     *
     * @param callback - function to process the response
     * @returns nothing
     */
    public getBanner(callback: request.RequestCallback) {
        this.getAPIResource(callback, apiV2Resource("admin/banner"));
    }

    /**
     * Sets the Evergreen banner message
     *
     * @param callback - function to process the response
     * @param message - text to set in the banner
     * @param theme - color theme to use
     * @returns nothing
     */
    public setBanner(callback: request.RequestCallback, message: string, theme: string) {
        const body = {
            banner: message,
            theme: theme,
        };
        this.postAPIResource(callback, apiV2Resource("admin/settings"), body);
    }

    private formRequest(url: string, body?: any): requestOpts {
        const opts: requestOpts = {
            headers: {
                "Api-User": this.username,
                "Api-Key": this.key,
            },
            url: url,
        };
        if (body) {
            opts.body = body;
            opts.json = true;
        }

        return opts;
    }
    // end routes
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

interface requestOpts {
    url: string;
    headers: object;
    body?: any;
    json?: boolean;
}
