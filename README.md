# Live WebSocket Tester

A simple and interactive WebSocket testing tool that allows you to connect to WebSocket servers in real time, send messages, and receive responses. This tool is useful for developers and testers to validate WebSocket connections and test communication with various servers.

## Features

-   **Connect to WebSocket Servers:** Input a WebSocket URL and connect instantly.
-   **Send Custom Messages:** Send any text message and view the real-time response.
-   **Live Message Logs:** See incoming and outgoing messages with timestamps.
-   **Auto-Reconnect Option:** Automatically try to reconnect if the connection is lost.
-   **Customizable Headers:** Add or modify headers for your WebSocket connection.

## Getting Started

### Prerequisites

-   Node.js (v14 or later recommended)
-   npm or yarn

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/ankurjaiswalofficial/live-websocket-tester.git
    ```

2. Navigate to the project directory:

    ```bash
    cd live-websocket-tester
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

    Or if you're using yarn:

    ```bash
    yarn install
    ```

### Running the App

To start the application locally, run:

`npm run start`

Or with yarn:

`yarn start`

The application will be available at [http://localhost:3000](http://localhost:3000).

## Usage

1. **Connect to a WebSocket Server:**

    - Enter the WebSocket URL (e.g., [wss://echo.websocket.org](wss://echo.websocket.org)).
    - Click the **Connect** button.

2. **Send Messages:**

    - Type your message in the input box.
    - Press **Send** or hit the Enter key.

3. **View Logs:**

    - See the connection status, sent messages, and received responses in real time.

4. **Disconnect:**

    - Click the **Disconnect** button to close the connection.

## Built With

-   [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
-   [WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket) - Provides a way to establish a connection to a WebSocket server.

## Contributing

Feel free to submit issues or pull requests. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
