import { Component, OnInit } from '@angular/core';
import { Test} from "../types";
import { HttpClient} from "@angular/common/http";
import { Observable} from "rxjs/Observable";

@Component({
  selector: 'app-test-overview',
  templateUrl: './test-overview.component.html',
  styleUrls: ['./test-overview.component.css']
})
export class TestOverviewComponent implements OnInit {
  tests$: Observable<Test[]>;

  selectedTest: Test;

  constructor(
      private httpClient: HttpClient
  ) { }

  ngOnInit() {
    this.tests$ = this.httpClient.get<Test[]>('http://localhost/api/tests');
  }

  onSelect(test: Test) {
    this.selectedTest = test;
  }
}
