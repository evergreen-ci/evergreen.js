import { Evergreen } from "./evergreen";

test("Evergreen client is constructed correctly", () => {
    const user = "me";
    const key= "abc123";
    const serverURL = "www.example.com";
    let evergreen = new Evergreen(user, key, serverURL);

    expect(evergreen.Username).toBe(user);
    expect(evergreen.Key).toBe(key);
    expect(evergreen.ServerURL).toBe(serverURL);
})