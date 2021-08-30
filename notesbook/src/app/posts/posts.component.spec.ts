import { TestBed, async } from '@angular/core/testing';
import { PostsComponent } from './posts.component';

describe('PostsComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PostsComponent
      ],
    }).compileComponents();
  }));

  it('should create the posts', () => {
    const fixture = TestBed.createComponent(PostsComponent);
    const posts = fixture.debugElement.componentInstance;
    expect(posts).toBeTruthy();
  });

  it(`should have as title 'Angular-Online-Offline-Sync'`, () => {
    const fixture = TestBed.createComponent(PostsComponent);
    const posts = fixture.debugElement.componentInstance;
    expect(posts.title).toEqual('Angular-Online-Offline-Sync');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(PostsComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to Angular-Online-Offline-Sync!');
  });
});
