const fs = require('fs');

module.exports = class DB {

    constructor() {}

    readDB() {
        const db = fs.readFileSync('db.json');
        return JSON.parse(db);
    }

    writeDB(data) {
        fs.writeFileSync('db.json', JSON.stringify(data, null, 2));
    }

    setServerId(serverId) {
        let newData = {
            ...this.readDB(),
            serverId
        };
        this.writeDB(newData);
    }

    getServerId() {
        return this.readDB().serverId;
    }

    getToken() {
        return this.readDB().Token;
    }
}