const invoiceMaterials = document.getElementById('invoiceMaterial');
const canvasSizeOutput = document.getElementById('canvasSizeCalc');
///////// OUTPUTS /////////
///////// CANVAS /////////
const packingContainer = document.getElementById('packing');
const settingsContainer = document.getElementById('settings');
const canvas = document.getElementById('canvas');

///////// INPUTS /////////
let inputASw = document.getElementById('on-off-sw--1');
const inputDivs = document.querySelectorAll('#inputItems1');
// material container
const materialSection = document.getElementById('materialSection');
// add material btn
const addMaterialBtn = document.getElementById('addBtn');
const multiplier = document.getElementById('matMultiplier');

const refreshBtn = document.getElementById('refreshBtn');
const costMultiplied = document.getElementById('costIfMultiplied');
///////// INPUTS /////////

///////// MATERIAL CHANGER VARIABLES /////////
// sort option selector
const sortList = document.getElementById('sort');
const presets = document.getElementById('examples');
// size of material selector
const sizeOptionList = document.getElementById('size');
// viny, probond etc
const materialList = document.getElementById('materialSelector');
// Block Text Flip check boxes
const blockFlip = document.querySelectorAll('#blockCheck');
// Text input area for size of blocks
let textArea = document.getElementById('blocks');
// product remover
let removeBtn = document.querySelectorAll('.remove_item');
let nofitNum;
const requiredAmount = document.getElementById('requiredAmount');
const costIfMultiplied = document.getElementById('costIfMultiplied');
const ratioText = document.getElementById('ratio');
const radioBtns = document.querySelectorAll('.p-l__radio-btns');
const radioLabels = document.querySelectorAll('#radioBtnLabels');
const radioBtnSpan = document.getElementById('radioBtnSpan');
let allAmounts = document.querySelectorAll('#productTotal');
let allInvoices = document.querySelectorAll('#invoiceItems');
let allLabor = document.querySelectorAll('.labor__total');
let laborTotal = 0;
let prodTotal = 0;
let totalTotal = 0;
const hoursArr = [
	applicationHours,
	cutPrintHours,
	weedingLaminatingHours,
	installationHours,
	designHours,
];
const unitArr = [
	applicationUnit,
	cutPrintUnit,
	weedingLaminatingUnit,
	installationUnit,
	designUnit,
];
const totalArr = [
	applicationTotal,
	cutPrintTotal,
	weedingLaminatingTotal,
	installationTotal,
	designTotal,
];
hoursArr.forEach((input) => {
	input.addEventListener('keyup', (e) => {
		const idHours = e.currentTarget.id;
		const idTotal = e.currentTarget.id.replace('Hours', 'Total');
		const idUnit = e.currentTarget.id.replace('Hours', 'Unit');
		laborCalc(idHours, idUnit, idTotal);
	});
});
unitArr.forEach((input) => {
	input.addEventListener('keyup', (e) => {
		const idUnit = e.currentTarget.id;
		const idTotal = e.currentTarget.id.replace('Unit', 'Total');
		const idHours = e.currentTarget.id.replace('Unit', 'Hours');
		laborCalc(idHours, idUnit, idTotal);
	});
});
function laborCalc(hours, unit, total) {
	let t = 0;
	const hour = document.getElementById(hours);
	let unitP = document.getElementById(unit);
	let totalP = document.getElementById(total);
	let totalCalc = Number(unitP.value) * Number(hour.value);
	totalP.innerHTML = `$${totalCalc}`;

	allLabor.forEach((total) => {
		const x = total.innerHTML.replace('$', '');
		t += Number(x);
		laborTotal = t;
	});
	finalTotal();
}

///////////////////// EVENT HANDLER ARRAY /////////////////////
const eventArray = [
	radioBtns[0],
	radioBtns[1],
	materialList,
	sizeOptionList,
	presets,
	sortList,
	refreshBtn,
	multiplier,
	textArea,
];
const changeType = ['change', 'keyup'];

//////////// LET VARIABLES FOR PRICES AND SIZES ////////////
let currSizeX = 0;
let currSizeY = 0;
let currPrice = 0;
let currPriceMulti = multiplier.value;
let currMulti = 1;
let currTextAreaContent;
let currMaterial;
let currSort;
let currPreset;
let currPercent;
let radioBtnValue = 'length';
let currPercentCost = 0;

/////////////////////// GLOBAL VALUE UPDATER ///////////////////////
////////////////////////////////////////////////////////////////////
const globalValueCalc = function () {
	// CURR MATERIAL
	currMaterial = materialList.value;

	// CURR PRESET
	currPreset = presets.value;

	// SIZE XY
	if (!sizeOptionList.value == 'automatic') {
		const [currWidth, t] = sizeOptionList.value.split('x');
		const [currHeight, none, prices] = t.split(' ');

		currSizeX = currWidth;
		currSizeY = currHeight;
		currPrice = prices.replace('$', '').toFixed(2);
	}

	// CURR MULTI
	currMulti = multiplier.value;

	// TEXTAREA BLOCKS
	currTextAreaContent = textArea.value;

	// CURR SORTING
	currSort = sortList.value;

	// CURR PERCENT
	currPercent = ratioText.innerHTML;

	// COST IF MULTIPLIED
	if (radioBtns[0].checked) {
		let priceDivided = (currPercent / 100) * currPrice;
		currPercentCost = priceDivided;
		costIfMultiplied.innerHTML = `$${currPercentCost.toFixed(2)}`;
	} else if (radioBtns[1].checked) {
		currPriceMulti = currPrice * currMulti;
		costIfMultiplied.innerHTML = `$${currPriceMulti.toFixed(2)}`;
	}

	// RADIO BTN
	if (radioBtns[0].checked) {
		radioBtnSpan.style.left = '0';
		radioBtnSpan.style.right = '';
		radioBtnValue = 'percent';
	} else if (radioBtns[1].checked) {
		radioBtnSpan.style.left = '';
		radioBtnSpan.style.right = '0';
		radioBtnValue = 'length';
	}
};
globalValueCalc();
eventArray.forEach((ev) => {
	changeType.forEach((typeChange) => {
		ev.addEventListener(typeChange, () => {
			globalValueCalc();
		});
	});
});
////////////////////////////////////////////////////////////////////
/////////////////////// GLOBAL VALUE UPDATER ///////////////////////

///////// REQUIRED AMOUNT CALCULATOR /////////
const calcMultiplier = function () {
	let textLines = textArea.value.split('\n');
	let newLine = textLines[0].split('x').at(-1);
	let temp = newLine - nofitNum;
	let output = newLine / temp;
	requiredAmount.innerHTML = output.toFixed(2);
};
refreshBtn.addEventListener('click', (e) => {
	e.currentTarget.classList.add('rotate');
	e.currentTarget.addEventListener('animationend', (e) => {
		e.currentTarget.classList.remove('rotate');
	});
	currPercent = ratioText.innerHTML;
	// if (radioBtns[0].checked) {
	// 	let priceDivided = (currPercent / 100) * currPrice;
	// 	currPercentCost = priceDivided;
	// 	costIfMultiplied.innerHTML = `$${currPercentCost}`;
	// } else if (radioBtns[1].checked) {
	// 	currPrice = currPrice;
	// 	costIfMultiplied.innerHTML = `$${currPrice}`;
	// }
	if (radioBtns[0].checked) {
		let priceDivided = (currPercent / 100) * currPrice;
		currPercentCost = priceDivided;
		costIfMultiplied.innerHTML = `$${currPercentCost.toFixed(2)}`;
	} else if (radioBtns[1].checked) {
		currPriceMulti = currPrice * currMulti;
		costIfMultiplied.innerHTML = `$${currPriceMulti.toFixed(2)}`;
	}
});
///////// REQUIRED AMOUNT CALCULATOR /////////

///////// MATERIAL OBJECT /////////
// PRODUCTLIST
let productList = {};
let productIterator = 0;
let materialObj = {
	////////// CUT VINYL //////////
	vinylBlack: {
		blocks: '',
		cost: 10,
		sizes: {
			option1: '48x100 | $25',
		},
		sizesAct: 'automatic',
		sort: 'area',
		active: false,
	},
	vinylWhite: {
		blocks: '',
		cost: 10,
		sizes: {
			option1: '55x100 | $25',
		},
		sizesAct: 'automatic',
		sort: 'area',
		active: false,
	},
	vinylBlue: {
		blocks: '',
		cost: 10,
		sizes: {
			option1: '55x100 | $25',
		},
		sizesAct: 'automatic',
		sort: 'area',
		active: false,
	},
	vinylRed: {
		blocks: '',
		cost: 10,
		sizes: {
			option1: '55x100 | $25',
		},
		sizesAct: 'automatic',
		sort: 'area',
		active: false,
	},
	vinylYellow: {
		blocks: '',
		cost: 10,
		sizes: {
			option1: '55x100 | $25',
		},
		sizesAct: 'automatic',
		sort: 'area',
		active: false,
	},
	vinylPink: {
		blocks: '',
		cost: 10,
		sizes: {
			option1: '55x100 | $25',
		},
		sizesAct: 'automatic',
		sort: 'area',
		active: false,
	},
	vinylGreen: {
		blocks: '',
		cost: 10,
		sizes: {
			option1: '55x100 | $25',
		},
		sizesAct: 'automatic',
		sort: 'area',
		active: false,
	},
	vinylSilver: {
		blocks: '',
		cost: 20,
		sizes: {
			option1: '55x100 | $25',
		},
		sizesAct: 'automatic',
		sort: 'area',
		active: false,
	},
	vinylReflective: {
		blocks: '',
		cost: 20,
		sizes: {
			option1: '55x100 | $50',
		},
		sizesAct: 'automatic',
		sort: 'area',
		active: false,
	},
	////////// CUT VINYL //////////

	////////// PROBOND //////////
	probondBlack: {
		blocks: '',
		cost: '',
		sizes: {
			option1: '244x122 | $223.70',
			option2: '366x122 | $336.80',
			option3: '305x150 | $382.20',
			option4: '400x150 | $524.40',
		},
		sizesAct: 'automatic',
		sort: 'area',
		active: false,
	},
	probondWhite: {
		blocks: '',
		cost: '',
		sizes: {
			option1: '244x122 | $219.30',
			option2: '366x122 | $298.50',
			option3: '305x150 | $373',
			option4: '400x150 | $508.70',
		},
		sizesAct: 'automatic',
		sort: 'area',
		active: false,
	},
	probondBlue: {
		blocks: '',
		cost: '',
		sizes: {
			option1: '244x122 | $223.70',
			option2: '366x122 | $336.80',
		},
		sizesAct: 'automatic',
		sort: 'area',
		active: false,
	},
	probondRed: {
		blocks: '',
		cost: '',
		sizes: {
			option1: '244x122 | $223.70',
			option2: '366x122 | $336.80',
			option3: '305x150 | $382.20',
			option4: '400x150 | $524.40',
		},
		sizesAct: 'automatic',
		sort: 'area',
		active: false,
	},
	probondYellow: {
		blocks: '',
		cost: '',
		sizes: {
			option1: '244x122 | $223.70',
			option2: '366x122 | $336.80',
			option3: '305x150 | $382.20',
			option4: '400x150 | $524.40',
		},
		sizesAct: 'automatic',
		sort: 'area',
		active: false,
	},
	probondGrey: {
		blocks: '',
		cost: '',
		sizes: {
			option1: '244x122 | $223.70',
			option2: '366x122 | $336.80',
			option3: '305x150 | $382.20',
			option4: '400x150 | $524.40',
		},
		sizesAct: 'automatic',
		sort: 'area',
		active: false,
	},
	probondGreen: {
		blocks: '',
		cost: '',
		sizes: {
			option1: '244x122 | $223.70',
			option2: '366x122 | $336.80',
		},
		sizesAct: 'automatic',
		sort: 'area',
		active: false,
	},
	probondSilver: {
		blocks: '',
		cost: '',
		sizes: {
			option1: '244x122 | $241.90',
			option2: '244x150 | $329.90',
			option3: '305x150 | $411.40',
			option4: '366x150 | $495',
			option5: '300x200 | $659.90',
			option6: '400x200 | $856.60',
		},
		sizesAct: 'automatic',
		sort: 'area',
		active: false,
	},
	////////// PROBOND //////////

	////////// PRINT VINYL //////////
	printRemoveable: {
		blocks: '',
		cost: '',
		sizes: {
			option1: '122x100 | $25',
		},
		sizesAct: 'automatic',
		sort: 'area',
		active: false,
	},
	printEgr: {
		blocks: '',
		cost: '',
		sizes: {
			option1: '122x100 | $25',
		},
		sizesAct: 'automatic',
		sort: 'area',
		active: false,
	},
	printPerm: {
		blocks: '',
		cost: '',
		sizes: {
			option1: '122x100 | $20',
		},
		sizesAct: 'automatic',
		sort: 'area',
		active: false,
	},
	uvLaminate: {
		blocks: '',
		cost: '',
		sizes: {
			option1: '122x100 | $25',
		},
		sizesAct: 'automatic',
		sort: 'area',
		active: false,
	},
	standardLaminate: {
		blocks: '',
		cost: '',
		sizes: {
			option1: '122x100 | $20',
		},
		sizesAct: 'automatic',
		sort: 'area',
		active: false,
	},
	////////// PRINT VINYL //////////

	////////// CORFLUTE //////////
	corfluteStandard: {
		blocks: '',
		cost: 30,
		sizes: {
			option1: '244x122 | $26.50',
		},
		sizesAct: 'automatic',
		sort: 'area',
		active: false,
	},
	corfluteThick: {
		blocks: '',
		cost: '',
		sizes: {
			option1: '60x90 | $8.90',
			option2: '183x122 | $28.70',
			option3: '244x122 | $35.30',
			option4: '366x122 | $72.80',
		},
		sizesAct: 'automatic',
		sort: 'area',
		active: false,
	},
	corfluteYellow: {
		blocks: '',
		cost: '',
		sizes: {
			option1: '244x122 | $53.80',
		},
		sizesAct: 'automatic',
		sort: 'area',
		active: false,
	},
	corfluteBlack: {
		blocks: '',
		cost: '',
		sizes: {
			option1: '244x122 | $49',
		},
		sizesAct: 'automatic',
		sort: 'area',
		active: false,
	},
	/////////// A FRAMES ///////////
	aFrameMetal: {
		blocks: '',
		cost: '',
		sizes: {
			option1: '60x45 | $135.20',
			option2: '60x60 | $141.40',
			option3: '60x90 | $166.80',
			option4: '90x120 | $329.40',
			option5: '120x180 | $772.40',
		},
		sizesAct: 'automatic',
		sort: 'area',
		active: false,
	},
	aFrameInsert: {
		blocks: '',
		cost: '',
		sizes: {
			option1: '60x60 | $120.60',
			option2: '60x90 | $143.80',
			option3: '90x120 | $219.20',
		},
		sizesAct: 'automatic',
		sort: 'area',
		active: false,
	},
	aFrameRealestate: {
		blocks: '',
		cost: '',
		sizes: {
			option1: '60x48 | $120.60',
		},
		sizesAct: 'automatic',
		sort: 'area',
		active: false,
	},
};
///////// MATERIAL OBJECT /////////

const inputsArr = [sortList, sizeOptionList, materialList, textArea];
///////// MATERIAL CHANGER VARIABLES /////////

///////// SECTION ON OFF SWITCH /////////
document.getElementById('on-off-sw--1').addEventListener('change', (e) => {
	if (e.currentTarget.checked) {
		document
			.getElementById('inputContainer')
			.classList.remove('hide__container');

		materialSection.classList.remove('hide__material');
	} else {
		document.getElementById('inputContainer').classList.add('hide__container');

		materialSection.classList.add('hide__material');
	}
});
///////// SECTION ON OFF SWITCH /////////
///////// SAVING GLOBAL VARIABLES /////////
sortList.addEventListener('change', (e) => {
	currSort = e.currentTarget.value;
});
presets.addEventListener('change', (e) => {
	currPreset = e.currentTarget.value;
});

///////// SAVING GLOBAL VARIABLES /////////

///////// FLIP CONTROLS /////////
let textUndefined = textArea.value.split('\n');
let lineSplitText;
let arrayLeftOver;
blockFlip.forEach((btn, i) => {
	btn.addEventListener('click', (e) => {
		if (e.currentTarget.checked) {
			///////// CLICK ON //////////
			let lineSplitText = textArea.value.split('\n');

			let [first, second, n, ...f] =
				lineSplitText[i] == null ? '' : lineSplitText[i].split('x');

			let curr = first == undefined ? '' : first;
			let next = second == undefined ? '' : second;
			let end = n == undefined ? '' : 'x' + n;
			let textReverseStr = `${next == '' ? '' : next + 'x'}${curr}${
				end === undefined ? '' : end
			}`;

			lineSplitText[i] = textReverseStr;
			let reconstruct = '';
			for (let i = 0; i < lineSplitText.length; i++) {
				reconstruct +=
					[i] == lineSplitText.length - 1
						? `${lineSplitText[i]}`
						: `${lineSplitText[i]}\n`;
			}
			textArea.value = reconstruct;
		} else if (!e.currentTarget.checked) {
			///////// CLICK OFF //////////
			let lineSplitText = textArea.value.split('\n');

			let [first, second, n, ...f] =
				lineSplitText[i] == null ? '' : lineSplitText[i].split('x');

			let curr = first == undefined ? '' : first;
			let next = second == undefined ? '' : second;
			let end = n == undefined ? '' : 'x' + n;
			let textReverseStr = `${next == '' ? '' : next + 'x'}${curr}${
				end === undefined ? '' : end
			}`;

			lineSplitText[i] = textReverseStr;
			let reconstruct = '';
			for (let i = 0; i < lineSplitText.length; i++) {
				reconstruct +=
					[i] == lineSplitText.length - 1
						? `${lineSplitText[i]}`
						: `${lineSplitText[i]}\n`;
			}
			textArea.value = reconstruct;
		}
	});
});
textArea.addEventListener('keyup', () => {
	textAreaTyping();
});
const textAreaTyping = function () {
	textArea.value.split('\n').forEach((textNode, i) => {
		if (textArea.value.split('\n').length === 1) {
			for (let i = 1; i < blockFlip.length; i++) {
				blockFlip[i].classList.add('hide__flip');
			}
		} else if (blockFlip.length >= textArea.value.split('\n').length) {
			for (let x = 0; x < textArea.value.split('\n').length; x++) {
				blockFlip[x].classList.remove('hide__flip');
			}
			arrayLeftOver = textArea.value.split('\n').length;
			for (let t = arrayLeftOver; t < blockFlip.length; t++) {
				blockFlip[t].classList.add('hide__flip');
			}
		} else if (blockFlip.length <= textArea.value.split('\n').length) {
			return;
		}
	});
};
textAreaTyping();
///////// FLIP CONTROLS /////////

///////// MATERIAL CHANGER FUNCTIONALITY /////////
// ADDING SIZE OPTIONS
let sel = document.getElementById('size');
const addRemoveMaterialSizes = function (e) {
	let data = materialObj[`${e.currentTarget.value}`].sizes;
	removeAllChildNodes(sel);
	appendOptions();

	function removeAllChildNodes(parent) {
		while (parent.firstChild) {
			parent.removeChild(parent.firstChild);
		}
	}

	function appendOptions() {
		for (const key in data) {
			let opt = document.createElement('option');
			opt.innerHTML = data[key];
			opt.value = data[key];
			sel.appendChild(opt);
		}
		let optOne = document.createElement('option');
		optOne.innerHTML = 'automatic';
		optOne.value = 'automatic';
		sel.insertBefore(optOne, sel.children[0]);
	}
};

const changeSortActive = function () {
	sortList.value = materialObj[`${materialList.value}`].sort;
};
const changeSizeActive = function () {
	sel.value = materialObj[`${materialList.value}`].sizesAct;
};
const changeMaterialActive = function () {
	materialSwitch.checked = materialObj[`${materialList.value}`].active;
};
const changeBlockSize = function () {
	textArea.value = materialObj[`${materialList.value}`].blocks;
};

materialList.addEventListener('change', function (e) {
	addRemoveMaterialSizes(e);
	changeSortActive();
	changeSizeActive();
	// changeMaterialActive();
	changeBlockSize();
	currMaterial = e.currentTarget.value;
});

///////// MATERIAL CHANGER FUNCTIONALITY /////////

///////// RETURN EVENT INPUT VALUE /////////

textArea.addEventListener('keyup', (e) => {
	materialObj[`${materialList.value}`].blocks = e.currentTarget.value;
	currTextAreaContent = e.currentTarget.value;
});
blockFlip.forEach((btn) => {
	btn.addEventListener('click', (e) => {
		materialObj[`${materialList.value}`].blocks = textArea.value;
		currTextAreaContent = textArea.value;
		e.currentTarget.classList.add('animFlip');
		textArea.classList.add('backgroundFlash');
		e.currentTarget.addEventListener('animationend', (e) => {
			e.currentTarget.classList.remove('animFlip');
			textArea.classList.remove('backgroundFlash');
		});
	});
});

///////// CHANGE CANVAS SIZE /////////
let materialGrp = '';
materialList.addEventListener('change', (e) => {
	const material =
		e.currentTarget.options[e.currentTarget.selectedIndex].parentElement.label;
	materialGrp = material;

	if (materialGrp === 'CUT VINYL') {
		packingContainer.style.gridColumn = '1 / span 1';
		packingContainer.style.gridRow = '1 /  -1';
		settingsContainer.style.gridColumn = '2 / span 1';
		settingsContainer.style.gridRow = '1 /  -1';
	} else if (
		materialGrp === 'PROBOND' ||
		materialGrp === 'PRINT VINYL' ||
		materialGrp === 'CORFLUTE'
	) {
		packingContainer.style.gridColumn = '';
		packingContainer.style.gridRow = '';
		settingsContainer.style.gridColumn = '';
		settingsContainer.style.gridRow = '';
	}
});

sizeOptionList.addEventListener('change', (e) => {
	if (!e.currentTarget.value === 'automatic') {
		const [currWidth, t] = e.currentTarget.value.split('x');
		const [currHeight, none, price] = t.split(' ');
		if (materialGrp === 'CUT VINYL') {
			packingContainer.style.gridColumn = '1 / span 1';
			packingContainer.style.gridRow = '1 /  -1';
			settingsContainer.style.gridColumn = '2 / span 1';
			settingsContainer.style.gridRow = '1 /  -1';
			if (currHeight >= 500) {
				canvas.style.zoom = '0.6';
			} else if (currHeight >= 400) {
				canvas.style.zoom = '1';
			}
		} else if (materialGrp === 'PROBOND') {
			packingContainer.style.gridColumn = '';
			packingContainer.style.gridRow = '';
			settingsContainer.style.gridColumn = '';
			settingsContainer.style.gridRow = '';
			canvas.style.zoom = '0.8';
		} else if (materialGrp === 'PRINT VINYL') {
		} else if (materialGrp === 'CORFLUTE') {
			packingContainer.style.gridColumn = '';
			packingContainer.style.gridRow = '';
			settingsContainer.style.gridColumn = '';
			settingsContainer.style.gridRow = '';
			canvas.style.zoom = '1.3';
		}
	}
});
sizeOptionList.addEventListener('change', (e) => {
	const [currWidth, t] = e.currentTarget.value.split('x');
	const [currHeight, none, prices] = t.split(' ');

	currSizeX = currWidth;
	currSizeY = currHeight;
	currPrice = prices.replace('$', '');
});
//////////////// PRODUCT LIST REMOVAL ////////////////

const productListRemove = function (e) {
	const productId = document.getElementById(`product--${e.value}`);
	const confirmDelete = confirm('Delete Product?');
	if (confirmDelete) {
		productId.classList.add('backgroundFlash--1');
		setTimeout(() => {
			productId.remove();
			delete productList[e.value];
			allAmounts = document.querySelectorAll('#productTotal');
			tallyTotal(allAmounts);
		}, '500');
	} else {
		productId.classList.add('backgroundFlash--2');
		productId.addEventListener('animationend', () => {
			productId.classList.remove('backgroundFlash--2');
		});
	}
};

//////////////// APPEND TO INVOICE ////////////////

const appendInvoice = function (e) {
	let invoiceMatContainer = document.createElement('div');
	invoiceMatContainer.className = `invoice__material--product`;
	invoiceMatContainer.id = `product--${currMaterial}${productIterator}`;

	invoiceMaterials.appendChild(invoiceMatContainer);
	if (radioBtns[0].checked) {
		let btn = document.createElement('button');
		btn.className = 'remove_item';
		btn.innerHTML = 'X';
		btn.setAttribute('onclick', 'productListRemove(this)');
		btn.value = `${e.name}`;
		let invoiceName = document.createElement('span');
		invoiceName.className = '--1';
		invoiceName.innerHTML = `${e.name}`;
		invoiceName.value = `${e.name}`;
		invoiceName.id = 'invoiceItems';
		let qty = document.createElement('span');
		qty.className = '--2';
		qty.innerHTML = `${e.percent}%`;
		qty.value = `${e.percent}`;
		let unitP = document.createElement('span');
		unitP.className = '--3';
		unitP.innerHTML = `$${e.unitPrice}`;
		unitP.value = `${e.unitPrice}`;
		let totalAmt = document.createElement('span');
		totalAmt.className = '--4';
		totalAmt.id = 'productTotal';
		totalAmt.innerHTML = `$${e.pricePercent.toFixed(2)}`;
		totalAmt.value = `${e.pricePercent.toFixed(2)}`;

		invoiceMatContainer.appendChild(btn);
		invoiceMatContainer.appendChild(invoiceName);
		invoiceMatContainer.appendChild(qty);
		invoiceMatContainer.appendChild(unitP);
		invoiceMatContainer.appendChild(totalAmt);
	} else if (radioBtns[1].checked) {
		let btn = document.createElement('button');
		btn.className = 'remove_item';
		btn.innerHTML = 'X';
		btn.setAttribute('onclick', 'productListRemove(this)');
		btn.value = `${e.name}`;
		let invoiceName = document.createElement('span');
		invoiceName.className = '--1';
		invoiceName.innerHTML = `${e.name}`;
		invoiceName.value = `${e.name}`;
		invoiceName.id = 'invoiceItems';
		let qty = document.createElement('span');
		qty.className = '--2';
		qty.innerHTML = `x${e.multi}`;
		qty.value = `${e.multi}`;
		let unitP = document.createElement('span');
		unitP.className = '--3';
		unitP.innerHTML = `$${e.unitPrice}`;
		unitP.value = `${e.unitPrice}`;
		let totalAmt = document.createElement('span');
		totalAmt.className = '--4';
		totalAmt.id = 'productTotal';
		totalAmt.innerHTML = `$${e.unitPrice * e.multi}`;
		totalAmt.value = `${e.priceMulti.toFixed(2)}`;

		invoiceMatContainer.appendChild(btn);
		invoiceMatContainer.appendChild(invoiceName);
		invoiceMatContainer.appendChild(qty);
		invoiceMatContainer.appendChild(unitP);
		invoiceMatContainer.appendChild(totalAmt);
	}
	allAmounts = document.querySelectorAll('#productTotal');
	allInvoices = document.querySelectorAll('#invoiceItems');
	addInvoiceSpan(allInvoices);
	tallyTotal(allAmounts);
};
function tallyTotal(product, labor) {
	let totalAdd = 0;
	product.forEach((cost) => {
		totalAdd += Number(cost.innerHTML.replace('$', ''));
		const totalQuote = document.getElementById('totalQuote');
	});
	prodTotal = totalAdd;
	finalTotal();
}

function finalTotal() {
	totalTotal = laborTotal + prodTotal;

	totalQuote.innerHTML = `$${totalTotal.toFixed(2)}`;
}
//////////////// PRODUCT LIST ADD ////////////////

addMaterialBtn.addEventListener('click', () => {
	let productName = `${currMaterial}${productIterator}`;
	if (productList.hasOwnProperty(productName)) {
		productIterator++;
		productName = `${currMaterial}${productIterator}`;
		let productContent = {
			name: `${productName}`,
			sizeX: currSizeX,
			sizeY: currSizeY,
			size: `${currSizeX}x${currSizeY}`,
			sizeOption: sizeOptionList.value,
			unitPrice: currPrice,
			priceMulti: currPriceMulti,
			multi: currMulti,
			material: currMaterial,
			blocks: currTextAreaContent,
			preset: currPreset,
			radioBtn: radioBtnValue,
			sorting: currSort,
			percent: currPercent,
			pricePercent: currPercentCost,
		};
		productList[productName] = productContent;
		appendInvoice(productList[productName]);
	} else {
		productIterator = 0;
		productName = `${currMaterial}${productIterator}`;
		let productContent = {
			name: `${productName}`,
			sizeX: currSizeX,
			sizeY: currSizeY,
			size: `${currSizeX}x${currSizeY}`,
			sizeOption: sizeOptionList.value,
			unitPrice: currPrice,
			priceMulti: currPriceMulti,
			multi: currMulti,
			material: currMaterial,
			blocks: currTextAreaContent,
			preset: currPreset,
			radioBtn: radioBtnValue,
			sorting: currSort,
			percent: currPercent,
			pricePercent: currPercentCost,
		};
		productList[productName] = productContent;
		appendInvoice(productList[productName]);
	}
});

//////////////// PRODUCT SELCT EDIT ////////////////
function addInvoiceSpan(span) {
	span.forEach((invoice) => {
		invoice.addEventListener('click', (e) => {
			textArea.value = productList[e.currentTarget.innerHTML].blocks;
			multiplier.value = productList[e.currentTarget.innerHTML].multi;
			materialList.value = productList[e.currentTarget.innerHTML].material;
			presets.value = productList[e.currentTarget.innerHTML].preset;
			sortList.value = productList[e.currentTarget.innerHTML].sorting;
			sizeOptionList.value = productList[e.currentTarget.innerHTML].sizeOption;
			e.currentTarget.classList.add('backgroundFlash--2');
			e.currentTarget.addEventListener('animationend', (e) => {
				e.currentTarget.classList.remove('backgroundFlash--2');
			});
		});
	});
}

//////////////// PRODUCT SELCT EDIT ////////////////

//////////////// CANVASS SIZE CALCULATOR ////////////////
let canvasSize = function (x, y, z) {
	if (x === 'automatic') {
		canvasSizeOutput.innerHTML = x;
		canvasSizeOutput.value = x;
	} else {
		let canvasDimensions = `${x}x${y * z}`;

		canvasSizeOutput.innerHTML = canvasDimensions;
		canvasSizeOutput.value = canvasDimensions;
	}
};
multiplier.addEventListener('change', (e) => {
	currMulti = e.currentTarget.value;
	if (sizeOptionList.value === 'automatic') {
		canvasSize('automatic');
	} else {
		const [Width, t] = sizeOptionList.value.split('x');
		const [Height] = t.split(' ');
		const multiplier = e.currentTarget.value;
		canvasSize(Width, Height, multiplier);
	}
});
materialList.addEventListener('change', (e) => {
	if (sizeOptionList.value === 'automatic') {
		canvasSize('automatic');
	} else {
		const [Width, t] = sizeOptionList.value.split('x');
		const [Height] = t.split(' ');
		canvasSize(Width, Height, multiplier.value);
	}
});
sizeOptionList.addEventListener('change', (e) => {
	if (sizeOptionList.value === 'automatic') {
		canvasSize('automatic');
	} else {
		const [Width, t] = sizeOptionList.value.split('x');
		const [Height] = t.split(' ');
		canvasSize(Width, Height, multiplier.value);
	}
});
canvasSize('automatic');

radioBtns.forEach((btn) => {
	btn.addEventListener('click', (e) => {
		if (radioBtns[0].checked) {
			radioBtnSpan.style.left = '0';
			radioBtnSpan.style.right = '';
			radioBtnValue = 'percent';
		} else if (radioBtns[1].checked) {
			radioBtnSpan.style.left = '';
			radioBtnSpan.style.right = '0';
			radioBtnValue = 'length';
		}
	});
});
