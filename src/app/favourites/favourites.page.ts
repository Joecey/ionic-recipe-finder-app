import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone'
import { GlobalMenuComponent } from '../components/global-menu/global-menu.component'
import { RecipeDataService } from '../services/recipe-data-service'
import { isRecipeArray, RecipeGeneric } from '../utils/recipeTypes.util'
import { verifyHttpResponse } from '../utils/verifyHttpResponse.util'
import { IonCard, IonCardHeader, IonCardTitle } from '@ionic/angular/standalone'
import { Router, NavigationExtras } from '@angular/router'

@Component({
    selector: 'app-favourites',
    templateUrl: './favourites.page.html',
    styleUrls: ['./favourites.page.scss'],
    standalone: true,
    imports: [
        IonContent,
        IonHeader,
        IonTitle,
        IonToolbar,
        CommonModule,
        FormsModule,
        GlobalMenuComponent,
        IonCard,
        IonCardHeader,
        IonCardTitle,
    ],
})
export class FavouritesPage implements OnInit {
    constructor(
        private recipeDataService: RecipeDataService,
        private router: Router
    ) {}
    returnedRecipeData!: RecipeGeneric[]

    ngOnInit() {}

    // when view is updated to this page, get the latest favourite recipes
    async ionViewWillEnter() {
        const results = await this.recipeDataService.getRecipesByIds()
        // Verify the response structure before setting it as returnedRecipeData
        if (verifyHttpResponse(results, isRecipeArray)) {
            this.returnedRecipeData = results
        } else {
            console.error('Invalid response format:', results)
            alert('Invalid type format found when searching for recipes')
            this.returnedRecipeData = []
        }
    }

    // method for navigating to specific recipe page
    navigateToRecipeDetails(recipeId: number) {
        const navigationExtras: NavigationExtras = {
            state: { recipeId },
        }

        this.router.navigate(['/recipe-details'], navigationExtras)
    }
}
