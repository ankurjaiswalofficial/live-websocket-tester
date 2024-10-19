"use client";

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

function WebSocketTester() {
    const [url, setUrl] = useState('wss://echo.websocket.org/');
    const [headers, setHeaders] = useState<{ key: string; value: string }[]>([]);
    const [connected, setConnected] = useState(false);
    const [messages, setMessages] = useState<string[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const socketRef = useRef<WebSocket | null>(null);
    const reconnectTimeout = useRef<number | null>(null);
    const { toast } = useToast();
    const reconnectInterval = 2000;

    useEffect(() => {
        return () => {
            if (socketRef.current) {
                socketRef.current.close();
            }
            if (reconnectTimeout.current) {
                clearTimeout(reconnectTimeout.current);
            }
        };
    }, []);

    const connect = () => {
        if (!url) {
            toast({
                title: "Error",
                description: "Please enter a WebSocket URL",
                variant: "destructive",
            });
            return;
        }

        const queryParams = headers
            .map(({ key, value }) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');
        const fullUrl = queryParams ? `${url}?${queryParams}` : url;

        try {
            const socket = new WebSocket(fullUrl);
            socketRef.current = socket;

            socket.onopen = () => {
                setConnected(true);
                toast({
                    title: "Connected",
                    description: "WebSocket connection established",
                });
                if (reconnectTimeout.current) {
                    clearTimeout(reconnectTimeout.current);
                }
            };

            socket.onmessage = (event) => {
                setMessages((prev) => [...prev, `Received: ${event.data}`]);
            };

            socket.onclose = () => {
                setConnected(false);
                toast({
                    title: "Disconnected",
                    description: "WebSocket connection closed. Reconnecting in 5 seconds...",
                    variant: "destructive",
                });
                attemptReconnect();
            };

            socket.onerror = (error) => {
                console.error('WebSocket error:', error);
                toast({
                    title: "Error",
                    description: "WebSocket error occurred",
                    variant: "destructive",
                });
                attemptReconnect();
            };
        } catch (error) {
            console.error('WebSocket connection failed:', error);
            toast({
                title: "Error",
                description: "Invalid WebSocket URL or headers",
                variant: "destructive",
            });
        }
    };

    const disconnect = () => {
        if (socketRef.current) {
            socketRef.current.close();
        }
        if (reconnectTimeout.current) {
            clearTimeout(reconnectTimeout.current);
        }
    };

    const attemptReconnect = () => {
        if (reconnectTimeout.current) {
            clearTimeout(reconnectTimeout.current);
        }

        toast({
            title: "Reconnecting",
            description: "Attempting to reconnect in 2 seconds...",
        });

        reconnectTimeout.current = window.setTimeout(() => {
            connect();
        }, reconnectInterval);
    };

    const sendMessage = () => {
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send(inputMessage);
            setMessages((prev) => [...prev, `Sent: ${inputMessage}`]);
            setInputMessage('');
        } else {
            toast({
                title: "Error",
                description: "WebSocket is not connected",
                variant: "destructive",
            });
        }
    };

    const addHeader = () => {
        setHeaders((prev) => [...prev, { key: '', value: '' }]);
    };

    const updateHeader = (index: number, key: string, value: string) => {
        setHeaders((prev) =>
            prev.map((header, i) => (i === index ? { key, value } : header))
        );
    };

    const removeHeader = (index: number) => {
        setHeaders((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle>Connection</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <Input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Enter WebSocket URL (e.g., ws://localhost:8080)"
                    />
                    <div className="space-y-2">
                        {headers.map((header, index) => (
                            <div key={"HeaderKeyValuePair__" + String(index)} className="flex space-x-2">
                                <Input
                                    type="text"
                                    placeholder="Header Key"
                                    value={header.key}
                                    onChange={(e) =>
                                        updateHeader(index, e.target.value, header.value)
                                    }
                                />
                                <Input
                                    type="text"
                                    placeholder="Header Value"
                                    value={header.value}
                                    onChange={(e) =>
                                        updateHeader(index, header.key, e.target.value)
                                    }
                                />
                                <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => removeHeader(index)}
                                >
                                    Remove
                                </Button>
                            </div>
                        ))}
                    </div>
                    <div className="space-x-4">
                        <Button size='sm' onClick={connect} disabled={connected}>
                            Connect
                        </Button>
                        <Button size='sm' onClick={disconnect} disabled={!connected} variant="destructive">
                            Disconnect
                        </Button>
                        <Button size="sm" onClick={addHeader}>
                            Add Header
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Send Message</CardTitle>
                    <CardDescription className='text-yellow-600'>
                        {connected ? "Start testing your socket signals :)" : "Once connected you'll be allowed to send message signals"}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <Input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder="Enter message to send"
                        disabled={!connected}
                    />
                    <Button size={"sm"} onClick={sendMessage} disabled={!connected}>
                        Send
                    </Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className='flex flex-row justify-between'>
                        <span>Message Logs</span>
                        <Button size={"sm"} className='rounded-3xl ml-auto' onClick={() => setMessages([])}>Clear Logs</Button>
                    </CardTitle>
                    <CardDescription className='text-yellow-600'>
                        These logs will be lost when you close the page.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Textarea
                        value={messages.join('\n')}
                        readOnly
                        className="h-48"
                    />
                </CardContent>
            </Card>
        </div>
    );
}

export default WebSocketTester;
