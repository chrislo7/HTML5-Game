class NumberedBox extends createjs.Container {
    constructor(number = 0) {
        super();

        console.log('graphics');
        
        const movieClip = new lib.NumberedBox();
        movieClip.numberText.text = number;
        this.addChild(movieClip);

        // random position 
        movieClip.x = Math.random() * 200;
        movieClip.y = Math.random() * 200;

    }
}

class Game {
    constructor() {
        console.log( `Game Version ${this.version()}` );

        this.canvas = document.getElementById("game-canvas");
        this.stage = new createjs.Stage(this.canvas);

        createjs.Ticker.setFPS(120);

        // keep redrawing the stage
        createjs.Ticker.on("tick", this.stage);

        // background
        this.stage.addChild(new lib.Background());

        // testing graphics
        this.stage.addChild(new NumberedBox(88));

    }

    version() {
        return '1.0.0';
    }
}

// game start
const game = new Game();