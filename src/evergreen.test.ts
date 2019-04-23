import * as fs from "fs";
import * as yaml from "js-yaml";
import * as os from "os";
import * as request from "request";
import { evergreen } from './evergreen';

const configFilePath = os.homedir() + "/.evergreen.yml";

function getEvergreenClient(): evergreen.client {
    let user = process.env.API_USER || "";
    let key = process.env.API_KEY || "";
    let serverURL = process.env.API_SERVER || "";
    
    if (user == "" && key == "" && serverURL == "" && fs.existsSync(configFilePath)) {
        const data = fs.readFileSync(configFilePath, "utf8");
        const localConfig = yaml.safeLoad(data);
        user = localConfig.user;
        key = localConfig.api_key;
        serverURL = localConfig.api_server_host;
    }

    return new evergreen.client(user, key, serverURL);
}

test("Evergreen client is constructed correctly", () => {
    const user = "me";
    const key = "abc123";
    const serverURL = "www.example.com";
    const client = new evergreen.client(user,key,serverURL)

    expect(client.username).toBe(user);
    expect(client.key).toBe(key);
    expect(client.serverURL).toBe(serverURL);
});

test("query strings are formed correctly", () => {
    let params1 = {
        "param1": "val1",
        "param2": true,
        "param3": 55,
    }
    expect(evergreen.queryString(params1)).toBe("?param1=val1&param2=true&param3=55");

    let params2 = {
        undefined: undefined,
        null: null,
    } as any
    expect(evergreen.queryString(params2)).toBe("");

    expect(evergreen.queryString({})).toBe("");
})

test("integration tests with real API, credentials", (done) => {
    const client = getEvergreenClient();
    const toTest: {(callback: request.RequestCallback): void;}[] = [
        client.getDistros,
        client.getRecentTasks,
        client.getAdminConfig,
        client.getBanner
    ];
    
    let count = 0;
    const callback = (error: any, response: request.Response, body: any): void => {
        expect(error).toBe(null);
        expect(response.statusCode).toBe(200);
        expect(body).not.toBe(null);
        expect(body).not.toBe(undefined);
        if (count < toTest.length - 1) {
            count++;
        } else {
            done();
        }
    };

    toTest.forEach((fn) => {
        client[fn.name](callback);
    })
})