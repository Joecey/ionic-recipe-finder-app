import { Injectable } from '@angular/core'
import { HttpOptions, CapacitorHttp, HttpResponse } from '@capacitor/core'

@Injectable({
    providedIn: 'root',
})
export class RecipeDataService {
    // !!! WARNING: THIS IS REALLY STUPID AND THIS SHOULD BE IN AN .ENV FILE
    // TODO: hide this in an .env file after this assignment is graded
    private readonly API_KEY = '70759a4f7911402abcc53d3c51d3b759'

    // get multiple recipes from a list of ingredients
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

    // get a single recipe and it's details from one id
    async getRecipeById(id: string) {
        const options: HttpOptions = {
            url: `https://api.spoonacular.com/recipes/${id}/information`,
            params: {
                apiKey: this.API_KEY,
            },
        }
        const response: HttpResponse = await CapacitorHttp.get(options)
        return response.data
    }

    // get multiple recipes from a list of ids
    async getRecipesByIds(ids: string[]) {
        // TODO: fetch multiple recipes by a list of ids
    }
}
