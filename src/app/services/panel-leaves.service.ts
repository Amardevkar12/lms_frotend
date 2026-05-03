import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Leave {
  id?: number;
  employeeEmail?: string;
  reason?: string;
  startDate?: string;
  endDate?: string;
  status?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PanelLeavesService {

  private baseUrl = `${environment.apiUrl}/api/admin/leaves`;
  private calendarUrl = `${environment.apiUrl}/api/admin/calendar`;

  constructor(private http: HttpClient) {}

  // 🔐 Common Headers (JWT Token)
  private getHeaders() {
    const token = localStorage.getItem('token');

    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  // ================= GET ALL LEAVES =================
  getAllLeaves(): Observable<Leave[]> {
    return this.http.get<Leave[]>(this.baseUrl, this.getHeaders());
  }

  // ================= APPROVE LEAVE =================
  approveLeave(id: number): Observable<any> {
    return this.http.put(
      `${this.baseUrl}/${id}/approve`,
      {},
      this.getHeaders()
    );
  }

  // ================= REJECT LEAVE =================
  rejectLeave(id: number): Observable<any> {
    return this.http.put(
      `${this.baseUrl}/${id}/reject`,
      {},
      this.getHeaders()
    );
  }

  // ================= CALENDAR EVENTS =================
  getEvents(): Observable<any[]> {
    return this.http.get<any[]>(this.calendarUrl, this.getHeaders());
  }

  // ================= ADD LEAVE =================
  addLeave(data: Leave): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/apply`,
      data,
      this.getHeaders()
    );
  }
}