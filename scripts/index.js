let ranges = document.querySelectorAll(`.form-range`);
let checks = document.querySelectorAll(`.js-border-check`);
let verticalRadiusSwitch = document.querySelector(`.js-vertical-check`);
let block = document.querySelector(`.block`);
let result = document.querySelector(`.result`);
let codeArea = document.querySelector(`.code-area`);
let borderRadiuses = [`0px`, `0px`, `0px`, `0px`, `0px`, `0px`, `0px`, `0px`];
let styleValue = `0px 0px 0px 0px`;

for (let i = 0; i < ranges.length; i++) {
  const range = ranges[i];
  const check = checks[i];

	if (check.checked) {
		range.max = 100
	} else {
		range.max = 300
	}

  range.addEventListener(`input`, () => {
    setRadiuses(check, range, i);
    renderResult();
  });
  check.addEventListener(`change`, () => {
    setRadiuses(check, range, i);
    renderResult();
  });
}

verticalRadiusSwitch.addEventListener(`change`, ()=> {
	for (let i = 4; i < ranges.length; i++) {
		const range = ranges[i];
		const check = checks[i];
	
		range.disabled = !range.disabled
		check.disabled = !check.disabled
	}
})

codeArea.addEventListener(`click`, copyToClipboard);

function setRadiuses(check, range, i) {
  let unit = check.checked ? `%` : `px`;
  let radius = range.value + unit;
  borderRadiuses[i] = radius;

	if (verticalRadiusSwitch.checked) {	
		styleValue = `${ getHorizontalRadiusValue() } / ${ getVerticalRadiusValue() }`;
	} else {
		styleValue = getHorizontalRadiusValue();
	}

  changeBlockRadius();
}

function getHorizontalRadiusValue() {
  let topLeftBorderHorizontal = borderRadiuses[0];
  let topRightBorderHorizontal = borderRadiuses[1];
  let bottomRightBorderHorizontal = borderRadiuses[2];
  let bottomLeftBorderHorizontal = borderRadiuses[3];

  return `${topLeftBorderHorizontal}
					${topRightBorderHorizontal}
					${bottomRightBorderHorizontal} 
					${bottomLeftBorderHorizontal}`;
}

function getVerticalRadiusValue() {
  let topLeftBorderVertical = borderRadiuses[4];
  let topRightBorderVertical = borderRadiuses[5];
  let bottomRightBorderVertical = borderRadiuses[6];
  let bottomLeftBorderVertical = borderRadiuses[7];

  return `${topLeftBorderVertical}
					${topRightBorderVertical}
					${bottomRightBorderVertical} 
					${bottomLeftBorderVertical}`;
}

function changeBlockRadius() {
  block.style.borderRadius = styleValue;
}

function renderResult() {
  result.innerHTML = styleValue;
}

function copyToClipboard() {
  navigator.clipboard.writeText(`border-radius: ${styleValue};`);

  notice = document.querySelector(`.notice`);
  notice.classList.add(`active`);
  setTimeout(() => {
    notice.classList.remove(`active`);
  }, 1000);
}
