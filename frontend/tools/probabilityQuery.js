// https://maplestory.nexon.com/Guide/OtherProbability/cube/black
const tables = Array.from(document.querySelectorAll("table.cube_data"));
const result = tables.map((table) => {
  const options = table.innerText.split("\n");
  options.shift();
  return options.map((option) => {
    const nameAndProb = option.split("\t");
    const regex = nameAndProb[0].match(/\d+/);
    const value = regex[regex.length - 1];
    const parsedValue = parseInt(value);

    const nameMatchedLastIndex = nameAndProb[0].lastIndexOf(value);
    const left = nameAndProb[0].substring(0, nameMatchedLastIndex);
    const right = nameAndProb[0].substring(nameMatchedLastIndex + value.length);

    const probability = parseFloat(nameAndProb[1].replace("%", "")) / 100;
    const fixedProb = parseFloat(probability.toFixed(6));

    return [left + "n" + right, parsedValue, fixedProb];
  });
});
console.log(JSON.stringify(result));
