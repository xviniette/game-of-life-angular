import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Game-of-life-angular';
  pixelSize = 4;
  numCells = 160;

  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;

  private dataArray: Array<Array<number>>;
  private context: CanvasRenderingContext2D;

  ngOnInit(): void {
    this.canvas.nativeElement.width = this.pixelSize * this.numCells;
    this.canvas.nativeElement.height = this.pixelSize * this.numCells;
    this.context = this.canvas.nativeElement.getContext('2d');
    this.dataArray = this.buildInitialArray();

    // this.randomlyPopulate(this.dataArray);
    this.manualSetup(this.dataArray);
    this.display(this.dataArray);

    setInterval(
      () => {
        const newArr = this.computeNextGeneration(this.dataArray);
        this.display(newArr);
        this.dataArray = newArr;
      }, 100);
  }

  private buildInitialArray(): Array<Array<number>> {
    const arr = [];
    for (let i = 0; i < this.numCells; i++) {
      const innerArr = [];
      for (let j = 0; j < this.numCells; j++) {
        innerArr.push(0);
      }
      arr.push(innerArr);
    }
    return arr;
  }

  display(arr): void {
    for (let x = 0; x < arr.length; x++) {
      for (let y = 0; y < arr[x].length; y++) {
        this.drawCell(x, y, arr[x][y]);
      }
    }
  }

  drawCell(x, y, alive): void {
    this.context.beginPath();
    this.context.rect(x * this.pixelSize, y * this.pixelSize, this.pixelSize, this.pixelSize);
    this.context.fillStyle = alive ? 'black' : '#EEE';
    this.context.fill();
  }

  randomlyPopulate(arr): void {
    for (let x = 0; x < arr.length; x++) {
      for (let y = 0; y < arr[x].length; y++) {
        if (Math.log(Math.random() * 10) < -0.6) {
          arr[x][y] = 1;
        }
      }
    }
  }

  manualSetup(arr): void {
    arr[50][70] = 1;
    arr[51][70] = 1;
    arr[52][70] = 1;
    arr[53][70] = 1;
    arr[54][70] = 1;
    arr[55][70] = 1;
    arr[56][70] = 1;
    arr[57][70] = 1;

    arr[59][70] = 1;
    arr[60][70] = 1;
    arr[61][70] = 1;
    arr[62][70] = 1;
    arr[63][70] = 1;

    arr[67][70] = 1;
    arr[68][70] = 1;
    arr[69][70] = 1;

    arr[76][70] = 1;
    arr[77][70] = 1;
    arr[78][70] = 1;
    arr[79][70] = 1;
    arr[80][70] = 1;
    arr[81][70] = 1;
    arr[82][70] = 1;

    arr[84][70] = 1;
    arr[85][70] = 1;
    arr[86][70] = 1;
    arr[87][70] = 1;
    arr[88][70] = 1;
  }

  getNeighbors(arr, x, y): number {
    let neighbors: number = 0;

    for (let nx = x - 1; nx <= x + 1; nx++) {
      for (let ny = y - 1; ny <= y + 1; ny++) {
        if (nx == x && ny == y) continue; //central cell
        if (nx < 0 || ny < 0 || nx >= arr.length || ny >= arr[nx].length) continue; //out of bounds

        if (arr[nx][ny] == 1) neighbors++;
      }
    }

    return neighbors;
  }

  getNextCellState(currentState: number, neighbors: number): number {
    if (currentState == 1) {
      return neighbors >= 2 && neighbors <= 3 ? 1 : 0;
    } else {
      return neighbors == 3 ? 1 : 0;
    }
  }

  computeNextGeneration(arr): Array<Array<number>> {
    const newArr = arr.map(a => a.slice());

    for (let x = 0; x < arr.length; x++) {
      for (let y = 0; y < arr[x].length; y++) {
        let neighbors: number = this.getNeighbors(arr, x, y);
        newArr[x][y] = this.getNextCellState(arr[x][y], neighbors);
      }
    }

    return newArr;
  }


}
