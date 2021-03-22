export default function createRandomText() {
  const possibleSymbols = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const possibleSymbolsLength = possibleSymbols.length;
  const maxLengthText = 4 + Math.floor(Math.random() * 7);
  const makeRandomChar = () => possibleSymbols.charAt(Math.floor(Math.random() * possibleSymbolsLength));
  return Array(maxLengthText).fill('').map(() => makeRandomChar()).join('');
}
