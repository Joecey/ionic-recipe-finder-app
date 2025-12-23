import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone'
import { GlobalMenuComponent } from '../components/global-menu/global-menu.component'

@Component({
    selector: 'app-settings',
    templateUrl: './settings.page.html',
    styleUrls: ['./settings.page.scss'],
    standalone: true,
    imports: [
        IonContent,
        IonHeader,
        IonTitle,
        IonToolbar,
        CommonModule,
        FormsModule,
        GlobalMenuComponent,
    ],
})
export class SettingsPage implements OnInit {
    constructor() {}

    ngOnInit() {}
}
