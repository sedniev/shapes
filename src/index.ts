import './styles/styles.scss';
import * as PIXI from 'pixi.js';
import Shape from './create-shapes';
import { stage, app, shapes, gameContainer } from './data-settings';
import { destroyFigure } from './destroy-figure';
import { calcShapes, calcSurfaceArea } from './counters';
import { changeGenerationSpeed, changeGravityValue, genShapeSpeed } from './controls';


document.querySelector('#stage').appendChild(app.view);
gameContainer.on('click', (event) => onClick(event));

let state = fall;
let interval: NodeJS.Timeout;
function generateFigure(positionX?: number, positionY?: number){
    let posX: number = positionX || Math.floor(Math.random() * stage.width);
    let posY: number = positionY;
    let shape: Shape = new Shape(posX, posY);
    let figure: PIXI.Graphics = shape.generateFigure();
    gameContainer.addChild(figure);
    app.ticker.add(() => gameLoop(figure));
    calcShapes();
    calcSurfaceArea();
}

function startGenerateShapes (){
    interval = setInterval(generateFigure, changeGenerationSpeed());
}


function gameLoop(figure): void{
    figure.y+=changeGravityValue()
    state();
    
}

function fall(): void{
   
    for (let key in shapes){

        shapes[key].forEach(figure => {
            
            if (figure.y-figure.height > stage.height){
                destroyFigure(figure);
            }
        }); 
    }
}

function onClick(event): void{
    if (event.target === gameContainer) {
       generateFigure(event.data.global.x, event.data.global.y);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#increase-gen-speed').addEventListener('click', () =>{
        changeGenerationSpeed(500);
        clearInterval(interval);
        startGenerateShapes();
    })
    document.querySelector('#decrease-gen-speed').addEventListener('click', () =>{
        changeGenerationSpeed(-500);
        clearInterval(interval);
        startGenerateShapes();
    })
    document.querySelector('#increase-gravity').addEventListener('click', () =>{
        changeGravityValue(0.1);
    })
    document.querySelector('#decrease-gravity').addEventListener('click', () =>{
        changeGravityValue(-0.1);
    })


});

startGenerateShapes();