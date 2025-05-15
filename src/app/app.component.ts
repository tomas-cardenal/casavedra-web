import { RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';
import { ScrollService } from './services/scroll.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(private scrollService: ScrollService) {}
  title = 'casavedra-web';
}
