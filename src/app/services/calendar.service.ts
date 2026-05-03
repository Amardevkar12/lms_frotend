import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  // ✅ FIX: environment use karo
  private baseUrl = `${environment.apiUrl}/api/admin/calendar`;

  constructor(private http: HttpClient) {}

  // ================= GET ALL CALENDAR EVENTS =================
  getCalendarEvents() {
    return this.http.get(`${this.baseUrl}/events`);
  }

  // ================= GET EVENTS BY MONTH =================
  getEventsByMonth(month: number, year: number) {
    return this.http.get<any>(
      `${this.baseUrl}/events?month=${month}&year=${year}`
    );
  }

  // ================= GET EVENTS BY DATE RANGE =================
  getEventsByDateRange(fromDate: string, toDate: string) {
    return this.http.get<any>(
      `${this.baseUrl}/events?fromDate=${fromDate}&toDate=${toDate}`
    );
  }

}