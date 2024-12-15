import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-web-socket-component',
  templateUrl: './web-socket-component.component.html',
  styleUrls: ['./web-socket-component.component.css']
})
export class WebSocketComponentComponent implements OnInit {

  private socket: WebSocket | null = null;
  constructor() {
    this.connect();
   }

  ngOnInit(): void {
  }


  connect() {
    this.socket = new WebSocket('ws://localhost:8080');

    this.socket.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    this.socket.onmessage = (event) => {
      console.log('Message received:', event.data);
    };

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
