import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

function WebSocketTesterInfo() {
    return (
        <Card className='mt-4'>
            <CardHeader>
                <CardTitle>References</CardTitle>
                <CardDescription>Live Websocket Tester Info&apos;s</CardDescription>
            </CardHeader>
            <CardContent>
                Websocket Reference Website: <a href="https://websocket.org/" className='text-blue-600'>{"https://websocket.org/"}</a>
                <br />
                Websocket Testing URL: <a href="https://echo.websocket.org/" className='text-blue-600'>{"https://echo.websocket.org/"}</a>
            </CardContent>
        </Card>
    )
}

export default WebSocketTesterInfo
