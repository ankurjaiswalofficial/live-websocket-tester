import React from 'react'
import WebSocketTester from '@/components/dynamic/websocket-tester'
import WebSocketTesterInfo from '@/components/info/websocket-tester-info'

function Home() {
    return (
        <>
            <WebSocketTester />
            <WebSocketTesterInfo />
        </>
    )
}

export default Home
