import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GridComponent } from './grid/grid.component';
import { PaymentsComponent } from './payments/payments.component';

const routes: Routes = [
  { path: '', component: GridComponent },
  { path: 'payments', component: PaymentsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
