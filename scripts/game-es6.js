class Game {
    constructor() {
        console.log( `Game Version ${this.version()}` );

        this.canvas = document.getElementById("game-canvas");
        this.stage = new createjs.Stage(this.canvas);

        createjs.Ticker.setFPS(120);

        // keep redrawing the stage
        createjs.Ticker.on("tick", this.stage);

        // testing createjs
        const circle = new createjs.Shape();
        circle.graphics.beginFill("red").drawCircle(0,0,40);
        circle.x = circle.y = 100;
        this.stage.addChild(circle);

    }

    version() {
        return '1.0.0';
    }
}

// game start
const game = new Game();