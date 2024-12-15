import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KafkaService {

  //private apiUrl = 'localhost:9092/my_topic'; // Update with your backend API endpoint
  private Kafkaurls = 'http://localhost:3001/kafka-messagess';
  private Kafka = 'http://localhost:3001/kafka';
  private KafkaSingVal = 'http://localhost:3001/kafka-messagess';
  private baseUrl='http://localhost:3001'
  constructor(private http: HttpClient) { }




 KafkaMessages(): Observable<any[]> {
  return this.http.get<any[]>(this.Kafka);
}
KafkaTestMessages(): Observable<any[]> {
  return this.http.get<any[]>(this.Kafkaurls);
}

// KafkaSingleMessages(): Observable<any[]> {
//   return this.http.get<any[]>(this.KafkaSingVal);
// }
KafkaValueSave(message) {
  console.log(message);
  this.http.post('http://localhost:3001/api/kafka/send-message', {message}).subscribe(
      (response) => {
        console.log('Message sent to Kafka:', response);
      },
      (error) => {
        console.error('Error sending message to Kafka:', error);
      }
    );  
}

createTopic(topicName: string): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}/create-topic/${topicName}`, {});
}


}
