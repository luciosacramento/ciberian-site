import { animate, state, style, transition, trigger } from '@angular/animations';

export const fadeDialogAnimations = [
  trigger('dialogContainer', [
    state('void, exit', style({ opacity: 0 })),
    state('enter', style({ opacity: 1 })),
    transition('* => enter', animate('300ms ease-in')),
    transition('enter => void, enter => exit', animate('300ms ease-out')),
  ]),
];
