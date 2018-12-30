class NumberedBox extends createjs.Container {
    constructor(game, number = 0) {
        super();
        
        this.game = game;

        let box = new lib.NumberedBox();
        box.numberText.text = number;
        this.addChild(box);
        this.setBounds(0,0,50,50);
        console.log('graphics loaded');

        this.on('click', this.handleClick.bind(this));
    }

    handleClick() {
        this.game.handleClick(this);
    }
}

class Game {
    constructor() {
        console.log( `Game Version ${this.version()}` );

        this.canvas = document.getElementById("game-canvas");
        this.stage = new createjs.Stage(this.canvas);

        this.stage.width = this.canvas.width;
        this.stage.height = this.canvas.height;
        
        // enable tap on touch/mobile devices
        createjs.Touch.enable(this.stage);
        createjs.Ticker.setFPS(120);

        // keep redrawing the stage
        createjs.Ticker.on("tick", this.stage);

        // background
        this.stage.addChild(new lib.Background());

        // testing graphics
        this.generateMultipleBoxes();
    }

    version() {
        return '1.0.0';
    }

    generateMultipleBoxes(amount = 10) {
        for (let i = amount; i > 0; i--) {
            let box = new NumberedBox(this, i);
            this.stage.addChild(box);

            // random position 
            box.x = Math.random() * (this.stage.width - box.getBounds().width);
            box.y = Math.random() * (this.stage.height - box.getBounds().height);
        }
    }

    handleClick(box) {
        this.stage.removeChild(box);
    }
}

// game start
const game = new Game();