import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone'
import { GlobalMenuComponent } from '../components/global-menu/global-menu.component'
@Component({
    selector: 'app-recipe-details',
    templateUrl: './recipe-details.page.html',
    styleUrls: ['./recipe-details.page.scss'],
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
export class RecipeDetailsPage implements OnInit {
    // on load, get the recipe id from nav params
    recipeId!: string

    ngOnInit() {
        // Get the navigation state from the router
        this.recipeId = history.state.recipeId
    }
}
