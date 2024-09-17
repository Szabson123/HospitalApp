import { Component, OnInit } from '@angular/core';
import { EventService, Event } from '../services/event.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router'; 

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  currentMonth: number;
  currentYear: number;
  monthName: string;
  weeks: any[] = [];
  events: Event[] = [];
  showAddEventForm = false;
  newEvent: Partial<Event> = {};

  constructor(private eventService: EventService) {
    const today = new Date();
    this.currentMonth = today.getMonth();
    this.currentYear = today.getFullYear();
    this.monthName = this.getMonthName(this.currentMonth);
  }

  ngOnInit(): void {
    this.generateCalendar();
    this.loadEvents();
  }

  getMonthName(monthIndex: number): string {
    const months = [
      'Styczeń',
      'Luty',
      'Marzec',
      'Kwiecień',
      'Maj',
      'Czerwiec',
      'Lipiec',
      'Sierpień',
      'Wrzesień',
      'Październik',
      'Listopad',
      'Grudzień',
    ];
    return months[monthIndex];
  }

  generateCalendar(): void {
    this.weeks = [];
    const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1);
    const lastDayOfMonth = new Date(this.currentYear, this.currentMonth + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();

    let currentDay = 1;
    let week: (any | null)[] = [];

    // Dzień tygodnia pierwszego dnia miesiąca (poniedziałek = 1, niedziela = 7)
    let startDayOfWeek = firstDayOfMonth.getDay();
    if (startDayOfWeek === 0) startDayOfWeek = 7;

    // Wypełnienie pustych dni przed pierwszym dniem miesiąca
    for (let i = 1; i < startDayOfWeek; i++) {
      week.push(null);
    }

    // Wypełnienie dniami miesiąca
    while (currentDay <= daysInMonth) {
      if (week.length === 7) {
        this.weeks.push(week);
        week = [];
      }

      const dateStr = `${this.currentYear}-${('0' + (this.currentMonth + 1)).slice(-2)}-${('0' + currentDay).slice(-2)}`;

      week.push({
        date: currentDay,
        dateStr: dateStr,
        events: [],
      });

      currentDay++;
    }

    // Wypełnienie pustych dni po ostatnim dniu miesiąca
    while (week.length < 7) {
      week.push(null);
    }
    this.weeks.push(week);
  }

  loadEvents(): void {
    this.eventService.getEvents().subscribe((response) => {
      if (!response.isError) {
        this.events = response.value;
        this.mapEventsToCalendar();
      } else {
        console.error('Błąd podczas pobierania wydarzeń:', response.message);
      }
    });
  }

  mapEventsToCalendar(): void {
    for (let week of this.weeks) {
      for (let day of week) {
        if (day) {
          day.events = this.events.filter((event) => event.date.startsWith(day.dateStr));
        }
      }
    }
  }

  prevMonth(): void {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.monthName = this.getMonthName(this.currentMonth);
    this.generateCalendar();
    this.loadEvents();
  }

  nextMonth(): void {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.monthName = this.getMonthName(this.currentMonth);
    this.generateCalendar();
    this.loadEvents();
  }

  toggleAddEventForm(): void {
    this.showAddEventForm = !this.showAddEventForm;
    if (this.showAddEventForm) {
      this.newEvent = {};
    }
  }

  addEvent(): void {
    if (this.newEvent.date && this.newEvent.name) {
      this.eventService.addEvent(this.newEvent).subscribe((response) => {
        if (!response.isError) {
          this.events.push(response.value);
          this.mapEventsToCalendar();
          this.toggleAddEventForm();
        } else {
          console.error('Błąd podczas dodawania wydarzenia:', response.message);
        }
      });
    } else {
      alert('Proszę wypełnić wszystkie wymagane pola.');
    }
  }
}
