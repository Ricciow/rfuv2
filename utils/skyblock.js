//Class that has sb data from locraw
class Skyblock {

    constructor() {
        this.foundLoc = false;
        this.lobbyData = undefined;
        this.functions = [];
        this.onetime = [];
        register('worldLoad', () => {
            this.foundLoc = false;
            this.lobbyData = undefined;
            //Delaying command so if any other mod sends it, it doesnt get sent twice
            setTimeout(() => {
                if(!this.foundLoc) ChatLib.command('locraw');
            }, 500);
        })
        
        register("chat", (event) => {
            if(!this.foundLoc) cancel(event)
            this.foundLoc = true;
            this.lobbyData = JSON.parse(ChatLib.getChatMessage(event, false));
            this._runOnData();
        }).setCriteria('{${*}}');
    }

    get skyblock() {
        return this.lobbyData?.gametype == 'SKYBLOCK'
    }

    get lobby() {
        return this.lobbyData?.server
    }

    get map() {
        return this.lobbyData?.map
    }
    
    _PlayerCountTexts() {
        PlayerCountTexts = TabList.getNames().filter(name => {
            if((/(Players|Guests|Party) \(\d+\)/).test(name.removeFormatting())) return true;
            return false;
        });
        return PlayerCountTexts
    }

    get playerCount() {
        return parseInt((/\d+/).exec(this._PlayerCountTexts()[0].removeFormatting()))
    }

    _runOnData() {
        this.functions.forEach(func => func());
        this.onetime.forEach(func => func());
        this.onetime = [];
    }

    /**
     * Adds a function that is ran every time when lobby data comes in
     * @param {function} func The function that is ran, must not have any parameters
     */
    addFunctionAlways(func) {
        this.functions.push(func)
    }

    /**
     * Adds a function that is ran only once after the lobby data comes in or if it has already exists
     * @param {function} func The function that is ran, must not have any parameters
     */
    addFunctionNext(func) {
        if(!this.lobbyData) this.onetime.push(func)
        else func()
    }
}

export default new Skyblock()