class NumberedBox extends createjs.Container {
    constructor(game, number = 0) {
        super();
        this.game = game;
        this.number = number;

        let box = new lib.NumberedBox();
        box.numberText.text = number;

        new createjs.ButtonHelper(box, 0, 1, 2, false, new lib.NumberedBox(), 3);

        this.addChild(box);
        this.setBounds(0,0,50,50);
        console.log('graphics loaded');

        this.on('click', this.handleClick.bind(this));
    }

    handleClick() {
        this.game.handleClick(this);
    }
}

class GameData {
    constructor() {
        this.amountofBox = 3;
        this.resetData();
    }

    resetData() {
        this.currentNumber = 1;
    }
    nextNumber() {
        this.currentNumber += 1;
    }
    isRightNumber(num) { 
        return ( num === this.currentNumber ) 
    }
    isWin() {
        return ( this.currentNumber > this.amountofBox );
    }

}

class Game {
    constructor() {
        console.log( `Game Version ${this.version()}` );

        this.canvas = document.getElementById("game-canvas");
        this.stage = new createjs.Stage(this.canvas);

        this.stage.width = this.canvas.width;
        this.stage.height = this.canvas.height;
        this.stage.enableMouseOver();
        // enable tap on touch/mobile devices
        createjs.Touch.enable(this.stage);

        // enable scaling
        this.scale();

        // game data initalization
        this.gameData = new GameData();

        createjs.Ticker.setFPS(120);

        // keep redrawing the stage
        createjs.Ticker.on("tick", this.stage);

        this.restartGame();
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

    restartGame() {
        this.gameData.resetData();
        this.stage.removeAllChildren();
        this.stage.addChild(new lib.Background());
        this.generateMultipleBoxes( this.gameData.amountofBox );
    }
    
    handleClick(box) {
        if (this.gameData.isRightNumber( box.number )) { 
            this.stage.removeChild(box);
            this.gameData.nextNumber();
         }

         // game over logic
         if ( this.gameData.isWin() ) { 
             let gameOverView = new lib.GameOverView();
             this.stage.addChild(gameOverView);

             gameOverView.restartButton.on('click', (function() {
                 this.restartGame();
             }).bind(this));
          }
    }

    scale() {
        this.stage.width = this.canvas.width;
        this.stage.height = this.canvas.height;

        let ratio = window.devicePixelRatio;
        if ( ratio === undefined ) { return }

        this.canvas.setAttribute( 'width', Math.round( this.stage.width * ratio ));
        this.canvas.setAttribute( 'height', Math.round( this.stage.height * ratio ));
        this.stage.scaleX = this.stage.scaleY = ratio;

        //Set CSS
        this.canvas.style.width = this.stage.width + "px";
        this.canvas.style.height = this.stage.height + "px";
    }
}

// game start
const game = new Game();