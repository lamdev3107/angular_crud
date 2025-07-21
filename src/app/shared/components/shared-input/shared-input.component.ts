import { Component, Input, OnInit, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-shared-input',
  templateUrl: './shared-input.component.html',
  styleUrls: ['./shared-input.component.scss'],
})
export class SharedInputComponent implements ControlValueAccessor, OnInit {
  @Input() label: string = '';
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  @Input() type: string = 'text';
  @Input() placeholder: string = '';

  value: any = '';
  onChange: any = () => {};
  onTouched: any = () => {};
  formControl!: FormControl;

  constructor(@Optional() @Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
  }

  ngOnInit(): void {
    if (this.ngControl && this.ngControl.control) {
      this.formControl = this.ngControl.control as FormControl;
      this.formControl.updateValueAndValidity();
    }
  }

  onInputChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.value = value;
    this.onChange(value);
  }

  //  ControlValueAccessor methods ---
  writeValue(obj: any): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
