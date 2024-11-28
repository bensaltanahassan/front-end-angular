import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { TimelineModule } from 'primeng/timeline';
import { CardModule } from 'primeng/card';
import { MultiSelectModule } from 'primeng/multiselect';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { RatingModule } from 'primeng/rating';
import { ToolbarModule } from 'primeng/toolbar';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FieldsetModule } from 'primeng/fieldset';
import { CalendarModule } from 'primeng/calendar';
import { TagModule } from 'primeng/tag';
import { InputSwitchModule } from 'primeng/inputswitch';

const PRIME_NG_MODULES = [
    CalendarModule,
    FieldsetModule,
    MultiSelectModule,
    InputTextareaModule,
    ToastModule,
    FileUploadModule,
    RippleModule,
    ToolbarModule,
    RatingModule,
    RadioButtonModule,
    DropdownModule,
    InputNumberModule,
    DialogModule,
    ButtonModule,
    PanelMenuModule,
    StyleClassModule,
    TableModule,
    InputSwitchModule,
    TagModule,
    MenuModule,
    ChartModule,
    InputTextModule,
    PasswordModule,
    CheckboxModule,
    TimelineModule,
    CardModule,
];

@NgModule({
    declarations: [],
    imports: [CommonModule, ...PRIME_NG_MODULES],
    exports: PRIME_NG_MODULES,
})
export class SharedModule {}
