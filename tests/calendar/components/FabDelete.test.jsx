import { fireEvent, render, screen } from "@testing-library/react"
import { FabDelete } from "../../../src/calendar/components/FabDelete"
import { useCalendarStore } from "../../../src/hooks/useCalendarStore"


jest.mock('../../../src/hooks/useCalendarStore')


describe('Tests with <FabDelete />', () => { 
    const mockStartDeletingEvent = jest.fn()

    beforeEach(() => jest.clearAllMocks())


    test('should render correctly', () => {
        useCalendarStore.mockReturnValue({
            hasEventSelected: false
        })

        render(<FabDelete />)
        const btn = screen.getByLabelText('btn-delete')

        expect(btn.classList).toContain('btn')
        expect(btn.classList).toContain('btn-danger')
        expect(btn.classList).toContain('fab-danger')
        expect(btn.style.display).toBe('none')
    })

    test('should show the button if hasEventSelected is true', () => { 
        useCalendarStore.mockReturnValue({
            hasEventSelected: true
        })

        render(<FabDelete />)
        const btn = screen.getByLabelText('btn-delete')

        expect(btn.style.display).toBe('')
    })

    test('should call startDeletingEvent if hasEventSelected is true', () => { 
        useCalendarStore.mockReturnValue({
            startDeletingEvent: mockStartDeletingEvent,
            hasEventSelected: true
        })

        render(<FabDelete />)
        const btn = screen.getByLabelText('btn-delete')
        fireEvent.click(btn)

        expect(mockStartDeletingEvent).toHaveBeenCalled()
    })
})