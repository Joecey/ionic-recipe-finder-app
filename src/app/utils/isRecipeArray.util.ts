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
