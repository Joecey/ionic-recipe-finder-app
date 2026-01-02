import { Component } from '@angular/core'
import {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonSearchbar,
    IonButton,
    IonCardHeader,
    IonCard,
    IonCardContent,
    IonCardTitle,
} from '@ionic/angular/standalone'
import { GlobalMenuComponent } from '../components/global-menu/global-menu.component'
import { FormsModule } from '@angular/forms'
import { RecipeDataService } from '../services/recipe-data-service'
import { isRecipeArray, type RecipeGeneric } from '../utils/isRecipeArray.util'
import { verifyHttpResponse } from '../utils/verifyHttpResponse.util'
import { Router, NavigationExtras } from '@angular/router'

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
        IonCard,
        IonCardHeader,
        IonCardTitle,
        GlobalMenuComponent,
        FormsModule,
    ],
})
export class HomePage {
    // Inject the custom recipe service and nav controllern
    constructor(
        private recipeService: RecipeDataService,
        private router: Router
    ) {}

    ingredientSearch: string = ''
    returnedRecipeData!: RecipeGeneric[]
    loading: boolean = false

    // Function used to search recipes based on ingredientSearch
    async searchRecipes() {
        this.loading = true
        if (!this.ingredientSearch.trim()) {
            this.returnedRecipeData = []
            this.loading = false
            return
        }

        // The ingredients need to be formatted as the following (ingredients=apples,flour,sugar)
        // This is done to prevent any leading/trailing spaces that might break the API call
        const formattedIngredients = this.ingredientSearch
            .split(',')
            .map((ingredient) => ingredient.trim())
            .join(',')

        const response = await this.recipeService.getRecipesByIngredients(formattedIngredients)
        const results = response.results

        // Verify the response structure before setting it as returnedRecipeData
        if (verifyHttpResponse(results, isRecipeArray)) {
            this.returnedRecipeData = results
        } else {
            console.error('Invalid response format:', results)
            alert('Invalid type format found when searching for recipes')
            this.returnedRecipeData = []
        }
        this.loading = false
    }

    // method for navigating to specific recipe page
    navigateToRecipeDetails(recipeId: number) {
        const navigationExtras: NavigationExtras = {
            state: { recipeId },
        }

        this.router.navigate(['/recipe-details'], navigationExtras)
    }
}
