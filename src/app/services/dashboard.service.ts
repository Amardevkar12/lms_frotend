import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  // ✅ FIX: environment use karo
  private apiUrl = `${environment.apiUrl}/api/admin/dashboard`;
  private calendarUrl = `${environment.apiUrl}/api/admin/calendar`;
  private reportUrl = `${environment.apiUrl}/api/admin/reports`;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  // ================= DASHBOARD =================
  getDashboard(): Observable<any> {

    let headers: any = {};

    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('lms_token');

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return this.http.get<any>(this.apiUrl, { headers });
  }

  // ================= CALENDAR =================
  getCalendarEvents() {
    return this.http.get(`${this.calendarUrl}/events`);
  }

  // ================= PDF REPORT =================
  downloadReportPdf() {
    return this.http.get(
      `${this.reportUrl}/pdf`,
      { responseType: 'blob' }
    );
  }

  // ================= EXCEL REPORT =================
  downloadExcelReport() {
    return this.http.get(
      `${this.reportUrl}/excel`,
      { responseType: 'blob' }
    );
  }
}