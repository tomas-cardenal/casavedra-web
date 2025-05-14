import { INSTAGRAM_LINK } from './../../values/constants';
import { Component, ViewChild, inject } from '@angular/core';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { filter } from 'rxjs/operators';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { LogoPaths } from '../../values/asset-paths';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './main-layout.component.html',
  animations: [
    trigger('collapse', [
      state(
        'open',
        style({
          height: '*',
          opacity: 1,
          marginTop: '*',
          paddingTop: '*',
          paddingBottom: '*',
          overflow: 'hidden',
        })
      ),
      state(
        'closed',
        style({
          height: '0px',
          opacity: 0,
          marginTop: '0px',
          paddingTop: '0px',
          paddingBottom: '0px',
          overflow: 'hidden',
        })
      ),
      transition('closed <=> open', animate('300ms ease-in-out')),
    ]),
  ],
})
export class MainLayoutComponent {
  logoPath = LogoPaths.LOGO;
  isMobile = false;
  menuOpen = false;
  collectionsOpen = false;
  collectionsVisible = false;
  instagramLink = INSTAGRAM_LINK;

  private breakpointObserver = inject(BreakpointObserver);
  private router = inject(Router);

  @ViewChild('drawer') drawer!: MatSidenav;

  ngOnInit() {
    // Update layout based on screen size
    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.XSmall])
      .subscribe((result) => {
        this.isMobile = result.matches;
      });

    // Close drawer on navigation (only on mobile)
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.collectionsOpen = false;
        this.collectionsVisible = false;
        if (this.isMobile && this.drawer?.opened) {
          this.drawer.close();
        }
      });
  }

  toggleCollections() {
    if (!this.collectionsOpen) {
      this.collectionsVisible = true;
      requestAnimationFrame(() => (this.collectionsOpen = true));
    } else {
      this.collectionsOpen = false;
      setTimeout(() => (this.collectionsVisible = false), 300); // Match animation time
    }
  }

  onDrawerStateChange(opened: boolean) {
    this.menuOpen = opened;
  }
}
