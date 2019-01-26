import { trigger, animate, transition, style, query} from '@angular/animations';

export const routerTransition = trigger('routerTransition', [
    transition('* <=> *', [
        query(':enter', [
            style({
                transform: 'translateY(-1rem)',
                opacity: '0'
            }),
            animate('300ms 300ms ease-in-out', style({
                transform: 'translateY(0)',
                opacity: '1'
            })),
        ], { optional: true }),
        query(':leave', [
            style({
                opacity: '1'
            }),
            animate('300ms ease-in-out', style({
                opacity: '0'
            })),
        ], { optional: true }),
    ]),
]);
