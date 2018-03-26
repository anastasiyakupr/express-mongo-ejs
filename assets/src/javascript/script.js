"use strict";

// Initial Notification
console.log("The file 'script.min.js' has loaded...");

// Developer Tools
const dev = document.getElementById('developer');

// Dev Tools : Easter Egg Launcher
dev.addEventListener('click', () => {
	if (toggle < 3) {
		toggle += 1;
		if (toggle === 3) {
			devTools.insertAdjacentHTML('beforeend', viewportSize);
			dev.appendChild(devTools);
		}
	} else {
		toggle = 0;
		dev.removeChild(devTools);
	}
	console.log(toggle);
});

const devTools = document.createElement('div');
devTools.setAttribute('id', 'devTools');

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

// USER - Edit
const userEdit = document.querySelector("form button.userEdit");
userEdit.addEventListener('click', (e) => {
	e.preventDefault();
});

// USER - Delete
const userDelete = document.querySelector("form button.userDelete");
userDelete.addEventListener('click', (e) => {
	
	e.preventDefault();
	
	console.log("Verify");
	
	const modal = document.createElement('div');
	modal.setAttribute('id','modal');

	const verify = `
		<div class="modal-card">
			<h3>Are you sure?</h3>
			<button value="true">Yes</button>
			<button value="false">No</button>
		</div>
	`;
	modal.insertAdjacentHTML('beforeend', verify);
	document.body.appendChild(modal);

	document.addEventListener('keyup', (e) => {
    e = e || window.event;
    if (e.keyCode == 27) {
			document.body.removeChild(modal);
		}
	});

	let confirm = false;
	console.log("Delete User");
});

