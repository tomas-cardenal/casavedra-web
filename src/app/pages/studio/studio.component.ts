import { Component } from '@angular/core';
import { StudioSectionPaths } from '../../values/asset-paths';

@Component({
  selector: 'app-studio',
  imports: [],
  templateUrl: './studio.component.html',
  styleUrl: './studio.component.scss',
})
export class StudioComponent {
  StudioSectionPaths = StudioSectionPaths;
}
