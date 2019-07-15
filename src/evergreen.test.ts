import * as fs from "fs";
import * as yaml from "js-yaml";
import * as os from "os";
import * as request from "request";
import { client, queryString } from "./evergreen";

const configFilePath = os.homedir() + "/.evergreen.yml";

function getEvergreenClient(): client {
  let user = process.env.API_USER || "";
  let key = process.env.API_KEY || "";
  let serverURL = process.env.API_SERVER || "";
  let webURL = process.env.UI_SERVER || "";

  if (user === "" && key === "" && serverURL === "" && fs.existsSync(configFilePath)) {
    const data = fs.readFileSync(configFilePath, "utf8");
    const localConfig = yaml.safeLoad(data);
    user = localConfig.user;
    key = localConfig.api_key;
    serverURL = localConfig.api_server_host;
    webURL = localConfig.ui_server_host;
  }

  return new client(serverURL, webURL, user, key);
}

test("Evergreen client is constructed correctly", () => {
  const user = "me";
  const key = "abc123";
  const serverURL = "www.example.com";
  const webURL = "www.example.com";
  const evergreen = new client(serverURL, webURL, user, key);

  expect(evergreen.username).toBe(user);
  expect(evergreen.key).toBe(key);
  expect(evergreen.apiURL).toBe(serverURL);
});

test("query strings are formed correctly", () => {
  const params1 = {
    param1: "val1",
    param2: true,
    param3: 55,
  };
  expect(queryString(params1)).toBe("?param1=val1&param2=true&param3=55");

  const params2 = {
    undefined: undefined,
    null: null,
  } as any;
  expect(queryString(params2)).toBe("");

  expect(queryString({})).toBe("");
});

test("integration tests with real API, credentials", (done) => {
  const evergreen = getEvergreenClient();
  const toTest: Array<(callback: request.RequestCallback) => void> = [
    evergreen.getDistros,
    evergreen.getRecentTasks,
    evergreen.getBanner,
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
    evergreen[fn.name](callback);
  });
});

test("login test with bad credentials", (done) => {
  const evergreen = getEvergreenClient();
  const username = "some.user";
  const password = "password";

  const callback = (error: any, response: request.Response, body: any): void => {
    expect(error).toBe(null);
    expect(response.statusCode).toBe(401);
    expect(body).not.toBe(null);
    expect(body).not.toBe(undefined);
    done();
  };

  evergreen.getToken(callback, username, password);
});

test("patches test with real username", (done) => {
  const evergreen = getEvergreenClient();
  const username = "admin";

  const callback = (error: any, response: request.Response, body: any): void => {
    expect(error).toBe(null);
    expect(response.statusCode).toBe(200);
    expect(body).not.toBe(null);
    expect(body).not.toBe(undefined);
    done();
  };

  evergreen.getPatches(callback, username);
});

test("task test with real id", (done) => {
  const evergreen = getEvergreenClient();
  const id = "mongodb_mongo_master_enterprise_rhel_62_64_bit_patch_aa9f6a202e0709adf14046cb27504864adaf732b_5d28d45fd1fe0716daa6b903_19_07_12_18_41_36";

  const callback = (error: any, response: request.Response, body: any): void => {
    expect(error).toBe(null);
    expect(response.statusCode).toBe(200);
    expect(body).not.toBe(null);
    expect(body).not.toBe(undefined);
    done();
  };

  evergreen.getTasks(callback, id);
});

test("test method test with real id", (done) => {
  const evergreen = getEvergreenClient();
  const id = "mongodb_mongo_master_enterprise_rhel_62_64_bit_aggregation_auth_patch_aa9f6a202e0709adf14046cb27504864adaf732b_5d28d45fd1fe0716daa6b903_19_07_12_18_41_36";

  const callback = (error: any, response: request.Response, body: any): void => {
    expect(error).toBe(null);
    expect(response.statusCode).toBe(200);
    expect(body).not.toBe(null);
    expect(body).not.toBe(undefined);
    done();
  };

  evergreen.getTests(callback, id);
});

test("log test with real task id", (done) => {
  const evergreen = getEvergreenClient();
  const taskId = "spruce_ubuntu1604_compile_e44b6da8831497cdd4621daf4c62985f0c1c9ca9_19_07_08_18_39_15";
  const logType = "ALL";
  const executionNum = 0;

  const callback = (error: any, response: request.Response, body: any): void => {
    expect(error).toBe(null);
    expect(response.statusCode).toBe(200);
    expect(body).not.toBe(null);
    expect(body).not.toBe(undefined);
    done();
  };

  evergreen.getLogs(callback, taskId, logType, executionNum);
});

test("log test with real task id", (done) => {
  const evergreen = getEvergreenClient();
  const taskId = "spruce_ubuntu1604_compile_e44b6da8831497cdd4621daf4c62985f0c1c9ca9_19_07_08_18_39_15";
  const logType = "ALL";
  const executionNum = 0;

  const callback = (error: any, response: request.Response, body: any): void => {
    expect(error).toBe(null);
    expect(response.statusCode).toBe(200);
    expect(body).not.toBe(null);
    expect(body).not.toBe(undefined);
    done();
  };

  evergreen.getLogs(callback, taskId, logType, executionNum);
});
