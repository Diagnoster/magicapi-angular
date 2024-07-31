import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { NgOptimizedImage } from '@angular/common'

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    NgOptimizedImage
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

}
