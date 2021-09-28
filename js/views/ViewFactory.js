class  ViewFactory {
    static getView(name) {
        switch (name) {
            case "index":
                return new ViewIndex;
            case "photographer":
                return new ViewProfil;
        
            default:
                console.log("cette vue n'existe pas")
        }
    }
}