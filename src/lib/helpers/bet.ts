import dayjs from "dayjs";

export const calculPointByCelebrity = (birth: Date, death: Date): number => {
    const age = dayjs(death).diff(birth, "year");

    if (age >= 85) return 1;
    if (age >= 75) return 2;
    if (age >= 65) return 3;
    if (age >= 55) return 4;
    if (age >= 45) return 5;
    if (age >= 35) return 6;
    if (age >= 25) return 7;
    if (age >= 18) return 8;

    return 0;
};
