import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];
  isFetching = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPost();
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    this.http.post<{name: string}>('https://learnangular-a702d-default-rtdb.firebaseio.com/posts.json', postData).subscribe(
      responseData => {
        console.log(responseData ,postData);
      }
    )
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPost();
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPost() {
    this.isFetching = true;
    this.http.get<{[key: string]: Post}>('https://learnangular-a702d-default-rtdb.firebaseio.com/posts.json')
    .pipe(map(
      responseData => {
        const postsArray: Post[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
            postsArray.push({...responseData[key], id: key});
           }
         }
        return postsArray;
      }
    ))
    .subscribe(
      posts => {
        this.isFetching = false;
        this.loadedPosts = posts;
      }
    )
  }
}
