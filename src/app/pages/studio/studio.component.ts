import { Component } from '@angular/core';
import { StudioSectionPaths } from '../../values/asset-paths';

@Component({
  selector: 'app-studio',
  imports: [],
  templateUrl: './studio.component.html',
})
export class StudioComponent {
  StudioSectionPaths = StudioSectionPaths;
}
