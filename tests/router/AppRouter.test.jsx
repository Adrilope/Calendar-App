import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { CalendarPage } from "../../src/calendar"
import { useAuthStore } from "../../src/hooks/useAuthStore"
import { AppRouter } from "../../src/router/AppRouter"


jest.mock('../../src/hooks/useAuthStore')

// to avoid doing the mock of all hooks of the component, we render a h1 instead the whole CalendarPage
jest.mock('../../src/calendar', () => ({
    CalendarPage: () => <h1>CalendarPage</h1>
}))


describe('Tests with <AppRouter />', () => { 
    const mockCheckAuthToken = jest.fn()

    beforeEach(() => jest.clearAllMocks())


    test('should show the loading page and call checkAuthToken', () => { 
        useAuthStore.mockReturnValue({
            status: 'checking',
            checkAuthToken: mockCheckAuthToken
        })

        render(<AppRouter />)

        expect(screen.getByText('Cargando...')).toBeTruthy()
        expect(mockCheckAuthToken).toHaveBeenCalled()
    })

    test('should show login if user is not authenticated', () => { 
        useAuthStore.mockReturnValue({
            status: 'not-authenticated',
            checkAuthToken: mockCheckAuthToken
        })

        const { container } = render(
            <MemoryRouter initialEntries={['/auth2/something']}>
                <AppRouter />
            </MemoryRouter>
        )

        expect(screen.getByText('Ingreso')).toBeTruthy()
        expect(container).toMatchSnapshot()
    })

    test('should show calendar if user is authenticated', () => { 
        useAuthStore.mockReturnValue({
            status: 'authenticated',
            checkAuthToken: mockCheckAuthToken
        })

        render(
            <MemoryRouter>
                <AppRouter />
            </MemoryRouter>
        )
        
        expect(screen.getByText('CalendarPage')).toBeTruthy()
    })
})