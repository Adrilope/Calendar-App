import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onSetActiveEvent, onUpdateEvent, onDeleteEvent } from "../store"


export const useCalendarStore = () => {
    const dispatch = useDispatch()

    const { events, activeEvent } = useSelector(store => store.calendar)

    const setActiveEvent = ( calendarEvent ) => {
        dispatch(onSetActiveEvent(calendarEvent))
    }

    const startSavingEvent = async ( calendarEvent ) => {
        if (calendarEvent._id){
            // Update
            dispatch(onUpdateEvent({...calendarEvent}))
        } else {
            // Create
            dispatch(onAddNewEvent({
                ...calendarEvent, 
                _id: new Date().getTime()
            }))
        }
    }

    const startDeletingEvent = () => {
        dispatch(onDeleteEvent())
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
    }
}