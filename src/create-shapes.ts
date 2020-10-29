import * as PIXI from 'pixi.js';
import { destroyFigure } from './destroy-figure';
import { stage, shapes} from './data-settings';
import { colorShapes } from './color-shapes';
let scale: number = 50;

export default class Shape {
    private posX: number;
    private posY: number;
    public stageWidth: number;
    
    constructor(posX: number, posY?: number){
        this.posX = posX;
        this.posY = posY;
        this.stageWidth = stage.width;
    }

    public generateFigure(){
        let shape = new PIXI.Graphics();
        shape.buttonMode = true;
        shape.interactive = true;
        shape.on('click',  (event) => clicked(event) );
        let stageWidth = this.stageWidth;
        
        function createRect (posX, posY) {
            let height: number = generateValue(scale);
            let width: number = generateValue(scale);
            (posX + width) > stageWidth ? posX = (stageWidth - width): null;
            shape.name = 'rectangle';
            shape.drawRect(posX, posY || -height, height, width);
            shapes.rectangles.push(shape);    
        }
        function createCircle (posX, posY) {
            let radius = generateValue(scale);
            (posX - radius) < 0 ? posX += (radius - posX) : null; 
            (posX + radius) > stageWidth ? posX = (stageWidth - radius): null;
            shape.name = 'circle';
            shape.drawCircle(posX, posY || radius, radius);
            shapes.circles.push(shape);    
        }
        function createEllipse(posX, posY){
            let height: number = generateValue(scale);
            let width: number = generateValue(scale);
            (posX + width) > stageWidth ? posX = (stageWidth - width): null;
            shape.name = 'ellipse';
            shape.drawEllipse(posX, posY || height, width, height);
            shapes.ellipses.push(shape);
        }
        function createTriangle(startX:number, startY:number){
            let posX = startX;
            let posY = startY || generateValue(scale);
            let bX = generatePoint();
            let height = generatePoint();
            
            shape.name = 'triangle';
            shape.moveTo(posX, posY );
            shape.lineTo(posX+bX, posY);
            shape.lineTo(posX+bX/2, posY-height);
            shape.lineTo(posX, posY);
            shape.closePath();
            shapes.triangles.push(shape);
            
        }
        function createPolygon(startX:number, startY:number, type: string){
            let posX: number = startX;
            let posY: number = startY || generateValue(scale);
            let bx: number = generateValue(scale*2);
            let height: number = generateValue(scale*2);
            let convex: number = generateValue(scale*2);
            
            
            let path: number[] = (type == 'pentagon')? [ posX, posY, 
                                                        posX-bx, posY, 
                                                        posX-bx-convex, posY-height/2, 
                                                        posX-bx/2, posY-height, 
                                                        posX+convex, posY-height/2]:
                                (type == 'hexagon')? [  posX, posY, 
                                                        posX-bx, posY, 
                                                        posX-bx-convex, posY-height/2, 
                                                        posX-bx, posY-height, 
                                                        posX, posY-height,
                                                        posX+convex, posY-height/2]:
                                                        null
                                   
            
            shape.drawPolygon(path);
            (type=="pentagon")? shapes.pentagons.push(shape):
            (type=="hexagon")? shapes.hexagons.push(shape): null 
            shape.name = type;
        }

        let shapesCreateFuncs = [createRect, createCircle, createEllipse, createTriangle, createPolygon, createPolygon];
        
        shape.beginFill(Math.random() * 0xffffff);
        let i = Math.floor(Math.random() * shapesCreateFuncs.length);
        (i==shapesCreateFuncs.indexOf(createPolygon))? shapesCreateFuncs[i](this.posX, this.posY, 'pentagon'):
        (i==shapesCreateFuncs.indexOf(createPolygon)+1)? shapesCreateFuncs[i](this.posX, this.posY, 'hexagon'):   
                                                        shapesCreateFuncs[i](this.posX, this.posY, null );
        
        shape.endFill();
        shape.position.y = - shape.height;
        return shape;
    }
    
}

function generateValue(scale): number{
    return Math.floor(Math.random() * scale);
}
function generatePoint(): number{
    return Math.random() * scale * (Math.random()>0.5?-1:1)
}
function clicked(event): void{
    colorShapes(event.target);
    destroyFigure(event.target);
}