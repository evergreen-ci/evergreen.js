
import * as request from "request";

export namespace evergreen {

    // TODO: document all public functions
    export class client {
        public username: string;
        public key: string;
        public serverURL: string;

        constructor(username: string, key: string, serverURL: string) {
            this.username = username;
            this.key = key;
            this.serverURL = serverURL;
        }

        private formRequest(url: string, body?: any): requestOpts {
            let opts = {
                headers: {
                    "Api-User": this.username,
                    "Api-Key": this.key,
                },
                url: url,
            };
            if (body) {
                opts["body"] = body;
                opts["json"] = true;
            }

            return opts
        }

        public getResource(callback: request.RequestCallback, resource: string, params?: object) {
            let url = this.serverURL + "/" + resource + queryString(params);
            request.get(this.formRequest(url), callback);
        }

        public postResource(callback: request.RequestCallback, resource: string, body:any) {
            let url = this.serverURL + "/" + resource;
            request.post(this.formRequest(url, body), callback);
        }

        public getDistros(callback: request.RequestCallback) {
            this.getResource(callback, apiV2Resource("distros"));
        }

        public getRecentTasks(callback: request.RequestCallback, verbose?: boolean, lookbackMins?: number, status?: string) {
            let params = {
                "verbose": verbose,
                "minutes": lookbackMins,
                "status": status,
            }
            this.getResource(callback, apiV2Resource("status/recent_tasks"), params);
        }

        public getAdminConfig(callback: request.RequestCallback) {
            this.getResource(callback, apiV2Resource("admin/settings"));
        }

        public setAdminConfig(callback: request.RequestCallback, settings:any) {
            this.postResource(callback, apiV2Resource("admin/settings"), settings);
        }

        public getBanner(callback: request.RequestCallback) {
            this.getResource(callback, apiV2Resource("admin/banner"));
        }

        public setBanner(callback: request.RequestCallback, message:string, theme:string) {
            let body = {
                "banner": message,
                "theme": theme
            }
            this.postResource(callback, apiV2Resource("admin/settings"), body);
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
        for (let key in params) {
            if (params[key] !== undefined && params[key] !== null) {
                queryStr += (key + "=" + params[key] + "&");
            }
        }

        return queryStr.slice(0, -1);;
    }

    type requestOpts = {
        url: string,
        headers: object,
        body?: any,
    }

}