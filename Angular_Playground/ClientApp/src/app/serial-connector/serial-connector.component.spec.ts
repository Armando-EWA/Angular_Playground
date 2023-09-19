import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SerialConnectorComponent } from './serial-connector.component';

describe('SerialConnectorComponent', () => {
  let component: SerialConnectorComponent;
  let fixture: ComponentFixture<SerialConnectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SerialConnectorComponent]
    });
    fixture = TestBed.createComponent(SerialConnectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
