import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import Utils from '../utils';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit {
  timer: number = 2;
  character: string = '';
  grid: any = [];
  code: string = '';
  status: boolean = false;
  interval: boolean = false;
  error = false;
  disableInput = false;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {}

  inputError(char: any) {
    this.error = char !== '' && char.match(/[a-zA-Z]/) === null;
  }

  onKey(event: any) {
    this.inputError(event.target.value);
    this.disableInput = true;
    setInterval(() => {
      this.disableInput = false;
    }, 4000);
  }

  // start generator on click
  startGenerator() {
    if (this.interval) {
      clearInterval(this.updateGrid());
      this.interval = false;
    } else {
      this.createGrid();
      setInterval(() => {
        this.interval = true;
        this.updateGrid();
      }, 1000);
    }
  }

  // Fetch and populate our random character grid
  createGrid() {
    this.apiService.getCode({ character: this.character }).subscribe((data) => {
      Utils.gridBuilder('grid', data.grid);
      this.code = data.code;
      this.status = true;
    });
  }

  // starts countdown timer intervals
  updateGrid(): any {
    let counter = this.timer;
    counter--;
    this.timer = counter < 0 ? 0 : counter;
    if (counter < 0) {
      this.timer = 2;
      this.createGrid();
    }
  }
}
