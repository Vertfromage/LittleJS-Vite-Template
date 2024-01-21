# React + Vite + Tailwind + LittleJS

This is a template for setting up a React project using Vite and Tailwind and then making a LittleJS game component that will run in the app. 

# Setup
```
npm install
npm run dev
```

# LittleJS
- Find the game code in src\game
- To use component import component and use like:
```
 <LittleGame/> 
```
- Put global variables/functions in GameManager and import where needed 
- Make objects in gameObjects
- import the littleJS module and destructure all functions/properties that you need

# Current Bugs
- I have the example breakout project running, but it's zoomed in too much

# import styles
```
// Import the entire module under a namespace
import * as LittleJS from 'littlejsengine/build/littlejs.esm.js';

// Destructure frequently used functions for direct access
const { vec2, Sound } = LittleJS;

// Alternatively just start with destructured
import { vec2, Sound} from 'littlejsengine/build/littlejs.esm.js';
```