"use client"

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

function WebSocketTester() {
    const [url, setUrl] = useState('https://echo.websocket.org/');
    const [connected, setConnected] = useState(false);
    const [messages, setMessages] = useState<string[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const socketRef = useRef<WebSocket | null>(null);
    const { toast } = useToast();

    useEffect(() => {
        return () => {
            if (socketRef.current) {
                socketRef.current.close();
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

        socketRef.current = new WebSocket(url);

        socketRef.current.onopen = () => {
            setConnected(true);
            toast({
                title: "Connected",
                description: "WebSocket connection established",
            });
        };

        socketRef.current.onmessage = (event) => {
            setMessages((prev) => [...prev, `Received: ${event.data}`]);
        };

        socketRef.current.onclose = () => {
            setConnected(false);
            toast({
                title: "Disconnected",
                description: "WebSocket connection closed",
                variant: "destructive",
            });
        };

        socketRef.current.onerror = (error) => {
            console.error('WebSocket error:', error);
            toast({
                title: "Error",
                description: "WebSocket error occurred",
                variant: "destructive",
            });
        };
    };

    const disconnect = () => {
        if (socketRef.current) {
            socketRef.current.close();
        }
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
                    <div className="space-x-2">
                        <Button onClick={connect} disabled={connected}>
                            Connect
                        </Button>
                        <Button onClick={disconnect} disabled={!connected} variant="destructive">
                            Disconnect
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Send Message</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <Input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder="Enter message to send"
                        disabled={!connected}
                    />
                    <Button onClick={sendMessage} disabled={!connected}>
                        Send
                    </Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Messages</CardTitle>
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
