import { configureStore } from '@reduxjs/toolkit'
import { act, renderHook } from '@testing-library/react'
import { Provider } from 'react-redux'
import { useUiStore } from '../../src/hooks/useUiStore'
import { uiSlice } from '../../src/store'


const getMockStore = ( initialState ) => {
    return configureStore({
        reducer: {
            ui: uiSlice.reducer
        },
        preloadedState: {
            ui: { ...initialState }
        }
    })
}


describe('Tests with useUiStore', () => { 
    test('should return the default values', () => { 
        const mockStore = getMockStore({ isDateModalOpen: false })
        const { result } = renderHook(() => useUiStore(), {
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        })

        expect(result.current).toEqual({
            isDateModalOpen: false,
            openDateModal: expect.any(Function),
            closeDateModal: expect.any(Function),
            toogleDateModal: expect.any(Function) 
        })
    })

    test('should change the value of isDateModalOpen to be true', () => { 
        const mockStore = getMockStore({ isDateModalOpen: false })
        const { result } = renderHook(() => useUiStore(), {
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        })

        const { openDateModal } = result.current

        act(() => openDateModal()) 

        expect(result.current.isDateModalOpen).toBeTruthy()
    })

    test('should change the value of isDateModalOpen to be false', () => { 
        const mockStore = getMockStore({ isDateModalOpen: true })
        const { result } = renderHook(() => useUiStore(), {
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        })

        const { closeDateModal } = result.current

        act(() => closeDateModal()) 

        expect(result.current.isDateModalOpen).toBeFalsy()
    })

    test('should toogle the value of isDateModalOpen', () => { 
        const mockStore = getMockStore({ isDateModalOpen: true })
        const { result } = renderHook(() => useUiStore(), {
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        })

        act(() => result.current.toogleDateModal())

        expect(result.current.isDateModalOpen).toBeFalsy()

        act(() => result.current.toogleDateModal())

        expect(result.current.isDateModalOpen).toBeTruthy()
    })
})