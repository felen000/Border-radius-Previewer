let ranges = document.querySelectorAll(`.form-range`);
let checks = document.querySelectorAll(`.form-check-input`);
let block = document.querySelector(`.block`);
let result = document.querySelector(`.result`);
let codeArea = document.querySelector(`.code-area`)
let borderRadiuses = [`0px`, `0px`, `0px`, `0px`];
let topLeftBorder = borderRadiuses[0];
let topRightBorder = borderRadiuses[1];
let bottomRightBorder = borderRadiuses[2];
let bottomLeftBorder = borderRadiuses[3];
let styleValue = `0px 0px 0px 0px`;

for (let i = 0; i < ranges.length; i++) {
	const range = ranges[i];
  const check = checks[i];
	
  range.addEventListener(`input`, () => {
		setRadiuses(check, range, i)
		renderResult()
  });
	check.addEventListener(`change`, () => {
    setRadiuses(check, range, i)
		renderResult()
  });
	
}

codeArea.addEventListener(`click`, copyToClipboard)

function setRadiuses(check, range, i) {
	let unit = check.checked ? `%` : `px`;
	let radius = range.value + unit;
	borderRadiuses[i] = radius;
	
  topLeftBorder = borderRadiuses[0];
  topRightBorder = borderRadiuses[1];
  bottomRightBorder = borderRadiuses[2];
  bottomLeftBorder = borderRadiuses[3];
	styleValue = `${topLeftBorder} ${topRightBorder} ${bottomRightBorder} ${bottomLeftBorder}`;
	
	changeBlockRadius();
	
}

function changeBlockRadius() {
	block.style.borderRadius = styleValue;
}

function renderResult() {
	result.innerHTML = styleValue;
}

function copyToClipboard() {
	navigator.clipboard.writeText(`border-radius: ${styleValue};`)
}