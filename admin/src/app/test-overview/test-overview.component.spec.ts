import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestOverviewComponent } from './test-overview.component';

describe('TestOverviewComponent', () => {
  let component: TestOverviewComponent;
  let fixture: ComponentFixture<TestOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
