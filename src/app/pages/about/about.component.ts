import { Component } from '@angular/core';
import { AboutSectionPaths } from '../../values/asset-paths';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.component.html',
})
export class AboutComponent {
  AboutSectionPaths = AboutSectionPaths;
}
