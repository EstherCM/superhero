import { Component, Input } from '@angular/core';

import { ConfirmationDialogService } from '../../services/confirmation-dialog.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'sh-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: [
    '../../../../styles/confirmation-dialog.scss',
    '../../../../styles/button.scss',
  ],
})
export class ConfirmationDialogComponent {
  @Input() contentHtml: string = '';

  public isDialogVisible = false;
  public isLoading = false;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(private confirmationDialogService: ConfirmationDialogService) {}

  ngOnInit() {
    this.confirmationDialogService
      .getDialogResponse()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.isDialogVisible = true;
      });

    this.confirmationDialogService
      .getLoadingStatus()
      .pipe(takeUntil(this.destroy$))
      .subscribe((isLoading) => {
        this.isLoading = isLoading;
      });
  }

  confirm() {
    this.confirmationDialogService.confirm();
    this.confirmationDialogService.startLoading();
  }

  cancel() {
    this.isDialogVisible = false;
    this.confirmationDialogService.cancel();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
