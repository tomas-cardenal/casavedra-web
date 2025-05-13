import {
  Directive,
  ElementRef,
  signal,
  WritableSignal,
  afterNextRender,
} from '@angular/core';

@Directive({
  selector: '[useInView]',
  standalone: true,
  exportAs: 'inView',
})
export class UseInViewDirective {
  visible: WritableSignal<boolean> = signal(false);

  constructor(private el: ElementRef) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.visible.set(true);
          observer.disconnect(); // One-time visibility
        }
      },
      { threshold: 0.1 }
    );

    // Delay observing until after render
    afterNextRender(() => {
      observer.observe(this.el.nativeElement);
    });
  }
}
