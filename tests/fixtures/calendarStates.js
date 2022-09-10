export const events = [
    {
        id: '1',
        start: new Date('2022-10-21 13:00:00'),
        end: new Date('2022-10-21 15:00:00'),
        title: 'Boss Birthday',
        notes: 'Some notes'
    },
    {
        id: '2',
        start: new Date('2022-08-14 13:00:00'),
        end: new Date('2022-08-14 15:00:00'),
        title: 'John Birthday',
        notes: 'Some John notes'
    }
]


export const initialState = {
    isLoadingEvents: true,
    events: [],
    activeEvent: null
}


export const calendarWithEventsState = {
    isLoadingEvents: false,
    events: [ ...events ],
    activeEvent: null
}


export const calendarWithActiveEventState = {
    isLoadingEvents: false,
    events: [ ...events ],
    activeEvent: { ...events[0] }
}