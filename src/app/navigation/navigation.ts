import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
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
           },
           {
               id: 'setups',
               title: 'Setups',
               type: 'group',
               children: [
                   {
                       id: 'hotel',
                       title: 'Hotel Info',
                       // translate: 'NAV.CALENDAR',
                       type: 'item',
                       icon: 'home',
                       url: '/app/setup/hotelinfo'
                   },
                   {
                       id: 'branch',
                       title: 'Branch',
                       // translate: 'NAV.CALENDAR',
                       type: 'item',
                       icon: 'home',
                       url: '/app/setup/branches'
                   },
                   {
                       id: 'supplier',
                       title: 'Supplier',
                       // translate: 'NAV.CALENDAR',
                       type: 'item',
                       icon: 'home',
                       url: '/app/setup/supplier'
                   },
                   {
                       id: 'roomsetup',
                       title: 'Room Setups',
                       type: 'collapsable',
                       icon: 'hotel',
                       children: [
                           {
                               id: 'roomtype',
                               title: 'Room Type',
                               type: 'item',
                               url: '/app/setup/roomtype'
                           },
                           {
                               id: 'roomprice',
                               title: 'Room Price',
                               type: 'item',
                               url: '/app/setup/roomprice'
                           },
                           {
                               id: 'amenity',
                               title: 'Amenities',
                               type: 'item',
                               url: '/app/setup/amenities'
                           },
                           {
                               id: 'rooms',
                               title: 'Rooms',
                               type: 'item',
                               url: '/app/setup/rooms'
                           }
                       ]
                   },
                   {
                       id: 'facilitysetup',
                       title: 'Facility Setups',
                       type: 'collapsable',
                       icon: 'hotel',
                       children: [
                           {
                               id: 'facilitytype',
                               title: 'Facility Type',
                               type: 'item',
                               url: '/app/setup/facilityType'
                           },
                           {
                               id: 'facility',
                               title: 'Facility',
                               type: 'item',
                               url: '/app/setup/facility'
                           },
                       ]
                   },
                   {
                       id: 'tax',
                       title: 'Tax',
                       // translate: 'NAV.CALENDAR',
                       type: 'item',
                       icon: 'money',
                       url: '/app/setup/taxsetup'
                   },
               ]
           }
       ];
