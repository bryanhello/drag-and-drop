export interface Shape {
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
  }
  
  export class ObstacleGestion {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    shapes: Shape[];
    shapeIndex: number;
    isDragging: boolean;
  
    constructor(
      canvas: HTMLCanvasElement,
      context: CanvasRenderingContext2D,
      shapes: Shape[] = []
    ) {
      this.canvas = canvas;
      this.context = context;
      this.shapes = shapes;
      this.shapeIndex = 0;
      this.isDragging = false;
    }
  
    isMouseInShape(startX: number, startY: number, shape: Shape): boolean {
      return (
        startX >= shape.x &&
        startX <= shape.x + shape.width &&
        startY >= shape.y &&
        startY <= shape.y + shape.height
      );
    }
  
    onMouseDown(event: MouseEvent): void {
      if (event.button !== 0) {
        return;
      }
      
      event.preventDefault();
      const startX = event.clientX;
      const startY = event.clientY;
      this.shapes.forEach((shape, index) => {
        if (this.isMouseInShape(startX, startY, shape)) {
          this.shapeIndex = index;
          this.isDragging = true;
          return;
        }
      });
    }
  
    onMouseUp(event: MouseEvent): void {
      if (!this.isDragging) {
        return;
      }
      event.preventDefault();
      this.isDragging = false;
      
    }
  
    onMouseOut(event: MouseEvent): void {
      if (!this.isDragging) {
        return;
      }
      event.preventDefault();
      this.isDragging = false;
    }
  
    onMouseMove(event: MouseEvent, renderFunc: () => void): void {
      if (!this.isDragging) {
        return;
      }
      event.preventDefault();
      const mouseX = event.clientX;
      const mouseY = event.clientY;
      const shape = this.shapes[this.shapeIndex];
      shape.x = mouseX - shape.width / 2;
      shape.y = mouseY - shape.height / 2;
      renderFunc();
    }
  
    getRandomColor(): string {
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += Math.floor(Math.random() * 16).toString(16);
      }
      return color;
    }
  
    onClick(event: MouseEvent, renderFunc: () => void): void {
      event.preventDefault();
      const startX = event.clientX;
      const startY = event.clientY;
      const randomWidth = Math.floor(Math.random() * 100) + 50;
      const randomHeight = Math.floor(Math.random() * 100) + 50;
      // Detecter le clic droit pour ajouter une forme
      if (event.button === 2) {
        this.shapes.push({
          x: startX - randomWidth / 2,
          y: startY - randomHeight / 2,
          width: randomWidth,
          height: randomHeight,
          color: this.getRandomColor(),
        });
        renderFunc();
        return;
      }
    }
  
    onDoubleClick(event: MouseEvent, renderFunc: () => void): void {
      event.preventDefault();
      const startX = event.clientX;
      const startY = event.clientY;
      this.shapes.forEach((shape, index) => {
        if (this.isMouseInShape(startX, startY, shape)) {
          this.shapes.splice(index, 1);
          renderFunc();
          return;
        }
      });
    }
    toTop(event: MouseEvent, renderFunc: () => void): void {
        event.preventDefault();
        
        const startX = event.clientX;
        const startY = event.clientY;
        this.shapes.forEach((shape, index) => {
            if (this.isMouseInShape(startX, startY, shape)) {
            this.shapes.push(this.shapes.splice(index, 1)[0]);
            renderFunc();
            return;
            }
        });
    }
  }
  