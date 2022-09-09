import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2"
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
        try {
            if (calendarEvent.id){
                // Update
                await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent)
                dispatch(onUpdateEvent({...calendarEvent, user}))
                return
            } 
            // Create
            const { data } = await calendarApi.post('/events', calendarEvent)
            dispatch(onAddNewEvent({
                ...calendarEvent, 
                id: data.event.id,
                user
            }))
        } catch (error) {
            Swal.fire('Error al guardar', error.response.data.msg, 'error')
        }
    }

    const startDeletingEvent = async () => {
        try {
            await calendarApi.delete(`/events/${activeEvent.id}`)
            dispatch(onDeleteEvent())
        } catch (error) {
            Swal.fire('Error al borrar', error.response.data.msg, 'error')
        }
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