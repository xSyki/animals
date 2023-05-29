import { fireEvent, render } from '@testing-library/react'

import Chat from '../Chat/Chat'

const mockedEmit = jest.fn()
const mockedOn = jest.fn()

let mSocket = jest.fn()

jest.mock('socket.io-client', () => {
    const mockedSocket = {
        emit: () => mockedEmit,
        on: () => mockedOn,
    }
    mSocket = jest.fn(() => mockedSocket)
    return mSocket
})

function renderChat() {
    const utils = render(<Chat mySocketId="" gameId="" />)
    const openChatButton = utils.getByTitle(/Open chat/i)
    return { ...utils, openChatButton }
}

describe('Chat Component', () => {
    test('Chat exists', () => {
        const { openChatButton, getByPlaceholderText, getByTitle, getByText } =
            renderChat()
        expect(openChatButton).toBeInTheDocument()

        fireEvent.click(openChatButton)
        expect(getByText(/Chat/i)).toBeInTheDocument()
        expect(getByPlaceholderText(/Aa/i)).toBeInTheDocument()
        expect(getByTitle(/Send message/i)).toBeInTheDocument()
        expect(getByTitle(/Close chat/i)).toBeInTheDocument()
    })

    test('Chat open and close', () => {
        const { openChatButton, getByTitle } = renderChat()

        expect(openChatButton).toBeInTheDocument()

        fireEvent.click(openChatButton)
        const closeChatButton = getByTitle(/Close chat/i)
        expect(openChatButton).not.toBeInTheDocument()
        expect(closeChatButton).toBeInTheDocument()

        fireEvent.click(closeChatButton)
        expect(closeChatButton).not.toBeInTheDocument()
        expect(getByTitle(/Open chat/i)).toBeInTheDocument()
    })

    test('Message Input', () => {
        const { openChatButton, getByPlaceholderText } = renderChat()
        fireEvent.click(openChatButton)

        const messageInput = getByPlaceholderText(/Aa/i)
        const textMessage = 'Hello World!'
        fireEvent.change(messageInput, { target: { value: textMessage } })
        expect(messageInput).toHaveValue(textMessage)

        const textMessage2 = '122197885674563421'
        fireEvent.change(messageInput, { target: { value: textMessage2 } })
        expect(messageInput).toHaveValue(textMessage2)

        const textMessage3 =
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce at quam at est pulvinar congue vitae ac nunc. Integer vulputate tellus sit amet orci efficitur, et rutrum augue mattis. Maecenas scelerisque felis vitae imperdiet auctor. Etiam eget felis nec urna mollis porta in eu sapien. Aenean euismod nisi sem. Duis a nulla risus. Vestibulum aliquam molestie sapien eget ornare.'
        fireEvent.change(messageInput, { target: { value: textMessage3 } })
        expect(messageInput).toHaveValue(textMessage3.slice(0, 200))
    })

    test('Send message', () => {
        const { openChatButton, getByPlaceholderText, getByText } = renderChat()
        fireEvent.click(openChatButton)

        const messageInput = getByPlaceholderText(/Aa/i)
        const sendMessageBtn = getByText(/send/i)

        expect(sendMessageBtn).toBeDisabled()

        const textMessage = 'Hello World!'
        fireEvent.change(messageInput, { target: { value: textMessage } })
        expect(messageInput).toHaveValue(textMessage)
        expect(sendMessageBtn).not.toBeDisabled()

        fireEvent.click(sendMessageBtn)
        expect(messageInput).toHaveValue('')
    })

    test('Form submit', () => {
        const { openChatButton, getByPlaceholderText, getByText, container } =
            renderChat()
        fireEvent.click(openChatButton)

        const messageForm = container.getElementsByClassName('chat__form')[0]
        const messageInput = getByPlaceholderText(/Aa/i)
        const sendMessageBtn = getByText(/send/i)

        expect(sendMessageBtn).toBeDisabled()

        const textMessage = 'Hello World!'
        fireEvent.change(messageInput, { target: { value: textMessage } })
        expect(messageInput).toHaveValue(textMessage)
        expect(sendMessageBtn).not.toBeDisabled()

        fireEvent.submit(messageForm)
        expect(messageInput).toHaveValue('')
    })
})
