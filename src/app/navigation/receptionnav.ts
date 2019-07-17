import { FuseNavigation } from '@fuse/types';

export const receptionNav: FuseNavigation[] = [
    {
        id: 'Menu',
        title: 'Menu',
        type: 'group',
        children: [
            {
                id: 'dashboard',
                title: 'Dashboard',
                type: 'item',
                icon: 'dashboard',
                url: '/app/dashboard'
            },
            {
                id: 'calendar',
                title: 'Calendar',
                type: 'item',
                icon: 'event',
                url: '/app/bookings/calendar'
            },
            {
                id: 'book',
                title: 'Walk In',
                type: 'item',
                icon: 'event',
                url: '/app/bookings/book'
            },
            {
                id: 'bookings',
                title: 'Guest Bookings',
                type: 'item',
                icon: 'event',
                url: '/app/bookings/list'
            }
        ]
    }
];
