import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  // ✅ FIX: environment use
  private baseUrl = `${environment.apiUrl}/api/meetings`;

  constructor(private http: HttpClient) {}

  // ================= CREATE MEETING =================
  createMeeting(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  // ================= GET ALL MEETINGS =================
  getMeetings(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }
}