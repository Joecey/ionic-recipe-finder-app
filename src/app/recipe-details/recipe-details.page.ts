import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import {
    IonContent,
    IonButton,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonList,
    IonItem,
    IonLabel,
} from '@ionic/angular/standalone'
import { GlobalMenuComponent } from '../components/global-menu/global-menu.component'
import { Router } from '@angular/router'
import { RecipeDataService } from '../services/recipe-data-service'
import { ViewWillEnter } from '@ionic/angular'
import { verifyHttpResponse } from '../utils/verifyHttpResponse.util'
import { isRecipeDetails, type RecipeDetails } from '../utils/recipeTypes.util'
import { MeasurementsService } from '../services/measurements-service'

@Component({
    selector: 'app-recipe-details',
    templateUrl: './recipe-details.page.html',
    styleUrls: ['./recipe-details.page.scss'],
    standalone: true,
    imports: [
        IonContent,
        IonHeader,
        IonTitle,
        IonToolbar,
        CommonModule,
        GlobalMenuComponent,
        IonCard,
        IonCardHeader,
        IonCardSubtitle,
        IonButton,
        IonList,
        IonItem,
        IonLabel,
    ],
})
export class RecipeDetailsPage implements ViewWillEnter {
    // all our variables that will change when navigating to this page
    recipeId: number | undefined
    recipeData!: RecipeDetails | undefined
    loading: boolean = false
    measurement!: 'US' | 'METRIC'
    isFavourite!: boolean

    // constructor for router and recipe service
    // router is used to get the history state which contains the required recipe id
    constructor(
        private router: Router,
        private recipeService: RecipeDataService,
        private measurementService: MeasurementsService
    ) {}

    // when view is updated to this page, update the recipe id
    async ionViewWillEnter() {
        this.updateRecipeId()

        // then fetch the current measurement preference
        await this.fetchMeasurementPreference()

        // then fetch favourite recipe state
        await this.fetchFavouriteRecipeState()
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

    async fetchMeasurementPreference() {
        this.measurement = await this.measurementService.getMeasurements()
    }

    // TODO: favourite handling
    async updateFavouriteRecipeState() {}

    async fetchFavouriteRecipeState() {
        this.isFavourite = false
    }
}
