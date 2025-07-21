import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @Input() visible: boolean = false;
  @Input() title: string = '';
  @Output() close = new EventEmitter<void>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visible']) {
    }
  }
  onClose() {
    this.close.emit();
  }
}
