import { Component, OnInit } from '@angular/core';
import { Blog } from './blog';
import { ApiService } from 'src/app/api.service';
import { FormGroup } from '@angular/forms';
import { UploadBlog } from '../home/task';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  profile_img = '';
  blogs: Blog[];
  progress: string;
  progress_dot = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  name: string;
  mi_number: string;

  
  cover = 'none';
  content_border = 'none';
  subject_border = 'none';
  last_click = 'none';
  blog_cover = false;
  blogForm:FormGroup;
  upload_obj: UploadBlog = {
    content: '',
    image: null,
    rid: '',
    topic: '',
  }
  curr_level = 'BRONZE';
  next_level = 'SILVER';

  constructor(private apiService: ApiService, private http: HttpClient) { }

  ngOnInit(): void {
    if (localStorage.getItem('level') == 'level 2'){
      this.curr_level = "SILVER";
      this.next_level = "GOLD";
    }
    if (this.apiService.blogs == null){
      this.apiService.getBlogs()
      .subscribe(data => {
        // console.log(data);
        data.reverse();
        data.forEach(element => {
          element.pic_url = 'https://api3.moodi.org' + element.pic_url;
          // console.log(element.pic_url)
        });
        this.blogs = data;
        this.apiService.setBlogs(data);
      },
        error => {console.log(error)},
        // () => {console.log("Yaha");}
      );
    } else {
      this.blogs = this.apiService.blogs;
    }
    this.profile_img = localStorage.getItem('pic_url');
    this.name = localStorage.getItem('name');
    this.mi_number = localStorage.getItem('mi_number');
    this.progress = localStorage.getItem('progress');
    for (let i = parseFloat(this.progress); i < 100;){
      this.progress_dot[Math.floor(i/10)] = 0.5;
      i += 10;
    }
    this.upload_obj.rid = localStorage.getItem('referral_code');
  }
  
  onFileChange(event){
    if(event.target.files.length>0){
      this.upload_obj.image = event.target.files[0];
    }
  }
  
  post_blog(){
    this.blog_cover = true;
    this.last_click = 'outer';
  }

  test(text: string){
    // console.log(text);
    if (this.last_click == text){
      this.blog_cover = false;
    }
    this.last_click = text;
  }

  submit_blog(){
    // console.log(this.upload_obj);
    const formdata = new FormData();
    formdata.append('referral_code', this.upload_obj.rid);
    formdata.append('topic', this.upload_obj.topic);
    formdata.append('content', this.upload_obj.content);
    formdata.append('image', this.upload_obj.image);
    this.http.post("https://api3.moodi.org/addblog",formdata)
    .subscribe(
      response => { this.test('outer'); alert("Blog uploaded successfully! Once approved by our team, it will be shown on the blog.") },
      error => { console.log(error); alert("There was some error, please try again later."); }
    )
  }

  toggle_navbar(){
    // console.log('toggle nav bar');
  }

}
