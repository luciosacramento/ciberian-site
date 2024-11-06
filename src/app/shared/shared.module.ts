import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';
import { SafeHtmlPipe } from './pipes/safeHtml/safeHtml.pipe';

import { AguardeDialog } from './dialogs/aguarde/aguarde.dialog';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { ConfirmacaoDialog } from './dialogs/confirmacao/confirmacao.dialog';
import { CarouselComponent } from './carousel/carousel.component';


@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule,
        ReactiveFormsModule,       
        FormsModule
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
    declarations: [        
        SafeHtmlPipe,
        AguardeDialog,
        ConfirmacaoDialog,
        CarouselComponent

    ],
    exports: [
        CommonModule,
        MaterialModule,
        RouterModule,       
        SafeHtmlPipe,
        CarouselComponent
    ],
    providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}}     
    ]
})
export class SharedModule { }
