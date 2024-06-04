/**
 * Format data into a standardized response format.
 */
export const formatData = (data: any): any => {
    if (data) {
        return { data };
    } else {
        throw new Error("Data not found!");
    }
};
