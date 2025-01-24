export const handleApiError = (error) => {
    console.error('API Error:', error);
    return { error: 'Something went wrong' };
};