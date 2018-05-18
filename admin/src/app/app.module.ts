import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TestOverviewComponent } from './test-overview/test-overview.component';
import { TestDetailComponent } from './test-detail/test-detail.component';
import {HttpClientModule} from "@angular/common/http";
import {RouterModule, Routes} from "@angular/router";
import {LogoComponent} from "./logo.component";

const routes: Routes = [
    { path: '', component: TestOverviewComponent },
    { path: 'detail/:id', component: TestDetailComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    TestOverviewComponent,
    TestDetailComponent,
      LogoComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
