import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonRadio,
    IonRadioGroup,
} from '@ionic/angular/standalone'
import { GlobalMenuComponent } from '../components/global-menu/global-menu.component'
import { MeasurementsService } from '../services/measurements-service'

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
        IonRadio,
        IonRadioGroup,
    ],
})
export class SettingsPage implements OnInit {
    measurementSetting!: 'US' | 'METRIC'

    constructor(private measurementsService: MeasurementsService) {}

    async ngOnInit() {
        // initialise the measurement preference from ionic storage + the created service
        this.measurementSetting = await this.measurementsService.getMeasurements()
    }

    // on change, update the storage setting and the local setting for visual clarity
    async setNewMeasurement(value: 'US' | 'METRIC') {
        this.measurementSetting = value
        await this.measurementsService.setMeasurements(value)
    }
}
