import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PostsComponent } from './posts.component';
import { CommonModule } from '@angular/common';
import { PostsRoutingModule } from './posts-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [PostsComponent],
  imports: [CommonModule, PostsRoutingModule, SharedModule],
  providers: [],
  bootstrap: [PostsComponent]
})
export class PostsModule {}
