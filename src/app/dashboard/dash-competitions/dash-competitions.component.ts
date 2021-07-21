import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Task, UploadBlog } from './task';
import { Blog } from '../blog/blog';
import { ApiService } from 'src/app/api.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Target } from './target';
import { url } from 'inspector';



export interface Genre {
  name: string,
  code: string,
  selected: string,
  unselected: string,
  img: string,
}

export interface Compi {
  id: number,
  genre: Genre,
  name: string,
  subtitles: string,
  rules: string,
  prizes_lyp: string,
  previous_winners: string,
  registered: Boolean,
  is_group: Boolean,
  min_participants: number,
  max_participants: number,
}

@Component({
  selector: 'app-dash-competitions',
  templateUrl: './dash-competitions.component.html',
  styleUrls: ['./dash-competitions.component.css']
})
export class DashCompetitionsComponent implements OnInit {

  progress: string;
  progress_dot = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  name: string;
  mi_number: string;
  curr_level = 'BRONZE';
  next_level = 'SILVER';
  profile_img: string;
  zone: string = '';
  genre: Genre;
  // genre_img = "../../../assets/Compi/Compi Images/Dance_img.jpg"
  genres: Genre[] = [
    {
      name: "NEW ENTRIES",
      code: 'Group',
      selected: "../../../assets/Compi/svg/group_blue.svg",
      unselected: "../../../assets/Compi/svg/group.svg",
      img: "compi-img img0",
    },
    {
      name: "DANCE",
      code: 'Dance',
      selected: "../../../assets/Compi/svg/001-dancing_blue.svg",
      unselected: "../../../assets/Compi/svg/001-dancing.svg",
      img: "compi-img img1",
    },
    {
      name: "DESIGN & DIGITAL ARTS",
      code: 'Design & Digital Arts',
      selected: "../../../assets/Compi/svg/008-color-palette_blue.svg",
      unselected: "../../../assets/Compi/svg/008-color-palette.svg",
      img: "compi-img img2",
    },
    {
      name: "DRAMATICS",
      code: 'Dramatics',
      selected: "../../../assets/Compi/svg/003-theater_blue.svg",
      unselected: "../../../assets/Compi/svg/003-theater.svg",
      img: "compi-img img3",
    },
    {
      name: "FINE ARTS",
      code: 'Fine Arts',
      selected: "../../../assets/Compi/svg/007-paint-palette_blue.svg",
      unselected: "../../../assets/Compi/svg/007-paint-palette.svg",
      img: "compi-img img4",
    },
    {
      name: "JOURNALISM & COMMUNICATION",
      code: 'Journalism & Communication',
      selected: "../../../assets/Compi/svg/009-newspaper_blue.svg",
      unselected: "../../../assets/Compi/svg/009-newspaper.svg",
      img: "compi-img img5",
    },
    {
      name: "LITERARY ARTS",
      code: 'Literary Arts',
      selected: "../../../assets/Compi/svg/005-papyrus_blue.svg",
      unselected: "../../../assets/Compi/svg/005-papyrus.svg",
      img: "compi-img img6",
    },
    {
      name: "SPEAKING ARTS",
      code: 'Speaking Arts',
      selected: "../../../assets/Compi/svg/004-politician_blue.svg",
      unselected: "../../../assets/Compi/svg/004-politician.svg",
      img: "compi-img img7",
    },
    {
      name: "MAGIC & LIFESTYLE",
      code: 'Magic & Lifestyle',
      selected: "../../../assets/Compi/svg/006-witch-hat_blue.svg",
      unselected: "../../../assets/Compi/svg/006-witch-hat.svg",
      img: "compi-img img8",
    },
    {
      name: "MUSIC",
      code: 'Music',
      selected: "../../../assets/Compi/svg/002-music_blue.svg",
      unselected: "../../../assets/Compi/svg/002-music.svg",
      img: "compi-img img9",
    },
  ]

  compis: Compi[];
  selected_compi: Compi;
  insta_link: string = '';
  fb_link: string = '';
  details = false;
  last_click: string = '';

  // rules = "<ol><li><b>Team Size</b>: Solo</li><li><b>Rounds</b>: Online eliminations, Semi-Finals/Finals</li><li><b>Styles</b>: Classical (Semi-Classical is not allowed)</li><li><b>Judging Criteria</b>: Nritta (pure dance), Abhinaya (Facial expressions), Body language, Footwork, Hand and eye movements, Presentation, Choreography (technical perfection), Overall clarity</li><li><b>Deadline for submission: 25th November 2020, 11:59 PM</b></li><br><li><b>Eliminations (Online):</b><ul><li>First register for the competition</li><li>The video must be recorded after 25th September 2020</li><li><b>Time Limit; 3 - 5 minutes</b> (including narration time)</li><li>Submission:<ul><li>Rename the recorded video as “<Your MI Number> - Nrityanjali”</li><li>Mail the video to nrityanjali2020@moodi.org. The subject of the mail should be  'Nrityanjali - <Your MI Number> - <Your Name></li><li>If we receive your entry, you will get a confirmation mail stating that your entry has been received. If you do not receive it, then resend the mail and check that you are mailing at the correct email address</li></ul></li></ul></li><br><li><b>Bonus: </b>A chance to get featured on our Media pages<ul><li>In addition to sending the video on mail, participants can choose to upload the same entry from their PUBLIC Instagram accounts. Top entries shall be published from the official Mood Indigo Competitions page on Instagram</li><li>Participants need to tag @iitbombay.moodi and @competitions.moodi in the video</li><li>The hashtags #moodindigo, #goldenjubilee and #nrityanjali2020 need to be used in the caption</li></ul></li><br><li><b>Semi-Finals/Finals: </b><ul><li>The rules for higher rounds will be announced soon</li></ul></li><br><li><b>General Rules: </b><ul><li>Participants will have to perform any one of the following classical dances of India:  Kathak, Bharatanatyam, Kathakali, Mohiniyattam, Manipuri, Sattriya, Kuchipudi, Odissi, and Gaudiya Nritya. No other dance form is allowed. However, different forms will not be judged separately</li><li>The music should be strictly classical. Film songs are not allowed.</li><li>Narration time should not exceed the limit (For eliminations - 30 seconds).</li><li>The obscenity of any kind is not allowed and will lead to immediate disqualification.</li><li>The video must be recorded from a static camera. Videos having multiple angles/moving cameras are strictly not allowed</li><li>The decision of the judges will be final and binding.</li></ul></li></ol>"
  // prizes = "<ol><li><b>PRIZES</b><ul><br><li>1st: TBA</li><li>2nd: TBA</li><li>3rd: TBA</li></ul></li></ol>"
  // previous = "<ol><li><b>2019-</b><ul><br><li>1st: Tulika Reema</li><li>2nd: Supriya Gupta</li><li>3rd: Karnika Dutta</li></ul></li><br><br><li><b>2018-</b><ul><br><li>1st: Shagun Agrawal</li><li>2nd: Niyati Visal</li><li>3rd: Shrawani Mahishi and Mohini Jadhav</li></ul></li></ol>"


  constructor(private router: Router, private apiService: ApiService, private fb: FormBuilder, private sanitizer: DomSanitizer) {
    this.router.navigate(['/dashboard/']);
   }

  ngOnInit(): void {
    this.genre = this.genres[0];
    this.profile_img = localStorage.getItem('pic_url');
    if (localStorage.getItem('level') == 'level 2') {
      this.curr_level = "SILVER";
      this.next_level = "GOLD";
    }
    this.progress = localStorage.getItem('progress');
    for (let i = parseFloat(this.progress); i < 100;) {
      this.progress_dot[Math.floor(i / 10)] = 0.5;
      i += 10;
    }
    this.name = localStorage.getItem('name');
    this.mi_number = localStorage.getItem('mi_number');
    this.set_zone();
    this.change_genre(this.genre);
  }

  change_genre(to: Genre) {
    this.genre = to;
    this.apiService.get_compis(this.genre.code, localStorage.getItem('referral_code'))
      .subscribe(
        response => {
          console.log(response);
          this.compis = response;
          this.selected_compi = this.compis[0];
        },
        error => { console.log(error); }
      )
  }

  get_genre_name(genre: string){
    if ((genre == "DANCE") ||(genre == "MUSIC") ||(genre == "DRAMATICS") ||(genre == "FINE ARTS") ||(genre == "SPEAKING ARTS")){
      return genre;
    }
    return "OVERALL LEADERBOARD";
  }

  change_compi(compi: Compi){
    // this.selected_compi = compi;
    this.router.navigate(['dashboard/competitions/' + compi.id]);
  }

  set_zone() {
    var state = localStorage.getItem('state');
    if ((state == "Andhra Pradesh") || (state == "Karnataka") || (state == "Telangana") || (state == "Tamil Nadu") || (state == "Kerala")) {
      this.zone = "SOUTH ZONE";
    } else if ((state == "West Bengal") || (state == "Sikkim") || (state == "Arunachal Pradesh") || (state == "Meghalaya") || (state == "Assam") || (state == "Nagaland") || (state == "Manipur") || (state == "Mizoram") || (state == "Tripura")) {
      this.zone = "EAST ZONE";
    } else if ((state == "Madhya Pradesh") || (state == "Chhattisgarh") || (state == "Bihar") || (state == "Jharkhand") || (state == "Orissa")) {
      this.zone = "CENTRAL ZONE";
    } else if ((state == "Rajasthan") || (state == "Maharashtra") || (state == "Gujarat") || (state == "Goa")) {
      this.zone = "WEST ZONE";
    } else if ((state == "Himachal Pradesh") || (state == "Punjab") || (state == "Uttarakhand") || (state == "Haryana") || (state == "Uttar Pradesh")) {
      this.zone = "NORTH ZONE";
    } else {
      this.zone = "NORTH ZONE";
    }
  }

  showBlog() {
    this.router.navigate(['blog']);
  }


  test(text: string){
    // console.log(text);
    if (this.last_click == text){
      this.details = false;
    }
    this.last_click = text;
  }

  register(){
    // this.details = true;
    this.reg();
    this.selected_compi.registered = true;
  }

  reg(){
    this.apiService.compi_reg(this.selected_compi)
    .subscribe(
      response => {
        if (response['status'] == "User Not Found"){
          console.log(response);
          alert("There was some error, please try again after sometime");
          this.selected_compi.registered = false;
        } else{
          if (response['status'] == "Successfully Registered"){
            this.selected_compi.registered = true;
          }
          alert(response['status']);
        }
      },
      error => {
        console.log(error);
        alert("There was some error, please try again after sometime.");
        this.selected_compi.registered = false; 
      }
    )
  }

  // submit_details(){
  //   console.log(this.fb_link);
  //   console.log(this.insta_link);
  //   this.reg();
  //   this.details = false;
  //   this.apiService.compi_details(this.insta_link, this.fb_link)
  //   .subscribe(
  //     response => {
  //       console.log(response)
  //     },
  //     error => {
  //       console.log(error)
  //     }
  //   )
  // }

  // skip_details(){
  //   this.reg();
  //   this.details = false;
  // }

  toggle_navbar() {
    // console.log('toggle nav bar');
  }
}
