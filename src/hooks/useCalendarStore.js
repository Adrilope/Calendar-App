import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onSetActiveEvent } from "../store"


export const useCalendarStore = () => {
    const dispatch = useDispatch()

    const { events, activeEvent } = useSelector(store => store.calendar)

    const setActiveEvent = ( calendarEvent ) => {
        dispatch(onSetActiveEvent(calendarEvent))
    }

    const startSavingEvent = async ( calendarEvent ) => {
        if (calendarEvent._id){
            // Update
        } else {
            // Create
            dispatch(onAddNewEvent({
                ...calendarEvent, 
                _id: new Date().getTime()
            }))
        }
    }


    return {
        // Propiedades
        activeEvent,
        events,

        // Metodos
        setActiveEvent,
        startSavingEvent,
    }
}