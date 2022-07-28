import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: "list",
    loadChildren: () =>
      import("./main/main.module").then(root=>root.MainModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
