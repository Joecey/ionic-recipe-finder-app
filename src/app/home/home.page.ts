import { Component } from '@angular/core'
import {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonSearchbar,
    IonButton,
} from '@ionic/angular/standalone'
import { GlobalMenuComponent } from '../components/global-menu/global-menu.component'
import { FormsModule } from '@angular/forms'

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
    standalone: true,
    imports: [
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonSearchbar,
        IonButton,
        GlobalMenuComponent,
        FormsModule,
    ],
})
export class HomePage {
    // TODO: add service to get recipes
    // TODO: on load or if search is empty, show  random recipes
    // TODO: figure out how to navigate to recipe details with a specific recipe id

    ingredientSearch: string = ''

    // Function used to search recipes based on ingredientSearch
    searchRecipes() {
        if (!this.ingredientSearch.trim()) {
            return
        }

        // The ingredients need to be formatted as the following (ingredients=apples,+flour,+sugar)
        const formattedIngredients = this.ingredientSearch
            .split(',')
            .map((ingredient) => ingredient.trim())
            .join(',+')

        alert(`you searched for ${formattedIngredients}`)
    }
}
