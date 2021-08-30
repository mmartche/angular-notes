import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from './post';
import { OnlineOfflineService } from '../shared/online-offline.service';
import { PostService } from './posts.service';

@Component({
  selector: 'posts-root',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  title = 'To Do List';
  form: FormGroup;

  posts: Post[] = [];

  constructor(
    private readonly postService: PostService,
    public readonly onlineOfflineService: OnlineOfflineService
  ) {
    this.form = new FormGroup({
      value: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.posts = this.postService.getAllPosts();
  }

  addPost() {
    this.postService.addPost(this.form.value);

    this.form.reset();
  }

  markAsDone(post: Post) {
    post.done = !post.done;
  }
}
