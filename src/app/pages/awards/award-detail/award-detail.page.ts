import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';

import { Award } from '../../../models/award.model';
import { AwardsService } from '../../../services/awards.service';
import { AwardCategory } from '../../../models/awardCategory.model';
import { DialogService } from '../../../components/dialog/utils/dialog.service';
import { AwardsCategoryService } from '../../../services/awardsCategory.service';
import { DialogFactoryService } from '../../../components/dialog/utils/dialog-factory.service';

@Component({
  selector: 'vgdb-award-detail',
  templateUrl: './award-detail.page.html',
  styleUrl: './award-detail.page.scss'
})
export class AwardDetailPage implements OnInit, OnDestroy {

  public award: Award;
  public routerSubs: Subscription;
  public backgroundStyle: any;

  public manageCategoriesShowList: boolean = true;
  public selectedCategory?: AwardCategory;

  public dialog: DialogService;
  
  @ViewChild('deleteDialog') deleteDialog: TemplateRef<any>;
  @ViewChild('awardForm') awardForm: TemplateRef<any>;
  @ViewChild('manageCategoriesDialog') manageCategoriesDialog: TemplateRef<any>;

  constructor(private awardsService: AwardsService,
    private awardsCategoryService: AwardsCategoryService,
    private dialogFactoryService: DialogFactoryService,
    private formBuilder: FormBuilder,
    private router: Router) {
  }

  ngOnInit() {
    this.loadAward();
    console.log('awardDet!');
    this.routerSubs = this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))  
    .subscribe((event: any) => {
      this.loadAward();
    });
  }

  ngOnDestroy() {
    this.routerSubs.unsubscribe();
  }

  public formSubmitted() {
    this.closeDialog();
    this.loadAward();
  }

  public closeDialog() {
    this.dialog.close();
  }

  public deleteAward() {
    this.closeDialog();
    this.awardsService.deleteAward(this.award.id!).subscribe(result => {
      this.router.navigate(['awards']);
    });
  }

  public presentEditDialog() {
    this.openDialog({
      headerText: 'Editar premio',
      template: this.awardForm,
      context: this.award
    });
  }

  public presentDeleteDialog() {
    this.openDialog({
      headerText: 'Eliminar premio',
      template: this.deleteDialog
    });
  }

  public presentManageCategoriesDialog() {
    this.manageCategoriesShowList = true;
    this.selectedCategory = undefined;
    this.openDialog({
      headerText: 'Gestionar categorías',
      template: this.manageCategoriesDialog
    });
  }

  public addCategory(category?: AwardCategory) {
    if (category) {
      this.selectedCategory = category;
    }
    this.manageCategoriesShowList = false;
  }

  public deleteCategory(category: AwardCategory) {
    this.awardsCategoryService.deleteCategory(category.id!).subscribe(result => {
      this.formSubmitted();
    });
  }

  private openDialog(dialogData: any): void {
    this.dialog = this.dialogFactoryService.open(dialogData);
  }


  private loadAward() {
    const split = this.router.url.split('/');
    const id = parseInt(split[split.length - 1]);
    this.awardsService.getAward(id).subscribe(result => {
      console.log('award', result)
      this.award = result;
    });
  }

}