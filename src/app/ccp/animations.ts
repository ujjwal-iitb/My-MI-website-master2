import{trigger,transition,animate,style,state,group,query} from '@angular/animations';



export const why_animation = (

  trigger('why_anim',[
    state('left',style({
      opacity: 0,
      left: "-20%",
      position: 'absolute',
      height: 'auto'
    })),

    state('right',style({
      opacity: 0,
      left: "60%",
      position: 'absolute',
      height: 'auto'
    })),

    state('center',style({
      position: 'absolute',
      opacity: 1,
      left: '20%',
      height: 'auto'
    })),

    transition('*<=>*',[
      animate('1s ease-out')
      ]),
]))

export const works_animation = (

    trigger('works_anim',[
      state('left',style({
        opacity: 0.5,
        left: "-10%",
        position: 'absolute',
        'z-index': -1,
      })),

      state('right',style({
        opacity: 0.5,
        left: "30%",
        position: 'absolute',
        'z-index': -1,
      })),

      state('center',style({
        opacity: 1,
        left: "10%",
        position: 'absolute',
      })),

      state('noneleft',style({
        opacity: 0,
        left: "-10%",
        position: 'absolute',
        'z-index': -1,
      })),

      state('noneright',style({
        opacity: 0,
        left: "30%",
        position: 'absolute',
        'z-index': -1,
      })),

      transition('*<=>*',[
        animate('1s ease-out')
        ]),
]))

export const works_text = (

    trigger('works_text',[
      state('left',style({
        opacity: 0,
        top: "25vw",
        position: 'absolute',
        width: '20vw',
        "text-align": 'right',
        display: 'flex'
      })),

      state('right',style({
        opacity: 0,
        top: "45vw",
        position: 'absolute',
        width: '20vw',
        "text-align": 'right',
        display: 'flex'
      })),

      state('noneright',style({
        opacity: 0,
        top: "45vw",
        position: 'absolute',
        width: '20vw',
        "text-align": 'right',
        display: 'flex'
      })),

      state('noneleft',style({
        opacity: 0,
        top: "45vw",
        position: 'absolute',
        width: '20vw',
        "text-align": 'right',
        display: 'flex'
      })),

      state('center',style({
        opacity: 1,
        top: "35vw",
        position: 'absolute',
        width: '20vw',
        "text-align": 'right',
        display: 'flex'
      })),

      transition('*<=>*',[
        animate('1s ease-out')
        ]),
]))

export const mworks_text = (

    trigger('mworks_text',[
      state('left',style({
        opacity: 0,
        position: 'absolute',
        display: 'flex',
        left: '-50%',
        width: '45vw'
      })),

      state('right',style({
        opacity: 0,
        position: 'absolute',
        display: 'flex',
        left: '50%',
        width: '45vw'
      })),

      state('center',style({
        opacity: 1,
        position: 'absolute',
        display: 'flex',
        left: '0%',
        width: '45vw'
      })),

      transition('*<=>*',[
        animate('1s ease-out')
        ]),
]))
