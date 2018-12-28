export default function roundNumbers(value, decimals) {
    // return Number(Math.round(`${value}e${decimals}`)+`e-${decimals}`);
    return value.toFixed(2);
}