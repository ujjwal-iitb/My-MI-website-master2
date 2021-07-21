import { Component, OnInit } from '@angular/core';
declare var JitsiMeetExternalAPI: any;
@Component({
  selector: 'app-meet',
  templateUrl: './meet.component.html',
  styleUrls: ['./meet.component.css']
})
export class MeetComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    var domain = 'meet.jit.si';
    var options = {
        roomName: "JitsiMeetAPIExampleforAnuj",
        width: '100%',
        height: '100%',
        parentNode: document.querySelector('#meet'),
        interfaceConfigOverwrite: {
                              TOOLBAR_BUTTONS: [
              'microphone', 'camera', 'closedcaptions', 'desktop', 'embedmeeting', 'fullscreen',
              'fodeviceselection', 'hangup', 'profile', 'chat', 'recording',
              'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
              'videoquality', 'filmstrip', 'invite', 'feedback', 'stats', 'shortcuts',
              'tileview', 'videobackgroundblur', 'download', 'help', 'mute-everyone', 'security'
          ],
            // TOOLBAR_BUTTONS: [
            //     'microphone', 'camera', 'fodeviceselection', 'chat', 'raisehand',
            //     // 'fullscreen'
            // ],
            DEFAULT_LOGO_URL: '',
            JITSI_WATERMARK_LINK: 'assets/Icon/my_icon.png',
            BRAND_WATERMARK_LINK: 'assets/Icon/my_icon.png',
            SHOW_JITSI_WATERMARK: false,
            SHOW_WATERMARK_FOR_GUESTS: false,
            DEFAULT_REMOTE_DISPLAY_NAME: 'Indigo Squad Member',
        },
        userInfo: {
            email: 'test@example.com',
            displayName: 'Agrawal Anuj'
        },
        configOverwrite: {
            prejoinPageEnabled: false,
            SHOW_JITSI_WATERMARK: false,
            SHOW_WATERMARK_FOR_GUESTS: false,
        }
    }
    var api = new JitsiMeetExternalAPI(domain, options);
  }

}
