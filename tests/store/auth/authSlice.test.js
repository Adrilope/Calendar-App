import { authSlice, clearErrorMessage, onChecking, onLogin, onLogout } from "../../../src/store/auth/authSlice"
import { authenticatedState, initialState } from "../../fixtures/authStates"
import { testUserCredentials } from "../../fixtures/testUser"


describe('Tests with authSlice', () => { 
    test('should return the initial state', () => { 
        expect(authSlice.getInitialState()).toEqual(initialState)
    })

    test('should change to checking', () => { 
        const state = authSlice.reducer(authenticatedState, onChecking())
        
        expect(state).toEqual(initialState)
    })

    test('should login', () => { 
        const state = authSlice.reducer(initialState, onLogin(testUserCredentials))
        
        expect(state).toEqual({
            status: 'authenticated',
            user: testUserCredentials,
            errorMessage: undefined
        })
    })

    test('should logout', () => { 
        const state = authSlice.reducer(authenticatedState, onLogout())

        expect(state).toEqual({
            status: 'not-authenticated',
            user: {},
            errorMessage: undefined
        })
    })

    test('should logout with message', () => { 
        const errorMessage = 'Invalid credentials'
        const state = authSlice.reducer(authenticatedState, onLogout(errorMessage))

        expect(state).toEqual({
            status: 'not-authenticated',
            user: {},
            errorMessage
        })
    })

    test('should clean the error message', () => { 
        const errorMessage = 'Invalid credentials'
        const state = authSlice.reducer(authenticatedState, onLogout(errorMessage))

        const newState = authSlice.reducer(authenticatedState, clearErrorMessage(errorMessage))
        
        expect(newState.errorMessage).toBe(undefined)
    })
})