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

  // posts: Post[] = [];
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
  this.updateListAllPosts();
}

  updateListAllPosts(){
    this.postService.getAllPosts().then((res: Post[]) => {
      this.posts = res;
    });
  }

  addPost() {
    this.postService.addPost(this.form.value);
    this.updateListAllPosts();
    this.form.reset();
  }
  
  markAsDone(post: Post) {
    post.done = !post.done;
    this.postService.updatePostItem(post);
    this.updateListAllPosts();
  }
  
  deletePost(post: Post) {
    this.postService.deletePostItem(post);
    this.updateListAllPosts();
  }
}
