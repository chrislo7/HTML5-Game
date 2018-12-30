class NumberedBox extends createjs.Container {
    constructor(number = 0) {
        super();

        console.log('graphics');
        
        const clip = new lib.NumberedBox();
        clip.numberText.text = number;
        this.addChild(clip);

        this.setBounds(0,0,50,50);
    }
}

class Game {
    constructor() {
        console.log( `Game Version ${this.version()}` );

        this.canvas = document.getElementById("game-canvas");
        this.stage = new createjs.Stage(this.canvas);

        this.stage.width = this.canvas.width;
        this.stage.height = this.canvas.height;

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
            let clip = new NumberedBox(i);
            this.stage.addChild(clip);

            // random position 
            clip.x = Math.random() * (this.stage.width - clip.getBounds().width);
            clip.y = Math.random() * (this.stage.height - clip.getBounds().height);
        }
    }
}

// game start
const game = new Game();