//import class
import './ObstacleGestion';
import {ObstacleGestion, Shape} from './ObstacleGestion';

const canvas = document.getElementById("app") as HTMLCanvasElement;
const context = canvas.getContext("2d") as CanvasRenderingContext2D;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 100;
const canvas_width = canvas.width;
const canvas_height = canvas.height;
let shapes: Shape[] = []
const obstacleGestion = new ObstacleGestion(canvas, context, shapes)





canvas.onmousedown = (event: MouseEvent) => {
  obstacleGestion.onMouseDown(event);
};
canvas.onmouseup = (event: MouseEvent) =>{
  obstacleGestion.onMouseUp(event)
};
canvas.onmouseout = (event: MouseEvent) => {
  obstacleGestion.onMouseOut(event);
};
canvas.onmousemove = (event: MouseEvent) => {
  obstacleGestion.onMouseMove(event, draw);
};
canvas.onclick = (event: MouseEvent) => {
  obstacleGestion.onClick(event, draw);
}
canvas.ondblclick = (event: MouseEvent) => {
  obstacleGestion.onDoubleClick(event, draw);
}
canvas.oncontextmenu = (event: MouseEvent) => {
  obstacleGestion.onClick(event, draw, );
};
document.addEventListener("keydown", (event: KeyboardEvent) => {
  if(event.key === "t"){
    console.log(event.key)
  canvas.onclick = (event: MouseEvent) => {
    obstacleGestion.toTop(event, draw);
  }
}

});



const draw = () => {
  context.clearRect(0, 0, canvas_width, canvas_height);
  obstacleGestion.shapes.forEach((shape: any) => {
    context.fillStyle = shape.color;
    context.fillRect(shape.x, shape.y, shape.width, shape.height);
  });
};
draw();
