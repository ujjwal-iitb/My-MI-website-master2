import { NgModule } from '@angular/core';
import { Routes, RouterModule, ChildrenOutletContexts } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { SigninComponent } from './signin/signin.component';
import { DetailsComponent } from './details/details.component';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { CcpComponent } from './ccp/ccp.component';
import { ProgramRegComponent } from './program-reg/program-reg.component';
import { ShopComponent } from './shop/shop.component';
import { SideNavComponent } from './dashboard/side-nav/side-nav.component';
import { HomeComponent } from './dashboard/home/home.component';
import { BlogComponent } from './dashboard/blog/blog.component';
import { LeaderboardComponent } from './dashboard/leaderboard/leaderboard.component';
import { ContactComponent } from './dashboard/contact/contact.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { AssignmentsComponent } from './dashboard/assignments/assignments.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GuidelinesComponent } from './dashboard/guidelines/guidelines.component';
import { MeetComponent } from './meet/meet.component';
import { IplComponent } from './dashboard/ipl/ipl.component';
import { TeamComponent } from './dashboard/ipl/tabs/team/team.component';
import { BidComponent } from './dashboard/ipl/tabs/bid/bid.component';
import { IplLeaderboardComponent } from './dashboard/ipl/tabs/ipl-leaderboard/ipl-leaderboard.component';
import { RulesComponent } from './dashboard/ipl/tabs/rules/rules.component';
import { PrizesComponent } from './dashboard/ipl/tabs/prizes/prizes.component';
import { CompetitionsComponent } from './competitions/competitions.component';
import { DashCompetitionsComponent } from './dashboard/dash-competitions/dash-competitions.component';
import { CompiLeaderboardComponent } from './dashboard/compi-leaderboard/compi-leaderboard.component';
import { CompiGuidlinesComponent } from './dashboard/compi-guidlines/compi-guidlines.component';
import { ChampionshipGuidlinesComponent } from './dashboard/championship-guidlines/championship-guidlines.component';
import { IapComponent } from './iap/iap.component';
import { CompiDetailsComponent } from './dashboard/compi-details/compi-details.component';
import { InfluencerComponent } from './influencer/influencer.component';
import { InfluencerDashComponent } from './dashboard/influencer-dash/influencer-dash.component';
import { InfluencerGuidlinesComponent } from './dashboard/influencer-guidlines/influencer-guidlines.component';
import { InfluencerLeaderboardComponent } from './dashboard/influencer-leaderboard/influencer-leaderboard.component';
import { InternationalRegComponent } from './international-reg/international-reg.component';
const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'signup', component: SigninComponent },
  { path: 'details', component: DetailsComponent },
  { path: 'international', component: InternationalRegComponent },
  { path: 'thankyou', component: ThankyouComponent },
  { path: 'ccp', component: CcpComponent },
  { path: 'iap', component: IapComponent },
  { path: 'competitions', component: CompetitionsComponent },
  { path: 'influencer', component: InfluencerComponent },
  { path: 'registration', component: ProgramRegComponent },
  { path: 'meet', component: MeetComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'dashboard', redirectTo: 'dashboard/home' },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'leaderboard', component: LeaderboardComponent },
      { path: 'blog', component: BlogComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'assignments', component: AssignmentsComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'guidelines', component: GuidelinesComponent },
      { path: 'competitions', component: DashCompetitionsComponent },
      { path: 'competitions/:id', component: CompiDetailsComponent },
      { path: 'compi-leaderboard', component: CompiLeaderboardComponent }, // TODO: change when leaderboard is live
      { path: 'compi-guidelines', component: CompiGuidlinesComponent },
      { path: 'championship-guidelines', component: ChampionshipGuidlinesComponent },
      { path: 'influencer', component: InfluencerDashComponent },
      { path: 'influencer-guidlines', component: InfluencerGuidlinesComponent },
      { path: 'influencer-leaderboard', component: InfluencerLeaderboardComponent },
      {
        path: 'ipl',
        component: IplComponent,
        children: [
          { path: '', redirectTo: 'team', pathMatch: 'full' },
          { path: 'team', component: TeamComponent },
          { path: 'prediction', component: BidComponent },
          { path: 'leaderboard', component: IplLeaderboardComponent },
          { path: 'rules', component: RulesComponent },
          { path: 'prizes', component: PrizesComponent }
        ]
      },
      { path: '**', redirectTo: 'dashboard/home' },
    ]
  },
  { path: 'dashboard/**', redirectTo: '/dashboard/home' },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
