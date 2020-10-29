import { shapes } from "./data-settings";

export function calcShapes (): void {
    let totalShapes = String (shapes.calcQuantity());
    document.querySelector('#quantity').innerHTML = totalShapes;
}

export function calcSurfaceArea(): void {
    let totalSurfaceArea = String (shapes.calcRectArea() + shapes.calcCircleArea() + shapes.calcEllipseArea() + shapes.calcTriangleArea() + shapes.calcPentagonArea() + shapes.calcHexagonArea());
    document.querySelector('#surfaceArea').innerHTML = totalSurfaceArea;
  
    
}

