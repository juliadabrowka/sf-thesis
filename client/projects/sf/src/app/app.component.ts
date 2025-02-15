import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {TripService} from '../../../base/src/services/trip-service.service';

@Component({
  selector: 'sf-root',
  imports: [
    CommonModule,
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [TripService]
})
export class AppComponent {
}
