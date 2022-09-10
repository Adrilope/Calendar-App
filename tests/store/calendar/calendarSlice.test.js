import { calendarSlice, onAddNewEvent, onDeleteEvent, onLoadEvents, onLogoutCalendar, onSetActiveEvent, onUpdateEvent } from "../../../src/store/calendar/calendarSlice"
import { calendarWithActiveEventState, calendarWithEventsState, events, initialState } from "../../fixtures/calendarStates"


describe('Tests with calendar slice', () => { 
    test('should return the initial state', () => { 
        const state = calendarSlice.getInitialState()

        expect(state).toEqual(initialState)
    })

    test('should activate an event', () => { 
        const state = calendarSlice.reducer(calendarWithEventsState, onSetActiveEvent(events[0]))

        expect(state.activeEvent).toEqual(events[0])
    })

    test('should add a new event', () => { 
        const newEvent = {
            id: '3',
            start: new Date('2022-12-24 21:00:00'),
            end: new Date('2022-12-24 22:00:00'),
            title: 'Christmas Dinner',
            notes: 'Family dinner with presents'
        }
        
        const state = calendarSlice.reducer(calendarWithEventsState, onAddNewEvent(newEvent))

        expect(state.events).toEqual([...events, newEvent])
    })

    test('should update event', () => { 
        const updatedEvent = {
            id: '1',
            start: new Date('2022-10-21 13:00:00'),
            end: new Date('2022-10-21 15:00:00'),
            title: 'Boss Birthday updated',
            notes: 'Some new notes'
        }

        const state = calendarSlice.reducer(calendarWithEventsState, onUpdateEvent(updatedEvent))

        expect(state.events).toContain(updatedEvent)
    })

    test('should delete an event', () => { 
        const state = calendarSlice.reducer(calendarWithActiveEventState, onDeleteEvent())

        expect(state.activeEvent).toBe(null)
        expect(state.events).not.toContain(events[0])
    })

    test('should load events', () => { 
        const newEvents = [...events, {
            id: '3',
            start: new Date('2022-12-24 21:00:00'),
            end: new Date('2022-12-24 22:00:00'),
            title: 'Christmas Dinner',
            notes: 'Family dinner with presents'
        }]
        const state = calendarSlice.reducer(initialState, onLoadEvents(newEvents))

        expect(state.isLoadingEvents).toBeFalsy()
        expect(state.events).toHaveLength(3)
        expect(state.events).toContain(newEvents[2])
    })

    test('should clean the calendar state', () => { 
        const state = calendarSlice.reducer(calendarWithActiveEventState, onLogoutCalendar())

        expect(state).toEqual(initialState)
    })
})