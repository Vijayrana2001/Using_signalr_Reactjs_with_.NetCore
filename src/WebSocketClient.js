// WebSocketClient.js
class WebSocketClient {
    constructor() {
      this.ws = null;
    }
  
    connect() {
      this.ws = new WebSocket('ws://localhost:8080'); // WebSocket server URL
  
      this.ws.onopen = () => {
        console.log('WebSocket connected');
      };
  
      this.ws.onmessage = (event) => {
        // Handle incoming messages from WebSocket server
        console.log('Received message:', event.data);
        // You need to parse the incoming message and trigger appropriate actions
      };
    }
  
    sendTyping(user, isTyping) {
      this.ws.send(JSON.stringify({ user, isTyping }));
    }
  
    onTyping(callback) {
      this.ws.addEventListener('message', (event) => {
        const data = JSON.parse(event.data);
        callback(data.user);
      });
    }
  
    close() {
      if (this.ws) {
        this.ws.close();
      }
    }
  }
  
  export default WebSocketClient;
  