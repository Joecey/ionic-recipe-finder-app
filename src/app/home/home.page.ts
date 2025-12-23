import { Component } from '@angular/core'
import {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonSearchbar,
} from '@ionic/angular/standalone'
import { GlobalMenuComponent } from '../components/global-menu/global-menu.component'

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
    standalone: true,
    imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, GlobalMenuComponent],
})
export class HomePage {
    constructor() {}

    // TODO: add service to get recipes
    // TODO: on load or if search is empty, show  random recipes
    // TODO: figure out how to navigate to recipe details with a specific recipe id
}
