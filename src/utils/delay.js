export const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export const randomDelay = (min = 200, max = 500) => {
    const ms = Math.random() * (max - min) + min;
    return delay(ms);
};
