import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtworkPageComponent } from './artwork-page.component';

describe('ArtworkPageComponent', () => {
  let component: ArtworkPageComponent;
  let fixture: ComponentFixture<ArtworkPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtworkPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtworkPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
