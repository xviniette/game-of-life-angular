import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Game-of-life-angular';
  pixelSize = 4;
  numCells = 160;

  @ViewChild('canvas', {static: true})
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
    this.dataArray[50][70] = 1;
    this.dataArray[51][70] = 1;
    this.dataArray[52][70] = 1;
    this.dataArray[53][70] = 1;
    this.dataArray[54][70] = 1;
    this.dataArray[55][70] = 1;
    this.dataArray[56][70] = 1;
    this.dataArray[57][70] = 1;

    this.dataArray[59][70] = 1;
    this.dataArray[60][70] = 1;
    this.dataArray[61][70] = 1;
    this.dataArray[62][70] = 1;
    this.dataArray[63][70] = 1;

    this.dataArray[67][70] = 1;
    this.dataArray[68][70] = 1;
    this.dataArray[69][70] = 1;

    this.dataArray[76][70] = 1;
    this.dataArray[77][70] = 1;
    this.dataArray[78][70] = 1;
    this.dataArray[79][70] = 1;
    this.dataArray[80][70] = 1;
    this.dataArray[81][70] = 1;
    this.dataArray[82][70] = 1;

    this.dataArray[84][70] = 1;
    this.dataArray[85][70] = 1;
    this.dataArray[86][70] = 1;
    this.dataArray[87][70] = 1;
    this.dataArray[88][70] = 1;

  }

  computeNextGeneration(arr): Array<Array<number>> {
    // clear existing data
    const newArr = this.buildInitialArray();
    return newArr;
  }


}
