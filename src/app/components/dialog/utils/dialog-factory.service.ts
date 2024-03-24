import { Injectable } from '@angular/core'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog'
import { first } from 'rxjs/operators'

// Components
import { DialogComponent } from '../dialog.component'

// Services
import { DialogService } from './dialog.service'

@Injectable({
  providedIn: 'root'
})
export class DialogFactoryService<T = undefined> {
  constructor(private dialog: MatDialog) {}

  open(
    dialogData: any,
    options: any = { width: 500, disableClose: true }
  ): DialogService<T> {
    const dialogRef = this.dialog.open<DialogComponent<T>, any>(
      DialogComponent,
      {
        ...this.fetchOptions(options),
        data: dialogData
      }
    )

    dialogRef.afterClosed().pipe(first())

    return new DialogService(dialogRef)
  }

  private fetchOptions({
    width,
    disableClose
  }: any): Pick<
    MatDialogConfig<any>,
    'width' | 'disableClose'
  > {
    return {
      width: `${width}px`,
      disableClose
    }
  }
}