import { useDispatch, useSelector } from "react-redux"
import { onSetActiveEvent } from "../store"


export const useCalendarStore = () => {
    const dispatch = useDispatch()

    const { events, activeEvent } = useSelector(store => store.calendar)

    const setActiveEvent = ( calendarEvent ) => {
        dispatch(onSetActiveEvent(calendarEvent))
    }


    return {
        // Propiedades
        activeEvent,
        events,

        // Metodos
        setActiveEvent,
    }
}