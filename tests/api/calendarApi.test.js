import { calendarApi } from "../../src/api"

describe('Tests with calendarApi', () => { 
    test('should have the default config', () => { 
        expect(calendarApi.defaults.baseURL).toBe(process.env.VITE_API_URL)
    })

    test('should have the x-token in the header requests', async () => { 
        const token = 'ABC-123-XYZ'
        localStorage.setItem('token', token)
        const res = await calendarApi.get('/auth')

        expect(res.config.headers['x-token']).toBe(token)
    })
})