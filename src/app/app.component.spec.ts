import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  describe("Neighboors count", () => {
    it('Should get the number of alive neighbors of a given cell - All alive', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      const array = [
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
      ]

      expect(app.getNeighbors(array, 1, 1)).toEqual(8);
    });

    it('Should get the number of alive neighbors of a given cell - All dead', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      const array = [
        [1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1],
      ]

      expect(app.getNeighbors(array, 2, 2)).toEqual(0);
    });

    it('Should manage the out of bouds in neighbors count', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      const array = [
        [0],
      ]
      expect(app.getNeighbors(array, 0, 0)).toEqual(0);
    });
  });

  describe("Cell alive rules", () => {
    it('Should live cell dies with fewer than 2 live neighbours', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      expect(app.getNextCellState(1, 1)).toEqual(0);
    });

    it('Should live cell dies with more than 3 live neighbours', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      expect(app.getNextCellState(1, 4)).toEqual(0);
    });

    it('Should live cell lives with 2 or 3 live neighbours', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      expect(app.getNextCellState(1, 2) == 1 && app.getNextCellState(1, 2) == 1).toBeTruthy();
    });

    it('Should dead cell lives 3 live neighbours', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      expect(app.getNextCellState(0, 3)).toEqual(1);
    });

    it('Should dead cell still dead with other than 3 live neighbours', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      expect(app.getNextCellState(0, 2) == 0 && app.getNextCellState(1, 4) == 0).toBeTruthy();
    });
  });

  it('Should all game rules be respected on all cells', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const toad1 = [
      [0, 0, 0, 0],
      [0, 1, 1, 1],
      [1, 1, 1, 0],
      [0, 0, 0, 0],
    ]

    const toad2 = [
      [0, 0, 1, 0],
      [1, 0, 0, 1],
      [1, 0, 0, 1],
      [0, 1, 0, 0],
    ]

    expect(app.computeNextGeneration(toad1)).toEqual(toad2);
  });
});
