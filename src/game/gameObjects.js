/*
    LittleJS Breakout Objects
*/

// Import all used functions from LittleJS module
import { 
    EngineObject,
    Color,
    vec2,
    gamepadStick,
    isUsingGamepad,
    mousePos,
    clamp,
    randColor,
    ParticleEmitter,
    randSign,
    max,
    min,
    PI,
 } from 'littlejsengine/build/littlejs.esm.js';
'use strict';
// import the game manager for global variables, properties, functions
import GM from './GameManager';


///////////////////////////////////////////////////////////////////////////////
class Wall extends EngineObject
{
    constructor(pos, size)
    {
        super(pos, size);
        
        this.mass = 0; // make object have static physics
        this.setCollision(); // make object collide
        this.color = new Color(0,0,0,0); // make object invisible
    }
}

///////////////////////////////////////////////////////////////////////////////
class Paddle extends EngineObject
{
    constructor(pos)
    {
        super(pos, vec2(5,.5));
        
        this.mass = 0; // make object have static physics
        this.setCollision(); // make object collide
    }

    update()
    {
        // control with gamepad or mouse
        this.pos.x = isUsingGamepad ? this.pos.x + gamepadStick(0).x : mousePos.x;

        // keep paddle in bounds of level
        this.pos.x = clamp(this.pos.x, this.size.x/2, GM.levelSize.x - this.size.x/2);
    }
}

///////////////////////////////////////////////////////////////////////////////
class Brick extends EngineObject 
{
    constructor(pos)
    {
        super(pos, vec2(2,1), 1, vec2(32,16), 0, randColor());
        GM.incrementBrickCount();
        
        this.mass = 0; // make object have static physics
        this.setCollision(); // make object collide
    }

    collideWithObject(o)              
    {
        // destroy brick when hit with ball
        this.destroy();
        GM.addScore(1)
        GM.decreaseBrickCount();
        GM.sound_break.play(this.pos);

        // make explosion effect
        const color1 = this.color;
        const color2 = color1.lerp(new Color, .5);
        new ParticleEmitter(
            this.pos, 0,                          // emitPos, emitAngle
            this.size, .1, 200, PI,               // emitSize, emitTime, emitRate, emiteCone
            0, vec2(16),                          // tileIndex, tileSize
            color1, color2,                       // colorStartA, colorStartB
            color1.scale(1,0), color2.scale(1,0), // colorEndA, colorEndB
            .1, .3, 1, .05, .05,// time, sizeStart, sizeEnd, speed, angleSpeed
            .99, .95, .4, PI,   // damping, angleDamping, gravityScale, cone
            .1, .5, 0, 1        // fadeRate, randomness, collide, additive
        );
        
        return 1;
    }
}

///////////////////////////////////////////////////////////////////////////////
class Ball extends EngineObject 
{
    constructor(pos)
    {
        super(pos, vec2(.5), 0);

        // make a bouncy ball
        this.setCollision();
        this.velocity = vec2(randSign(), -1).scale(.1);
        this.elasticity = 1;
    }

    update()
    {
        if (this.pos.y < -1)
        {
            // destroy ball if it goes below the level
            GM.setBall(0)
            this.destroy();
        }

        // update physics
        super.update();
    }

    collideWithObject(o)              
    {
        // prevent colliding with paddle if moving upwards
        if (o == GM.paddle && this.velocity.y > 0)
            return 0;

        // speed up
        const speed = min(1.04*this.velocity.length(), .5);
        this.velocity = this.velocity.normalize(speed);

        // scale bounce sound pitch by speed
        GM.sound_bounce.play(this.pos, 1, speed);

        if (o == GM.paddle)
        {
            // put english on the ball when it collides with paddle
            this.velocity = this.velocity.rotate(.2 * (this.pos.x - o.pos.x));
            this.velocity.y = max(-this.velocity.y, .2);
            return 0;
        }
        
        // prevent default collision with paddle
        return 1;
    }
}

export { Wall, Ball, Paddle, Brick };

