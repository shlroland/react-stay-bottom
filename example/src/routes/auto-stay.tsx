import { faker } from '@faker-js/faker'
import { nanoid } from 'nanoid'
import { useRef, useState } from 'react'
import { useStayAtBottom } from 'react-stay-at-bottom'

import { Chat, ChatInput, type ChatMessageProps } from '../components/chat'
import { initMessages, sleep } from '../utils'

export function AutoStay(props: { initialStay: boolean }) {
  const [messages, setMessages] = useState<ChatMessageProps[]>(initMessages())

  const handleSendMessage = async (message: string) => {
    setMessages((msgs) => [
      ...msgs,
      { role: 'user', id: nanoid(), content: message },
    ])
    await sleep(1000)
    setMessages((msgs) => [
      ...msgs,
      {
        role: 'bot',
        id: nanoid(),
        content: faker.lorem.paragraphs(Math.floor((Math.random() + 1) * 5)),
      },
    ])
  }

  const scrollRef = useRef<HTMLDivElement>(null)

  useStayAtBottom(scrollRef, {
    initialStay: props.initialStay,
    autoStay: true,
  })

  return (
    <>
      <Chat messages={messages} ref={scrollRef}></Chat>
      <ChatInput sendMessage={handleSendMessage} />
    </>
  )
}
