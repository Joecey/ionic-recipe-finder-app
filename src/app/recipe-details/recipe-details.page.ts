import { Component, OnInit, OnDestroy } from '@angular/core'
import { CommonModule } from '@angular/common'
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone'
import { GlobalMenuComponent } from '../components/global-menu/global-menu.component'
import { Router, NavigationEnd } from '@angular/router'
import { filter } from 'rxjs/operators'
@Component({
    selector: 'app-recipe-details',
    templateUrl: './recipe-details.page.html',
    styleUrls: ['./recipe-details.page.scss'],
    standalone: true,
    imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, GlobalMenuComponent],
})
export class RecipeDetailsPage implements OnInit, OnDestroy {
    // on load, get the recipe id from navigation state
    recipeId: number | undefined
    private routerSubscription: any

    constructor(private router: Router) {}

    ngOnInit() {
        this.updateRecipeId()

        // Listen for navigation events to update recipe ID
        this.routerSubscription = this.router.events
            .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
            .subscribe(() => {
                this.updateRecipeId()
            })
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
    }

    // this fires when the component is removed completely and prevents memory leaks
    ngOnDestroy() {
        if (this.routerSubscription) {
            this.routerSubscription.unsubscribe()
        }
    }

    async updateFavouriteRecipeState() {}
}
