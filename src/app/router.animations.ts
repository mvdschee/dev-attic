import { trigger, animate, style, group, animateChild, query, stagger, transition } from '@angular/animations';

export const routerTransition = trigger('routerTransition', [
    // transition('* <=> *', [
    // /* order */
    // /* 1 */ query(':enter, :leave', style({ position: 'fixed', width: '100%' }),
    //             { optional: true }),
    // /* 2 */ query('.post-item', style({ opacity: 0 }),
    //             { optional: true }),
    // /* 2 */ group([
    //             query(':enter', [
    //                 style({ transform: 'translateY(100%)' }),
    //                 animate('0.5s ease-in-out', style({ transform: 'translateY(0%)' }))
    //             ], { optional: true }),
    //             query(':leave', [
    //                 style({ transform: 'translateY(0%)' }),
    //                 animate('0.5s ease-in-out', style({ transform: 'translateY(-100%)' })),
    //             ], { optional: true }),
    //             query(':enter .post-item', [stagger(200, [
    //                 style({ transform: 'translateY(100px)' }),
    //                 animate('1s ease-in-out',
    //                 style({ transform: 'translateY(0px)', opacity: 1 })),
    //             ])],
    //             { optional: true })
    //     ])
    // ])
]);
