import { shapes } from "./data-settings";

export function colorShapes(target){
    
    let color = target.geometry.graphicsData[0].fillStyle.color;

    for (let key in shapes){

        shapes[key].forEach(figure => {
            
            if (target.name == figure.name ){
                figure.geometry.graphicsData[0].fillStyle.color = color;
                figure.geometry.invalidate();
            }
        });     
    }
}