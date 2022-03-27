export const dayOfYear = (incomingDate: Date) => {
  const year: Date = new Date(incomingDate.getFullYear(), 0, 0);
  return Math.floor((incomingDate.getTime() - year.getTime()) / 1000 / 60 / 60 / 24);
};

export const dayIncrementor = (day: number) => {
  if (day >= 365 || day <= 0) {
    return 1;
  }

  return day + 1;
};
