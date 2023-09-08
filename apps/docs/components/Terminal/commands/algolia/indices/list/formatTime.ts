// https://blog.webdevsimplified.com/2020-07/relative-time-format/

const formatter = new Intl.RelativeTimeFormat(undefined, {
  numeric: "auto",
});

const DIVISIONS = [
  { amount: 60, name: "seconds" as const },
  { amount: 60, name: "minutes" as const },
  { amount: 24, name: "hours" as const },
  { amount: 7, name: "days" as const },
  { amount: 4.34524, name: "weeks" as const },
  { amount: 12, name: "months" as const },
  { amount: Number.POSITIVE_INFINITY, name: "years" as const },
];

const formatTime = (date: Date) => {
  let duration = (date.valueOf() - new Date().valueOf()) / 1000;

  for (let i = 0; i <= DIVISIONS.length; i++) {
    const division = DIVISIONS[i];
    if (Math.abs(duration) < division.amount) {
      return formatter.format(Math.round(duration), division.name);
    }
    duration /= division.amount;
  }
};

export default formatTime;
