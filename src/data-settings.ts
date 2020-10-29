import * as PIXI from 'pixi.js';

export const stage = {
    height: 400,
    width: 600,
}

export const app = new PIXI.Application({width: stage.width, 
    height: stage.height,
    antialias: true,
    transparent: false, 
    resolution: 1        
});

app.stage.interactive;
app.stage.buttonMode;

export const gameContainer = new PIXI.Container();
gameContainer.interactive = true;
gameContainer.hitArea = new PIXI.Rectangle(0, 0, stage.width, stage.height)

app.stage.addChild(gameContainer);

export class ExistedShapes {
    rectangles: PIXI.Graphics[];
    circles: PIXI.Graphics[];
    ellipses: PIXI.Graphics[];
    triangles: PIXI.Graphics[];
    pentagons: PIXI.Graphics[];
    hexagons: PIXI.Graphics[];
    
    constructor (){
        this.rectangles = [];
        this.circles = [];
        this.ellipses = [];
        this.triangles = [];
        this.pentagons = [];
        this.hexagons = [];
    };

    public calcQuantity(): number {
        return this.rectangles.length + this.circles.length + this.ellipses.length + this.triangles.length + this.pentagons.length + this.hexagons.length; 
    };
    public calcRectArea(): number {
        let totalRectArea = 0;
        this.rectangles.forEach(item => {
            totalRectArea += item.height * item.width;
        });
        return totalRectArea
    }
    public calcCircleArea():number{
        let totalCircleArea = 0;
        this.circles.forEach(item =>{
            totalCircleArea+= Math.PI * (item.height/2) ** 2; 
            
        });
        return totalCircleArea;
    }
    public calcEllipseArea():number{
        let totalEllipseArea = 0;
        this.ellipses.forEach(item =>{
            totalEllipseArea+= Math.PI * item.height/2 * item.width; 
            
        });
        return totalEllipseArea;
    }
    public calcTriangleArea():number{
        let totalTriangleArea = 0;
        this.triangles.forEach(item =>{
            totalTriangleArea += item.width * item.height / 2;
        });
        return totalTriangleArea;
    }
    public calcPentagonArea():number{
        let totalPentagonArea = 0;
        this.pentagons.forEach(item =>{
            totalPentagonArea += item.height*item.width;
        });
        return totalPentagonArea;
    }
    public calcHexagonArea():number{
        let totalHexagonArea = 0;
        this.hexagons.forEach(item =>{
            totalHexagonArea += item.height*item.width;
            
        });
        return totalHexagonArea;
    }

};

export const shapes = new ExistedShapes;