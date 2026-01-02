import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone'
import { GlobalMenuComponent } from '../components/global-menu/global-menu.component'
import { Router } from '@angular/router'
import { RecipeDataService } from '../services/recipe-data-service'
import { ViewWillEnter } from '@ionic/angular'
import { verifyHttpResponse } from '../utils/verifyHttpResponse.util'
import { isRecipeDetails, type RecipeDetails } from '../utils/recipeTypes.util'

@Component({
    selector: 'app-recipe-details',
    templateUrl: './recipe-details.page.html',
    styleUrls: ['./recipe-details.page.scss'],
    standalone: true,
    imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, GlobalMenuComponent],
})
export class RecipeDetailsPage implements ViewWillEnter {
    // on load, get the recipe id from navigation state
    recipeId: number | undefined
    recipeData!: RecipeDetails | undefined
    loading: boolean = false

    // constructor for router and recipe service
    constructor(
        private router: Router,
        private recipeService: RecipeDataService
    ) {}

    // when view is updated to this page, update the recipe id
    ionViewWillEnter() {
        this.updateRecipeId()
    }

    // on load, we want to update the recipe id based on the nav from the previous route
    // additionally, we want to fetch the recipe with the corresponding id
    private updateRecipeId() {
        // Try multiple approaches to get the recipe ID
        const navigation = this.router.getCurrentNavigation()
        if (navigation?.extras.state?.['recipeId']) {
            this.recipeId = navigation.extras.state['recipeId']
        } else if (history.state['recipeId']) {
            this.recipeId = history.state['recipeId']
        }

        this.fetchRecipeInformationFromID()
    }

    async fetchRecipeInformationFromID() {
        // This is just a check in case the recipeID is undefined
        if (!this.recipeId) {
            console.error('No recipe ID found')
            return
        }
        this.loading = true
        console.log('Recipe ID:', this.recipeId)
        const response = await this.recipeService.getRecipeById(this.recipeId!.toString())
        console.log('Recipe:', response)

        if (verifyHttpResponse(response, isRecipeDetails)) {
            this.recipeData = response
        } else {
            console.error('Invalid response format:', response)
            alert('Invalid type format found when searching for recipes')
            this.recipeData = undefined
        }
        this.loading = false
    }

    async updateFavouriteRecipeState() {}
}
