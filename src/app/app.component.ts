import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardListComponent } from './components/card-list/card-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CardDetailsComponent } from './components/card-details/card-details.component';
import { injectSpeedInsights } from '@vercel/speed-insights';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CardListComponent, NavbarComponent, CardDetailsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'mgt-api';

  ngOnInit(): void {
		injectSpeedInsights();
	}
}
