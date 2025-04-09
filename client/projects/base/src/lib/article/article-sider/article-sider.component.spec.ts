import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleSiderComponent } from './article-sider.component';

describe('ArticleSiderComponent', () => {
  let component: ArticleSiderComponent;
  let fixture: ComponentFixture<ArticleSiderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleSiderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ArticleSiderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
