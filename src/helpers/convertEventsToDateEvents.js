import { parseISO } from "date-fns"

// convert sting start and end to dates
export const convertEventsToDateEvents = (events = []) => {
    return events.map(event => {
        event.start = parseISO(event.start)
        event.end = parseISO(event.end)

        return event
    })
}