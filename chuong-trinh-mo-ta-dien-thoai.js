const Phone = function (
    idDevice = Math.floor(Math.random() * 1000),
    battery = 100,
    status = false,
    inbox = {
        create: [],
        reveiced: []
    }
) {
    this.idDevice = idDevice;
    this.battery = battery;
    this.status = status;
    this.inbox = inbox;
};

Phone.prototype.turnOn = function () {
    if (!this.status) {
        this.status = true;
    }
};

Phone.prototype.turnOff = function () {
    if (this.status) {
        this.status = false;
    }
};

Phone.prototype.checkStatus = function () {
    return this.status;
};
Phone.prototype.checkBatery = function () {
    return this.status > 0;
};
Phone.prototype.charged = function () {
    this.battery = 100;
};

Phone.prototype.useDeviced = function () {
    if (this.battery > 0) {
        --this.battery;
    }
};

Phone.prototype.watchMessage = function (type) {
    if (this.checkStatus() || this.checkBatery()) {
        if (type === "received") {
            this.inbox.reveiced.forEach(function (e, i) {
                console.log(`id message:${i} content:${e.message} device send:${e.device}`);
            });
        } else if (type === "sent") {
            this.inbox.create.forEach(e => console.log(`${e.id} ${e.message}`));
        }
    } else {
        alert("Error : device not turn on or low batery");
    }
};

Phone.prototype.createMessage = function (message) {
    if (this.checkStatus() || this.checkBatery()) {
        let idMs = Math.floor(Math.random() * 1001);
        this.inbox.create.push({
            idMessage: idMs,
            message: message
        });
        return idMs;
    } else {
        alert("Error : Device not turn on or low batery");
    }
};

Phone.prototype.send = function (idMessage, phoneEtc) {
    if (this.checkStatus() || this.checkBatery()) {
        let positionMessage = this.inbox.create.findIndex(
            e => e.idMessage === idMessage
        );
        if (positionMessage !== -1) {
            let temp = this.inbox.create[positionMessage];
            temp["device"] = this.idDevice;
            phoneEtc.inbox.reveiced.push(temp);
            this.inbox.create.splice(positionMessage, 1);
        }
    } else {
        alert("Error : Device not turn on or low batery");
    }
};

let nokia = new Phone();
nokia.turnOn();
let iphone = new Phone();
iphone.turnOn();

let idms = nokia.createMessage("Message by nokia");
nokia.send(idms, iphone);
iphone.watchMessage("received");