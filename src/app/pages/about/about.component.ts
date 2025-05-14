import { Component } from '@angular/core';
import { AboutSectionPaths } from '../../values/asset-paths';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  AboutSectionPaths = AboutSectionPaths;
}
