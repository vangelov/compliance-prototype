
function fix(n) {
  if (n < 10) {
    return `0${n}`;
  }
  return n;
}

export function distanceInDaysFromNow(expiresAt) {
  const now = new Date();
  const nowStartOfDayDate = new Date(`${now.getFullYear()}-${fix(now.getMonth() + 1)}-${fix(now.getDate())}`);
  const expiresAtDate = new Date(expiresAt.split("T")[0]);

  const diffTime = Math.abs(expiresAtDate.getTime() - nowStartOfDayDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

  return diffDays;
}