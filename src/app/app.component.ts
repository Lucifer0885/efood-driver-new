import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import * as heroIcons from '@ng-icons/heroicons/outline';
import * as lucideIcons from '@ng-icons/lucide';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  viewProviders: [
    provideIcons(heroIcons),
    provideIcons(lucideIcons),
  ],
})
export class AppComponent {
  title = 'efood-driver';
}
