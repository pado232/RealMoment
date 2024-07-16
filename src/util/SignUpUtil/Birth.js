export const YEAR = [];

const nowYear = new Date().getFullYear();
for (let i = 1980; i <= nowYear; i++) {
  YEAR.push(i);
}
