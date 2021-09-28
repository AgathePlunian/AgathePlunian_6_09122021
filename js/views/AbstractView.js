class AbstractView {
    constructor() {
        this.listVariables = {}
    }

    addVariable(name, value){
        this.listVariables[name] = value;
    }

    getVariable(name) {
        if (this.listVariables[name] != undefined) {
            return this.listVariables[name];
        }
        return null;
    }
}