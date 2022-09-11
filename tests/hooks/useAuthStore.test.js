import { configureStore } from "@reduxjs/toolkit"
import { renderHook } from "@testing-library/react"
import { useUiStore } from "../../src/hooks/useUiStore"
import { authSlice } from "../../src/store"


const getMockStore = ( initialState ) => {
    return configureStore({
        reducer: {
            auth: authSlice.reducer
        },
        preloadedState: {
            auth: { ...initialState }
        }
    })
}


describe('Tests with useAuthStore', () => { 
    test('should return the default values', () => { 
        const mockStore = getMockStore({  })
        const { result } = renderHook(() => useUiStore(), {
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        })
    })
})