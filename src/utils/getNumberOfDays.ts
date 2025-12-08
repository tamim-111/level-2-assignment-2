const getNumberOfDays = (rent_start_date: string, rent_end_date: string): number => {


    const start = new Date(rent_start_date);
    const end = new Date(rent_end_date);

    // Get difference in milliseconds
    const diffMs = end.getTime() - start.getTime();

    // Convert to days
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    return diffDays;
};

export default getNumberOfDays