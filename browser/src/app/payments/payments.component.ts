import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormGroup, FormControl } from '@angular/forms';
import Utils from '../utils';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
})
export class PaymentsComponent implements OnInit {
  error = false;
  timer = 2;
  code: string = '';
  grid: any = [];
  status: boolean = false;
  interval: boolean = false;
  paymentsForm = new FormGroup({
    name: new FormControl(''),
    amount: new FormControl(''),
  });
  required = 'Field is required';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    if (this.interval) {
      clearInterval(this.updateGrid());
      this.interval = false;
    } else {
      this.getCurrentCode();
      setInterval(() => {
        this.interval = true;
        this.updateGrid();
      }, 1000);
    }

    this.getPaymentsList();
  }

  getPaymentsList() {
    this.apiService.getAllPayments().subscribe((data) => {
      this.tableBuilder(data);
    });
  }

  getCurrentCode() {
    this.apiService.getCode().subscribe((data) => {
      this.code = data.code;
      this.grid = data.grid;
      this.status = true;
    });
  }

  updateGrid(): any {
    let counter = this.timer;
    counter--;
    this.timer = counter < 0 ? 0 : counter;
    if (counter < 0) {
      this.timer = 2;
      this.getCurrentCode();
    }
  }

  addPayment() {
    let name = this.paymentsForm.value.name;
    let amount = this.paymentsForm.value.amount;

    if (
      name !== undefined &&
      name !== null &&
      name !== '' &&
      amount !== null &&
      amount !== ''
    ) {
      let dataToSend: any = {
        name,
        amount,
        code: this.code,
        grid: this.grid,
      };

      this.apiService.createPayment(dataToSend).subscribe((res: any) => {
        if (res.msg === 'created') {
          this.tableBuilder(dataToSend);
          this.paymentsForm.reset();
        }
      });
    } else {
      this.error = true;
      setTimeout(() => (this.error = false), 5000);
    }
  }

  tableBuilder(data: any) {
    let tableRef: any = document.getElementById('payments-table');
    if (tableRef !== null) {
      if (Array.isArray(data)) {
        const normalizedData = this.normalizeTableData(data);
        normalizedData.forEach((item: any) => {
          this.buildTable(tableRef, item);
        });
        return;
      }

      this.buildTable(tableRef, data);
      return;
    }
  }

  buildTable(tableRef: any, entries: any) {
    let newRow = tableRef.insertRow(-1);
    // insert new Row on Table
    let size = Object.keys(entries).length;
    for (let i = 0; i < size; i++) {
      const objValues: any = Object.values(entries);
      let newCell = newRow.insertCell(i);
      if (i === 3) {
        newCell.innerHTML = `<div id="grid-${objValues[0]}">${objValues[i]}</div>`;
        setTimeout(() => {
          Utils.gridBuilder(`grid-${objValues[0]}`, objValues[i]);
        }, 100);
      } else {
        newCell.innerHTML = objValues[i];
      }
    }
  }

  normalizeTableData(data: any) {
    let normalized: any = [];
    data.forEach((el: any) => {
      let obj = {
        name: Object.keys(el)[0],
        amount: el[Object.keys(el)[0]].amount,
        code: el[Object.keys(el)[0]].code,
        grid: el[Object.keys(el)[0]].grid,
      };
      normalized.push(obj);
    });

    return normalized;
  }
}
