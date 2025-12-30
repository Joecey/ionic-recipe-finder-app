// I created this utility to provide type safety across all my api responses

export function verifyHttpResponse<T>(
    data: unknown,
    validator: (obj: unknown) => obj is T
): data is T {
    return validator(data)
}
