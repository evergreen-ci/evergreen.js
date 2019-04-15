import { models } from "./admin";
test("Models deserialize correctly from JSON", () => {
    let classJSON = {
        amboy: {
            name: "foo",
            pool_size_local: 3,
        },
        api_url: "api",
    }

    let classObj = models.ConvertToAdminSettings(classJSON);
    expect(classObj.amboy.name).toEqual("foo");
    expect(classObj.amboy.pool_size_local).toEqual(3);
    expect(classObj.api_url).toEqual("api");
    expect(classObj.auth).toBe(undefined);
})