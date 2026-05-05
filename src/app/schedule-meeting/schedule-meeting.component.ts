import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MeetingService } from '../services/meeting.service';

@Component({
  selector: 'app-schedule-meeting',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './schedule-meeting.component.html',
  styleUrls: ['./schedule-meeting.component.css']
})
export class ScheduleMeetingComponent {

  meeting = {
    title: '',
    date: '',
    time: '',
    participants: '',
    description: ''
  };

  participantError = false;
  participantsArray: string[] = [];
  loading = false;

  constructor(private meetingService: MeetingService) {}

  onParticipantsChange(): void {
    if (!this.meeting.participants) {
      this.participantsArray = [];
      this.participantError = false;
      return;
    }

    const emails = this.meeting.participants
      .split(',')
      .map(e => e.trim())
      .filter(e => e.length > 0);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    this.participantError = emails.some(e => !emailRegex.test(e));
    this.participantsArray = emails;
  }

  saveMeeting(): void {
    if (!this.meeting.title || !this.meeting.date || !this.meeting.time || !this.meeting.participants.trim()) {
      alert('Please fill all required fields');
      return;
    }

    this.onParticipantsChange();

    if (this.participantError) {
      alert('Invalid email format');
      return;
    }

    if (this.participantsArray.length === 0) {
      alert('Please add at least one participant email');
      return;
    }

    const payload = {
      title: this.meeting.title,
      description: this.meeting.description,
      participants: this.participantsArray,
      meetingDateTime: `${this.meeting.date}T${this.meeting.time}:00`
    };

    this.loading = true;

    this.meetingService.createMeeting(payload).subscribe({
      next: (res) => {
        this.loading = false;
        if (res?.emailSent === false) {
          alert(res?.message || 'Meeting scheduled, but email was not sent. Please check backend mail settings.');
        } else {
          alert(`Meeting Scheduled & Emails Sent to ${res?.sentEmails?.length || this.participantsArray.length} participant(s)!`);
        }
        this.resetForm();
      },
      error: (err) => {
        this.loading = false;
        console.error('Meeting Error:', err);
        alert(err.error?.message || 'Failed to schedule meeting');
      }
    });
  }

  resetForm(): void {
    this.meeting = {
      title: '',
      date: '',
      time: '',
      participants: '',
      description: ''
    };

    this.participantsArray = [];
    this.participantError = false;
  }
}
