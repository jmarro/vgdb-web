import { Component, Inject, TemplateRef } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'

/**
 * A common component rendered as a Material dialog
 */
@Component({
  selector: 'vgdb-dialog',
  styleUrls: ['dialog.component.scss'],
  template: `
    <div class="dialog-header"><h2 mat-dialog-title>{{ data.headerText }}</h2><button mat-button mat-dialog-close>X</button></div>
    <div mat-dialog-content>
      <ng-container [ngTemplateOutlet]="data.template"></ng-container>
    </div>
  `
})
export class DialogComponent<T> {
  /**
   * Initializes the component.
   *
   * @param dialogRef - A reference to the dialog opened.
   */
  constructor(
    public dialogRef: MatDialogRef<DialogComponent<T>>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      headerText: string
      template: TemplateRef<any>
      context: T
    }
  ) {}
}