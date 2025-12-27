export const handleApiError = (error: any) => {
    console.error('API Error:', error);
    return 'An unexpected error occurred. Please try again.';
};