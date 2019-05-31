jest.mock("./evergreen");
import * as request from "request";
import { client } from "./evergreen";

test("API test with a mock", (done) => {
    const evergreen = new client("user", "key", "server");
    const toTest: Array<(callback: request.RequestCallback) => void> = [
        evergreen.getDistros,
        evergreen.getRecentTasks,
        evergreen.getAdminConfig,
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
