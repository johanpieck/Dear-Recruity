import {Component, Input, OnInit} from '@angular/core';
import {Test} from "../types";
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-test-detail',
  templateUrl: './test-detail.component.html',
  styleUrls: ['./test-detail.component.css']
})
export class TestDetailComponent implements OnInit {
  test: Test;

  constructor(
      private route: ActivatedRoute,
      private httpClient: HttpClient
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.httpClient.get<Test>(`http://localhost/api/test/${id}`).subscribe(test => this.test = test);
  }

}
