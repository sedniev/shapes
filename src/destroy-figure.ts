import { calcShapes, calcSurfaceArea } from "./counters";
import { app, gameContainer, shapes } from "./data-settings";

export function destroyFigure(figure){

    for (let key in shapes){
        let index = shapes[key].indexOf(figure);
        if (index > -1){
            shapes[key].splice(index, 1);
            gameContainer.removeChild(figure);
            app.ticker.remove(figure);
            calcShapes();
            calcSurfaceArea();
        }
    }
    
}
