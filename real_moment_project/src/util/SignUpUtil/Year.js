export const YEAR = [];

const nowYear = new Date().getFullYear();
const minYear = nowYear - 14;
for (let i = 1920; i <= minYear; i++) {
  YEAR.push(i);
}
