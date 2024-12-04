import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatblockDetailComponent } from './statblock-detail.component';

describe('CommunicationDetailComponent', () => {
  let component: StatblockDetailComponent;
  let fixture: ComponentFixture<StatblockDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatblockDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatblockDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
