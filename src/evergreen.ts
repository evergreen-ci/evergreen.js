export class Evergreen {
    Username: string;
    Key: string;
    ServerURL: string;

    constructor (username: string, key: string, serverURL: string) {
        this.Username = username;
        this.Key = key;
        this.ServerURL = serverURL;
    }
}