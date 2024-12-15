import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  kafkaValue;
  private socket: WebSocket | null = null;
  constructor() {
    this.connect();
   }

   
  connect() {
    this.socket = new WebSocket('ws://localhost:8080');

    this.socket.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    // this.socket.onmessage = (event) => {
    //   console.log('Message received:', event.data);
    //   this.kafkaValue=event.data

    // };

    this.socket.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
    }
  }

}
