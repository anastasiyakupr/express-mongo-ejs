"use strict";

// Initial Notification
console.log("The file 'script.min.js' has loaded...");

// Developer Tools
const devTools = document.createElement('div');
devTools.setAttribute('id', 'devTools');

const dev = document.getElementById('developer');

let toggle = 0;

let viewportWidth = window.innerWidth,
		viewportHeight = window.innerHeight;

let viewportSize = `
	<div class="viewportSize">
		<div>Width: ${viewportWidth}</div>
		<div>Height: ${viewportHeight}</div>
	</div>
`;

devTools.insertAdjacentHTML('beforeend', viewportSize);

window.addEventListener('resize', () => {
	viewportWidth = window.innerWidth;
	viewportHeight = window.innerHeight;
	viewportSize = `
			<div class="viewportSize">
				<div>Width: ${viewportWidth}</div>
				<div>Height: ${viewportHeight}</div>
			</div>
		`;

	while (devTools.firstChild) {
		devTools.removeChild(devTools.firstChild);
	}

	devTools.insertAdjacentHTML('beforeend', viewportSize);

}, false);

dev.addEventListener('click', () => {
	if (toggle < 3) {
		toggle += 1;
		console.log(toggle);
		if (toggle === 3) {
			devTools.insertAdjacentHTML('beforeend', viewportSize);
			dev.appendChild(devTools);
		}
	} 
});




