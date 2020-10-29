export let genShapeSpeed: number = 4000;
export let gravityValue: number = 0.2;

export function changeGenerationSpeed(step?: number){
    if (step){
       (genShapeSpeed - step > 0)? genShapeSpeed -= step: genShapeSpeed = 500;
    } 
    document.querySelector('#gen-speed-display').innerHTML = '1 in ' + genShapeSpeed/1000 + 'sec';
    return genShapeSpeed;
}
export function changeGravityValue(step?: number): number{
    (gravityValue + step > 0.1)? gravityValue += step: null 
    document.querySelector('#gravity-display').innerHTML = String(gravityValue);
    return gravityValue;
}