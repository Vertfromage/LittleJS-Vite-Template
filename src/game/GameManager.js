/* 
    GameManager.js
    - All global variables, properties and functions should be in game manager
*/

// Import all used functions from LittleJS module
import { vec2, Sound, setCanvasFixedSize, setCameraPos} from 'littlejsengine/build/littlejs.esm.js'; // Adjust the import path as needed


class GameManager {
    constructor() {
        // global game variables
        this.brickCount = 0;
        this.score= 0;
        this.ball = 0;
        this.paddle;

        // properties
        setCanvasFixedSize( vec2(1280, 720));
        this.levelSize = vec2(38, 20);

        //set the cameraPos
        this.InitialCameraPos = this.levelSize.scale(.5);

        // camera
        setCameraPos(this.levelSize.scale(.5))

        // sound effects
        this.sound_start  = new Sound([,0,500,,.04,.3,1,2,,,570,.02,.02,,,,.04]);
        this.sound_break  = new Sound([,,90,,.01,.03,4,,,,,,,9,50,.2,,.2,.01]);
        this.sound_bounce = new Sound([,,1e3,,.03,.02,1,2,,,940,.03,,,,,.2,.6,,.06]);
    }

    setBrickCount(value){
        this.brickCount=value
    }

    // Instance methods and properties
    incrementBrickCount() {
        this.brickCount++;
    }

    decreaseBrickCount() {
        this.brickCount--;
    }

    // Methods for score
    setScore(value) {
        this.score = value;
    }

    addScore(points) {
        this.score += points;
    }

    setBall(num) {
        this.ball=num
    }

    setPaddle(paddle){
        this.paddle = paddle
    }

    // Add other methods as needed
}

const GM = new GameManager();
export default GM;
