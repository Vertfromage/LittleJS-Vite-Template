import React, { useRef, useEffect } from 'react';

import tileSheet from './assets/tiles.png';
import { Wall, Ball, Paddle, Brick } from './gameObjects.js'; // Adjust the path to the actual location of GameObjects.js
import GM from './GameManager';
// Import all used functions from LittleJS module
import { 
    vec2, 
    engineInit,
    glInitPostProcess, 
    FontImage, 
    mouseWasPressed, 
    gamepadWasPressed,
    drawRect,
    Color,
    cameraPos,
 } from 'littlejsengine/build/littlejs.esm.js'; // Better practice to destructure the functions you need...


function LittleGame() {
     const containerRef = useRef(null);
    useEffect(() => {
    /*
    Little JS Breakout Game
    - A simple breakout game
    - Includes sound and particles
    - Uses a post processing effect
    - Control with mouse, touch, or gamepad
*/

'use strict';



///////////////////////////////////////////////////////////////////////////////
function gameInit()
{
    GM.setScore(0)
    GM.setBrickCount(0)
    GM.setPaddle(new Paddle(vec2(GM.levelSize.x/2-12,1)))

    // spawn bricks
    const pos = vec2();
    for (pos.x = 4; pos.x <= GM.levelSize.x-4; pos.x += 2)
    for (pos.y = 12; pos.y <= GM.levelSize.y-2; pos.y += 1)
        new Brick(pos);

    // create walls
    new Wall(vec2(-.5,GM.levelSize.y/2), vec2(1,100)) // top
    new Wall(vec2(GM.levelSize.x+.5,GM.levelSize.y/2), vec2(1,100)) // left
    new Wall(vec2(GM.levelSize.x/2,GM.levelSize.y+.5), vec2(100,1)) // right

    initPostProcess(); // set up a post processing shader
}

///////////////////////////////////////////////////////////////////////////////
function gameUpdate()
{
    // spawn ball
    if (!GM.ball && (mouseWasPressed(0) || gamepadWasPressed(0)))
    {
        GM.ball = new Ball(vec2(GM.levelSize.x/2, GM.levelSize.y/2));
        GM.sound_start.play();
    }
}

///////////////////////////////////////////////////////////////////////////////
function gameUpdatePost()
{

}

///////////////////////////////////////////////////////////////////////////////
function gameRender()
{
    // draw a the background
    drawRect(cameraPos, GM.levelSize.scale(2), new Color(.5,.5,.5));
    drawRect(cameraPos, GM.levelSize, new Color(.05,.05,.05));
}

///////////////////////////////////////////////////////////////////////////////
function gameRenderPost()
{
    // use built in image font for text
    const font = new FontImage;
    font.drawText('Score: ' + GM.score, cameraPos.add(vec2(0,9.6)), .1, 1);
    if (!GM.brickCount)
        font.drawText('You Win!', cameraPos.add(vec2(0,-5)), .2, 1);
    else if (!GM.ball)
        font.drawText('Click to Play', cameraPos.add(vec2(0,-5)), .2, 1);
}

///////////////////////////////////////////////////////////////////////////////
// an example shader that can be used to apply a post processing effect
function initPostProcess()
{
    const televisionShader = `
    // Simple TV Shader Code
    float hash(vec2 p)
    {
        p=fract(p*.3197);
        return fract(1.+sin(51.*p.x+73.*p.y)*13753.3);
    }
    float noise(vec2 p)
    {
        vec2 i=floor(p),f=fract(p),u=f*f*(3.-2.*f);
        return mix(mix(hash(i),hash(i+vec2(1,0)),u.x),mix(hash(i+vec2(0,1)),hash(i+1.),u.x),u.y);
    }
    void mainImage(out vec4 c, vec2 p)
    {
        p /= iResolution.xy;

        // apply fuzz as horizontal offset
        const float fuzz = .001;
        const float fuzzScale = 800.;
        p.x += fuzz*(noise(vec2(p.y*fuzzScale, iTime*9.))*2.-1.);

        // init output color
        c = texture2D(iChannel0, p);

        // chromatic aberration
        const float chromatic = .003;
        c.r = texture2D(iChannel0, p - vec2(chromatic, 0)).r;
        c.b = texture2D(iChannel0, p + vec2(chromatic, 0)).b;

        // tv static noise
        const float staticNoise = .1;
        c += staticNoise * hash(vec2(p + mod(iTime, 1e3)));

        // scan lines
        const float scanlineScale = 800.;
        const float scanlineAlpha = .1;
        c *= 1. + scanlineAlpha*sin(p.y*scanlineScale);

        // black vignette around the outside
        const float vignette = 2.;
        float dx = 2.*p.x - 1., dy = 2.*p.y - 1.;
        c *= 1.-pow((dx*dx + dy*dy)/vignette, 6.);
    }`;

    const includeOverlay = true;
    glInitPostProcess(televisionShader, includeOverlay);
}

// Startup LittleJS Engine
engineInit(gameInit, gameUpdate, gameUpdatePost, gameRender, gameRenderPost, tileSheet);

        // Cleanup function - This is why it's getting bugs when opening/shutting buttons
        return () => {
            // Add logic here to properly shut down/reset your game
            // This might include stopping game loops, sound, removing event listeners, etc.
            // Example: gameShutdown(); // Replace with actual shutdown/reset function
        };
}, []);
    return <div ref={containerRef}></div>;
  
}

export default LittleGame