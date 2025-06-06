import { Injectable, signal } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class ScrollService {
  private previousUrl = '';
  private currentUrl = '';
  private scrollPositions = new Map<string, number>();
  private containerId = 'main-scroll-container';
  scrollDirection = signal<'up' | 'down'>('up');
  private lastY = 0;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        // Save scroll for gallery or collections
        if (this.isGalleryRoute(this.currentUrl)) {
          this.save(this.currentUrl);
        }
        this.previousUrl = this.currentUrl;
      }

      if (event instanceof NavigationEnd) {
        this.currentUrl = event.urlAfterRedirects;
        const container = document.getElementById(this.containerId);

        // Restore scroll if coming BACK to gallery or collection from artwork
        if (
          this.isGalleryRoute(this.currentUrl) &&
          this.previousUrl.startsWith('/artwork')
        ) {
          this.restore(this.currentUrl);
        } else {
          container?.scrollTo({ top: 0 });
        }
      }
    });
  }

  initScrollTracking() {
    const container = document.getElementById(this.containerId);
    if (!container) return;

    container.addEventListener('scroll', () => {
      const currentY = container.scrollTop;

      if (currentY > this.lastY + 10) {
        this.scrollDirection.set('down');
      } else if (currentY < this.lastY - 10) {
        this.scrollDirection.set('up');
      }

      this.lastY = currentY;
    });
  }

  private isGalleryRoute(url: string): boolean {
    return url.startsWith('/archive') || url.startsWith('/collections/');
  }

  private save(key: string) {
    const container = document.getElementById(this.containerId);
    if (container) {
      this.scrollPositions.set(key, container.scrollTop);
    }
  }

  private restore(key: string) {
    const container = document.getElementById(this.containerId);
    const y = this.scrollPositions.get(key) ?? 0;
    if (container) {
      requestAnimationFrame(() => container.scrollTo({ top: y }));
    }
  }
}
