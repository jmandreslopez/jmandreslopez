import { animate, query, sequence, stagger, state, style, transition, trigger } from '@angular/animations';

export const routeAnimations: any = trigger('routeAnimations', [
    transition('* <=> *', [
        query(':enter > *', style({ opacity: 0, position: 'fixed' }), {
            optional: true
        }),
        query(':enter .route-animations-elements', style({ opacity: 0 }), {
            optional: true
        }),
        sequence([
            query(
                ':leave > *',
                [
                    style({ transform: 'translateY(0%)', opacity: 1 }),
                    animate(
                        '0.2s ease-in-out',
                        style({ transform: 'translateY(-3%)', opacity: 0 })
                    ),
                    style({ position: 'fixed' })
                ],
                { optional: true }
            ),
            query(
                ':enter > *',
                [
                    style({
                        transform: 'translateY(-3%)',
                        opacity: 0,
                        position: 'static'
                    }),
                    animate(
                        '0.5s ease-in-out',
                        style({ transform: 'translateY(0%)', opacity: 1 })
                    )
                ],
                { optional: true }
            )
        ]),
        query(
            ':enter .route-animations-elements',
            stagger(100, [
                style({ transform: 'translateY(15%)', opacity: 0 }),
                animate(
                    '0.5s ease-in-out',
                    style({ transform: 'translateY(0%)', opacity: 1 })
                )
            ]),
            { optional: true }
        )
    ])
]);
