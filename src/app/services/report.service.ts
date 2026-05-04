import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({ providedIn: 'root' })
export class ReportService {

  // ✅ FIX: environment use
  private baseUrl = `${environment.apiUrl}/api/admin/reports`;

  constructor(private http: HttpClient) {}

  // ================= GET REPORTS =================
  getReports(fromDate?: string, toDate?: string) {
    let url = this.baseUrl;

    if (fromDate && toDate) {
      url += `?fromDate=${fromDate}&toDate=${toDate}`;
    }

    return this.http.get<any>(url);
  }

  // ================= EXPORT REPORT =================
  exportReport() {
    const url = `${this.baseUrl}/export`;

    return this.http.get(url, {
      responseType: 'blob' // file download
    });
  }
}