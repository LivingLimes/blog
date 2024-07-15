export function yearsSinceDate(startDate: Date) {
    const currentDate = new Date();
    
    const millisecondsDifference = currentDate.getTime() - startDate.getTime();
    const yearsDifference = millisecondsDifference / (1000 * 60 * 60 * 24 * 365.25);
    
    return Number(yearsDifference.toFixed(1));
  }