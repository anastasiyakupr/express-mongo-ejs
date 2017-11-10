// Limit scope of registration button to GET /
const h1 = document.querySelector('h1');
const title = h1.innerHTML;

if (title == "Home") {
	const button = document.querySelector('button');
	button.addEventListener('click', () => {
		document.location.href = '/register';
	});
}

