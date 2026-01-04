import { Injectable } from '@angular/core'
import { Storage } from '@ionic/storage-angular'

@Injectable({
    providedIn: 'root',
})
export class FavouritesService {
    constructor(private storage: Storage) {
        this.init()
    }
    // When the service is started, create a new storage instance which wil be used to grab favourite recipes
    async init() {
        await this.storage.create()
    }

    async getFavouriteRecipes() {
        const favouriteRecipes = await this.storage.get('favouriteRecipes')

        // just return an empty string if something goes wrong
        if (!favouriteRecipes) {
            return []
        }
        return favouriteRecipes // this will have an array of numbers
    }

    async updateFavouriteRecipesForIdNumber(recipeId: number) {
        const currentRecipes = await this.getFavouriteRecipes()
        if (currentRecipes.includes(recipeId)) {
            // if the recipe is already in the list, remove it
            currentRecipes.splice(currentRecipes.indexOf(recipeId), 1)
        } else {
            // if it isn't, add it to the end of the list
            currentRecipes.push(recipeId)
        }
        // then update the list accordingly
        await this.storage.set('favouriteRecipes', currentRecipes)
    }
}
