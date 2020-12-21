import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: "root",
})
export class PostService {
    constructor(private http: HttpClient) {}

  createPost(postData: Post) {
    return this.http
      .post<{ name: string }>(
        "https://learnangular-a702d-default-rtdb.firebaseio.com/posts.json",
        postData
      )
  }

  fetchPosts() {
    return this.http.get<{[key: string]: Post}>('https://learnangular-a702d-default-rtdb.firebaseio.com/posts.json')
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
  }

  deletePosts() {
      return this.http.delete('https://learnangular-a702d-default-rtdb.firebaseio.com/posts.json')
  }
}
