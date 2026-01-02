export type RecipeGeneric = {
    id: number
    image: string
    imageType: string
    title: string
}

// This is the validator for the recipe array from the complex search API
export function isRecipeArray(data: unknown): data is RecipeGeneric[] {
    if (!Array.isArray(data)) return false

    return data.every(
        (item) =>
            typeof item === 'object' &&
            item !== null &&
            typeof (item as any).id === 'number' &&
            typeof (item as any).title === 'string' &&
            typeof (item as any).image === 'string' &&
            typeof (item as any).imageType === 'string'
    )
}

type Instructions = {
    steps: {
        number: number
        step: string
    }[]
}

type Ingredient = {
    originalName: string
    image: string // This will be added to the end of the https://img.spoonacular.com/ingredients_100x100/apple.jpg url
    measures: {
        metric: {
            amount: number
            unitLong: string
        }
        us: {
            amount: number
            unitLong: string
        }
    }
}

export type RecipeDetails = {
    id: number
    image: string
    analyzedInstructions: Instructions[]
    summary: string
    title: string
    extendedIngredients: Ingredient[]
}

// this will be the validator for type checking when looking at our recipe details
export function isRecipeDetails(data: unknown): data is RecipeDetails {
    if (!data || typeof data !== 'object') return false

    const recipe = data as any

    return (
        typeof recipe.id === 'number' &&
        typeof recipe.image === 'string' &&
        Array.isArray(recipe.analyzedInstructions) &&
        recipe.analyzedInstructions.every(
            (instruction: any) =>
                typeof instruction === 'object' &&
                instruction !== null &&
                Array.isArray(instruction.steps) &&
                instruction.steps.every(
                    (step: any) =>
                        typeof step === 'object' &&
                        step !== null &&
                        typeof step.number === 'number' &&
                        typeof step.step === 'string'
                )
        ) &&
        typeof recipe.summary === 'string' &&
        typeof recipe.title === 'string' &&
        Array.isArray(recipe.extendedIngredients) &&
        recipe.extendedIngredients.every(
            (ingredient: any) =>
                typeof ingredient === 'object' &&
                ingredient !== null &&
                typeof ingredient.originalName === 'string' &&
                typeof ingredient.image === 'string' &&
                typeof ingredient.measures === 'object' &&
                ingredient.measures !== null &&
                typeof ingredient.measures.metric === 'object' &&
                ingredient.measures.metric !== null &&
                typeof ingredient.measures.metric.amount === 'number' &&
                typeof ingredient.measures.metric.unitLong === 'string' &&
                typeof ingredient.measures.us === 'object' &&
                ingredient.measures.us !== null &&
                typeof ingredient.measures.us.amount === 'number' &&
                typeof ingredient.measures.us.unitLong === 'string'
        )
    )
}
