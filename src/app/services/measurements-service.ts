import { Injectable } from '@angular/core'
import { Storage } from '@ionic/storage-angular'

@Injectable({
    providedIn: 'root',
})
export class MeasurementsService {
    constructor(private storage: Storage) {
        this.init()
    }

    // When the service is started, create a new storage instance which wil be used to persist measurement settings
    async init() {
        await this.storage.create()
    }

    async getMeasurements() {
        const measurementSetting = await this.storage.get('measurementSetting')

        // default to METRIC if not set and then save METRIC as default setting
        if (!measurementSetting) {
            await this.setMeasurements('METRIC')
            return 'METRIC'
        }
        return measurementSetting
    }

    async setMeasurements(measurements: 'US' | 'METRIC') {
        await this.storage.set('measurementSetting', measurements)
    }
}
