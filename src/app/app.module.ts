import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatNativeDateModule} from '@angular/material/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { DetailsComponent } from './details/details.component';
import { SigninComponent } from './signin/signin.component';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { CcpComponent } from './ccp/ccp.component';
import { ProgramRegComponent } from './program-reg/program-reg.component';
import { ShopComponent } from './shop/shop.component';

// import { RellaxDirective } from 'ng-rellax';
import { CookieService } from 'ngx-cookie-service';
import { HomeComponent } from './dashboard/home/home.component';
import { BlogComponent } from './dashboard/blog/blog.component';
import { AssignmentsComponent } from './dashboard/assignments/assignments.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { ContactComponent } from './dashboard/contact/contact.component';
import { LeaderboardComponent } from './dashboard/leaderboard/leaderboard.component';
import { TableComponent } from './dashboard/leaderboard/table/table.component';
import { PostComponent } from './dashboard/blog/post/post.component';
import { TaskComponent } from './dashboard/assignments/task/task.component';
import { SideNavComponent } from './dashboard/side-nav/side-nav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GuidelinesComponent } from './dashboard/guidelines/guidelines.component';
import { LinkifyPipe } from './dashboard/blog/post/linkify.pipe';
import { MeetComponent } from './meet/meet.component';
import { IplComponent } from './dashboard/ipl/ipl.component';
import { TopNavComponent } from './dashboard/ipl/top-nav/top-nav.component';
import { TeamComponent } from './dashboard/ipl/tabs/team/team.component';
import { BidComponent } from './dashboard/ipl/tabs/bid/bid.component';
import { RulesComponent } from './dashboard/ipl/tabs/rules/rules.component';
import { PrizesComponent } from './dashboard/ipl/tabs/prizes/prizes.component';
import { IplLeaderboardComponent } from './dashboard/ipl/tabs/ipl-leaderboard/ipl-leaderboard.component';
import { CompetitionsComponent } from './competitions/competitions.component';
import { DashCompetitionsComponent } from './dashboard/dash-competitions/dash-competitions.component';
import { CompiGuidlinesComponent } from './dashboard/compi-guidlines/compi-guidlines.component';
import { CompiLeaderboardComponent } from './dashboard/compi-leaderboard/compi-leaderboard.component';
import { ChampionshipGuidlinesComponent } from './dashboard/championship-guidlines/championship-guidlines.component';
import { IapComponent } from './iap/iap.component';
import { CompiDetailsComponent } from './dashboard/compi-details/compi-details.component';
import { TableComponent2 } from './dashboard/compi-leaderboard/table/table.component';
import { InfluencerComponent } from './influencer/influencer.component';
import { InfluencerDashComponent } from './dashboard/influencer-dash/influencer-dash.component';
import { InfluencerLeaderboardComponent } from './dashboard/influencer-leaderboard/influencer-leaderboard.component';
import { InfluencerGuidlinesComponent } from './dashboard/influencer-guidlines/influencer-guidlines.component';
import { InternationalRegComponent } from './international-reg/international-reg.component';
@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    DetailsComponent,
    SigninComponent,
    ThankyouComponent,
    CcpComponent,
    ProgramRegComponent,
    ShopComponent,
    HomeComponent,
    BlogComponent,
    AssignmentsComponent,
    ProfileComponent,
    ContactComponent,
    LeaderboardComponent,
    TableComponent,
    TableComponent2,
    PostComponent,
    TaskComponent,
    SideNavComponent,
    DashboardComponent,
    GuidelinesComponent,
    LinkifyPipe,
    MeetComponent,
    IplComponent,
    TopNavComponent,
    TeamComponent,
    BidComponent,
    RulesComponent,
    PrizesComponent,
    IplLeaderboardComponent,
    CompetitionsComponent,
    DashCompetitionsComponent,
    CompiGuidlinesComponent,
    CompiLeaderboardComponent,
    ChampionshipGuidlinesComponent,
    IapComponent,
    CompiDetailsComponent,
    InfluencerComponent,
    InfluencerDashComponent,
    InfluencerLeaderboardComponent,
    InfluencerGuidlinesComponent,
    InternationalRegComponent,
    // RellaxDirective,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
