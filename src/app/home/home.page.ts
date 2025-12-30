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
import { RecipeDataService } from '../services/recipe-data-service'
import { isRecipeArray, type RecipeGeneric } from '../utils/isRecipeArray.util'
import { verifyHttpResponse } from '../utils/verifyHttpResponse.util'

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
    constructor(private recipeService: RecipeDataService) {}

    // TODO: figure out how to navigate to recipe details with a specific recipe id

    ingredientSearch: string = ''
    returnedRecipeData!: RecipeGeneric[]

    // Function used to search recipes based on ingredientSearch
    async searchRecipes() {
        if (!this.ingredientSearch.trim()) {
            this.returnedRecipeData = []
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

        alert(`you searched for ${formattedIngredients}`)
    }
}
