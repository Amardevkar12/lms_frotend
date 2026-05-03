import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiResponse } from '../models/auth.model';
import { DashboardStats, LeaveApplyRequest, LeaveResponse } from '../models/leave.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class LeaveService {

  private apiUrl = `${environment.apiUrl}/api/leaves`;

  constructor(private http: HttpClient) {}

  // 🔐 COMMON HEADERS (JWT)
  private getHeaders() {
    const token = localStorage.getItem('lms_token');

    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  // ================= APPLY LEAVE =================
  applyLeave(request: LeaveApplyRequest): Observable<ApiResponse<LeaveResponse>> {
    return this.http.post<ApiResponse<LeaveResponse>>(
      `${this.apiUrl}/apply`,
      request,
      this.getHeaders()
    );
  }

  // ================= MY LEAVES =================
  getMyLeaves(): Observable<ApiResponse<LeaveResponse[]>> {
    return this.http.get<ApiResponse<LeaveResponse[]>>(
      `${this.apiUrl}/my`,
      this.getHeaders()
    );
  }

  // ================= TEAM LEAVES =================
  getTeamLeaves(): Observable<ApiResponse<LeaveResponse[]>> {
    return this.http.get<ApiResponse<LeaveResponse[]>>(
      `${this.apiUrl}/team`,
      this.getHeaders()
    );
  }

  // ================= APPROVE LEAVE =================
  approveLeave(id: number): Observable<ApiResponse<LeaveResponse>> {
    return this.http.put<ApiResponse<LeaveResponse>>(
      `${this.apiUrl}/approve/${id}`,
      {},
      this.getHeaders()
    );
  }

  // ================= REJECT LEAVE =================
  rejectLeave(id: number, rejectionReason?: string): Observable<ApiResponse<LeaveResponse>> {
    return this.http.put<ApiResponse<LeaveResponse>>(
      `${this.apiUrl}/reject/${id}`,
      { rejectionReason },
      this.getHeaders()
    );
  }

  // ================= DASHBOARD =================
  getEmployeeDashboard(): Observable<ApiResponse<DashboardStats>> {
    return this.http.get<ApiResponse<DashboardStats>>(
      `${this.apiUrl}/dashboard/employee`,
      this.getHeaders()
    );
  }

  getManagerDashboard(): Observable<ApiResponse<DashboardStats>> {
    return this.http.get<ApiResponse<DashboardStats>>(
      `${this.apiUrl}/dashboard/manager`,
      this.getHeaders()
    );
  }

  // ================= LEAVE BALANCE =================
  getLeaveBalance(): Observable<ApiResponse<DashboardStats>> {
    return this.http.get<ApiResponse<DashboardStats>>(
      `${this.apiUrl}/balance`,
      this.getHeaders()
    );
  }
}