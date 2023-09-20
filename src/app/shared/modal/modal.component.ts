import { Component, ElementRef, Output, EventEmitter } from '@angular/core';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  @Output() close = new EventEmitter();

  constructor(private el: ElementRef, private location: PlatformLocation) {
    // detecting the using navigation to  back
    this.location.onPopState(() => {
      this.el.nativeElement.remove();
    });
  }

  ngOnInit() {
    document.body.append(this.el.nativeElement);
  }

  ngOnDestroy() {
    this.el.nativeElement.remove();
  }

  removeModal() {
    this.close.emit();
  }
}
