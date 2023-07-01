import { Component, OnInit } from '@angular/core';
import axios from 'axios';

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

  ngOnInit() {}

  // start generator on click
  startGenerator() {
    this.createGrid();
    this.countdownTimer();
  }

  // Fetch and populate our random character grid
  createGrid = async () => {
    try {
      const resp = await axios.get('http://localhost:3000/code', {
        params: { character: this.character },
      });
      const gridContainer = document.getElementById('grid');
      if (gridContainer !== null) {
        gridContainer.innerHTML = '';

        resp.data.grid.forEach((element: any) => {
          element.forEach((letter: any) => {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.textContent = letter;
            gridContainer.appendChild(cell);
          });
        });
        this.code = resp.data.code;
        this.status = true;
      }
    } catch (err) {
      console.log(err);
    }
  };

  // starts countdown timer intervals
  countdownTimer(): any {
    setInterval(() => {
      let counter = this.timer;
      counter--;
      this.timer = counter < 0 ? 0 : counter;
      if (counter < 0) {
        this.timer = 2;
        this.createGrid();
      }
    }, 1000);
  }
}
