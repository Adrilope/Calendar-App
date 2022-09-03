import { format, parse, startOfWeek, getDay } from 'date-fns'
import { dateFnsLocalizer } from 'react-big-calendar'
import esEs from 'date-fns/locale/es'
import enUS from 'date-fns/locale/en-US'


const locales = {
    // 'en-US': enUS,   ENGLISH
    'es': esEs,
}

export const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
})