import { MatButtonModule } from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MAT_DATE_FORMATS, DateAdapter,MatNativeDateModule,MAT_DATE_LOCALE} from '@angular/material/core';
import { NgModule } from "@angular/core";
import { MatTableModule } from '@angular/material/table';
import { MatInputModule,} from "@angular/material/input";
import {MatToolbarModule} from "@angular/material/toolbar";
import { MatDialogRef,MAT_DIALOG_DATA, MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSortModule} from '@angular/material/sort';
import {MatSelectModule} from '@angular/material/select';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MAT_CHIPS_DEFAULT_OPTIONS,MatChipsModule} from '@angular/material/chips';
import {  MatDividerModule} from "@angular/material/divider";
import {MatTreeModule} from "@angular/material/tree";
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { CdkTreeModule } from '@angular/cdk/tree';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import {ClipboardModule} from '@angular/cdk/clipboard';
import { MatTabsModule } from '@angular/material/tabs';
export const FORMATOS_PADROES = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MM YYYY',
  },
};

@NgModule({
  imports: [
   
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,   
    MatFormFieldModule, 
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    MatInputModule,
    MatDialogModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatDividerModule,
    CdkTreeModule,
    MatTreeModule,
    MatProgressBarModule,
    MatAutocompleteModule,
    MatTooltipModule,    
    MatCardModule,
    MatBadgeModule,
    MatButtonToggleModule,    
    DragDropModule,
    MatSlideToggleModule,
    MatExpansionModule,
    ClipboardModule,
    MatAutocompleteModule,
    MatTooltipModule,
    MatTabsModule
    
  ],
  providers: [
    
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MAT_DATE_LOCALE, useValue: 'pt' },
    { provide: MAT_CHIPS_DEFAULT_OPTIONS, useValue: { separatorKeyCodes: [ENTER, COMMA] } },
    { provide: MAT_DATE_FORMATS, useValue: FORMATOS_PADROES },
    
  ]
})
export class MaterialModule {
}