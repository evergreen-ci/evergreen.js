import { ConvertToAdminSettings } from "./models";
test("Models deserialize correctly from JSON", () => {
    const classJSON = `{
        "amboy": {
            "name": "foo",
            "pool_size_local": 3
        },
        "api_url": "api"
    }`;

    const classObj = ConvertToAdminSettings(classJSON);
    console.log(typeof(classObj));
    expect(classObj.amboy.name).toEqual("foo");
    expect(classObj.amboy.pool_size_local).toEqual(3);
    expect(classObj.api_url).toEqual("api");
    expect(classObj.auth).toBe(undefined);
});
