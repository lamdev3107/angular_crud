import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface LoadingState {
  isLoading: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<LoadingState>({
    isLoading: false,
  });

  public loading$: Observable<LoadingState> =
    this.loadingSubject.asObservable();

  constructor() {}

  show(): void {
    this.loadingSubject.next({
      isLoading: true,
    });
  }

  /**
   * Dừng loading
   */
  hide(): void {
    this.loadingSubject.next({
      isLoading: false,
    });
  }

  /**
   * Lấy trạng thái loading hiện tại
   */
  getCurrentState(): LoadingState {
    return this.loadingSubject.value;
  }

  /**
   * Kiểm tra có đang loading không
   */
  get isLoading(): boolean {
    return this.loadingSubject.value.isLoading;
  }
}
