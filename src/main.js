const parts = [];

function addPart() {
	const partLength = parseFloat(document.getElementById('length').value);
	const partWidth = parseFloat(document.getElementById('width').value);

	if (isNaN(partLength) || isNaN(partWidth) || partLength <= 0 || partWidth <= 0) {
		alert('Please enter valid dimensions for the part.');
		return;
	}

	parts.push({ length: partLength, width: partWidth });
	updatePartsList();
}

function updatePartsList() {
	const partsListElement = document.getElementById('partsList');
	partsListElement.innerHTML = '';

	parts.forEach((part, index) => {
		const partElement = document.createElement('p');
		partElement.textContent = `Part ${index + 1}: ${part.length}" x ${part.width}"`;
		partsListElement.appendChild(partElement);
	});
}

function calculateNesting() {
	if (parts.length === 0) {
		alert('Please add at least one part to calculate nesting.');
		return;
	}

	const sheetLength = parseFloat(document.getElementById('sheetLength').value);
	const sheetWidth = parseFloat(document.getElementById('sheetWidth').value);

	if (isNaN(sheetLength) || isNaN(sheetWidth) || sheetLength <= 0 || sheetWidth <= 0) {
		alert('Please enter valid dimensions for the sheet.');
		return;
	}

	let totalParts = 0;
	let remainingArea = sheetLength * sheetWidth;

	parts.sort((a, b) => b.length - a.length); // Sort parts by length in descending order for better nesting

	const spacing = 0.1; // Spacing between parts (in inches)

	const sheetArea = sheetLength * sheetWidth;

	parts.forEach((part) => {
		const widthWithSpacing = part.width + spacing;
		const lengthWithSpacing = part.length + spacing;

		const maxPartsInWidth = Math.floor(sheetWidth / widthWithSpacing);
		const maxPartsInLength = Math.floor(sheetLength / lengthWithSpacing);

		const partsInSheet = maxPartsInWidth * maxPartsInLength;
		totalParts += partsInSheet;

		const areaOccupied = partsInSheet * part.length * part.width;
		remainingArea -= areaOccupied;
	});

	const result = `Best method for nesting: ${totalParts} parts can fit in the ${sheetWidth}" x ${sheetLength}" sheet. There is also a remaining area of ${remainingArea} square inches.`;

	document.getElementById('result').innerText = result;

	drawNesting(parts, sheetLength, sheetWidth, spacing);
}

function drawNesting(parts, sheetLength, sheetWidth, spacing) {
	const canvas = document.getElementById('canvas');
	const ctx = canvas.getContext('2d');
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	const scale = Math.min(canvas.width / sheetWidth, canvas.height / sheetLength);

	ctx.fillStyle = '#1f242a';
	ctx.fillRect(0, 0, sheetWidth * scale, sheetLength * scale);

	ctx.fillStyle = '#FFFFFF';

	let currentX = 0;
	let currentY = 0;

	parts.forEach((part) => {
		const widthWithSpacing = part.width * scale + spacing * scale;
		const lengthWithSpacing = part.length * scale + spacing * scale;

		if (currentX + widthWithSpacing > sheetWidth * scale) {
			currentX = 0;
			currentY += lengthWithSpacing;
		}

		ctx.fillRect(currentX, currentY, part.width * scale, part.length * scale);
		ctx.fillText(currentX + 5, currentY + 15);

		currentX += widthWithSpacing;
	});
}

function reset() {
	parts.length = 0;
	updatePartsList();
	document.getElementById('result').innerText = '';
	const canvas = document.getElementById('canvas');
	const ctx = canvas.getContext('2d');
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}
