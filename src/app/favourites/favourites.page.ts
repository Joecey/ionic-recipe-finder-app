import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone'
import { GlobalMenuComponent } from '../components/global-menu/global-menu.component'
import { FavouritesService } from '../services/favourites-service'

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
    ],
})
export class FavouritesPage implements OnInit {
    constructor(private favouritesService: FavouritesService) {}
    favouriteRecipes: number[] = []

    ngOnInit() {}

    // when view is updated to this page, get the latest favourite recipes
    async ionViewWillEnter() {
        this.favouriteRecipes = await this.favouritesService.getFavouriteRecipes()
    }
}
