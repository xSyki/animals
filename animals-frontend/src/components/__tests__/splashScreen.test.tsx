import { MemoryRouter } from 'react-router-dom'
import { fireEvent, render } from '@testing-library/react'

import SplashScreen from '../Splash-screen/SplashScreen'

const mockedNavigator = jest.fn()

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigator,
}))

jest.mock('socket.io-client', () => {
    const mockedSocket = {
        emit: () => jest.fn(),
        on: () => jest.fn(),
    }
    return jest.fn(() => mockedSocket)
})

function renderSplashScreen() {
    const utils = render(
        <MemoryRouter>
            <SplashScreen />
        </MemoryRouter>
    )
    const joinGameInput = utils.getByPlaceholderText(/code/i)
    const joinGameBtn = utils.getByText(/JOIN/)
    const createGameBtn = utils.getByText(/create game/i)
    return { ...utils, joinGameInput, joinGameBtn, createGameBtn }
}

describe('Splash Screen Component', () => {
    test('Do Splash Screen exists', () => {
        const { joinGameInput, joinGameBtn, createGameBtn, getByText } =
            renderSplashScreen()
        expect(joinGameInput).toBeInTheDocument()
        expect(joinGameBtn).toBeInTheDocument()
        expect(createGameBtn).toBeInTheDocument()

        expect(getByText(/Super Farmer/i)).toBeInTheDocument()
    })

    test('Create game button', () => {
        const { createGameBtn } = renderSplashScreen()
        fireEvent.click(createGameBtn)
        expect(mockedNavigator).toHaveBeenCalled()
    })

    test('Code input and button', () => {
        const { joinGameInput, joinGameBtn } = renderSplashScreen()
        expect(joinGameBtn).toBeDisabled()

        const textMessage = 'Hel'
        fireEvent.change(joinGameInput, { target: { value: textMessage } })
        expect(joinGameInput).toHaveValue(textMessage.toLocaleUpperCase())
        expect(joinGameBtn).toBeDisabled()

        const textMessage2 = 'Hello'
        fireEvent.change(joinGameInput, { target: { value: textMessage2 } })
        expect(joinGameInput).toHaveValue(textMessage2.toLocaleUpperCase())
        expect(joinGameBtn).not.toBeDisabled()

        const textMessage3 = 'Hellollo'
        fireEvent.change(joinGameInput, { target: { value: textMessage3 } })
        expect(joinGameInput).toHaveValue(
            textMessage3.toLocaleUpperCase().slice(0, 5)
        )
        expect(joinGameBtn).not.toBeDisabled()

        fireEvent.click(joinGameBtn)
        expect(mockedNavigator).toHaveBeenCalled()
    })
})
