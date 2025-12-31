import { Injectable } from '@angular/core'
import { HttpOptions, CapacitorHttp, HttpResponse } from '@capacitor/core'

@Injectable({
    providedIn: 'root',
})
export class RecipeDataService {
    // !!! WARNING: THIS IS REALLY STUPID AND THIS SHOULD BE IN AN .ENV FILE
    private readonly API_KEY = '70759a4f7911402abcc53d3c51d3b759'

    async getRecipesByIngredients(ingredients: string) {
        const options: HttpOptions = {
            url: 'https://api.spoonacular.com/recipes/complexSearch',
            params: {
                query: ingredients,
                apiKey: this.API_KEY,
                number: '30',
            },
        }
        const response: HttpResponse = await CapacitorHttp.get(options)
        return response.data
    }

    async getRecipeById(id: string) {
        // TODO: implement HTTP call to fetch recipes
    }
}
