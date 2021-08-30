import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';
import Dexie from 'dexie';
import { Post } from './post';
import { OnlineOfflineService } from '../shared/online-offline.service';

@Injectable({ providedIn: 'root' })
export class PostService {
  private posts: Post[] = [];
  private db: any;

  constructor(private readonly onlineOfflineService: OnlineOfflineService) {
    this.registerToEvents(onlineOfflineService);

    this.createDatabase();
  }

  addPost(post: Post) {

    post.id = UUID.UUID();
    post.done = false;
    this.posts.push(post);

    if (!this.onlineOfflineService.isOnline) {
      this.addToIndexedDb(post);
    }
  }

  getAllPosts() {
    return this.posts;
  }

  private registerToEvents(onlineOfflineService: OnlineOfflineService) {
    onlineOfflineService.connectionChanged.subscribe(online => {
      if (online) {
        console.log('went online');
        console.log('sending all stored items');
        this.sendItemsFromIndexedDb();
      } else {
        console.log('went offline, storing in indexdb');
      }
    });
  }

  private createDatabase() {
    this.db = new Dexie('MyTestDatabase');
    this.db.version(1).stores({
      posts: 'id,value,done'
    });
  }

  private addToIndexedDb(post: Post) {
    this.db.posts
      .add(post)
      .then(async () => {
        const allItems: Post[] = await this.db.posts.toArray();
        console.log('saved in DB, DB is now', allItems);
      })
      .catch((e: { stack: any; }) => {
        alert('Error: ' + (e.stack || e));
      });
  }

  private async sendItemsFromIndexedDb() {
    const allItems: Post[] = await this.db.posts.toArray();
    allItems.forEach((item: Post) => {
      this.db.posts.delete(item.id).then(() => {
        console.log(`item ${item.id} sent and deleted locally`);
      });
    });
  }
}
