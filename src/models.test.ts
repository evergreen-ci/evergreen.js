import { ConvertToAdminSettings } from "./models";
test("Generic object models get converted correctly", () => {
    const model = {
        amboy: {
            name: "foo",
            pool_size_local: 3,
        },
        api_url: "api",
    };

    const classObj = ConvertToAdminSettings(model);
    expect(classObj.amboy.name).toEqual("foo");
    expect(classObj.amboy.pool_size_local).toEqual(3);
    expect(classObj.api_url).toEqual("api");
    expect(classObj.auth).toBe(undefined);
});
