import { useDispatch, useSelector } from "react-redux"
import { calendarApi } from "../api"
import { convertEventsToDateEvents } from "../helpers"
import { onAddNewEvent, onSetActiveEvent, onUpdateEvent, onDeleteEvent, onLoadEvents } from "../store"


export const useCalendarStore = () => {
    const dispatch = useDispatch()

    const { events, activeEvent } = useSelector(store => store.calendar)
    const { user } = useSelector(store => store.auth)

    const setActiveEvent = ( calendarEvent ) => {
        dispatch(onSetActiveEvent(calendarEvent))
    }

    const startSavingEvent = async ( calendarEvent ) => {
        if (calendarEvent._id){
            // Update
            dispatch(onUpdateEvent({...calendarEvent}))
        } else {
            // Create
            const { data } = await calendarApi.post('/events', calendarEvent)
            
            dispatch(onAddNewEvent({
                ...calendarEvent, 
                id: data.event.id,
                user
            }))
        }
    }

    const startDeletingEvent = () => {
        dispatch(onDeleteEvent())
    }

    const startLoadingEvents = async () => {
        try {
            const { data } = await calendarApi.get('/events')
            const events = convertEventsToDateEvents(data.events)
            dispatch(onLoadEvents(events))

        } catch (error) {
            console.log('Error cargando eventos')
            console.log(error)
        }
    }


    return {
        // Propiedades
        activeEvent,
        events,
        hasEventSelected: !!activeEvent,

        // Metodos
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
        startLoadingEvents,
    }
}