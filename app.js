//  Pseudocode //
//1) Define the required variables used to track the state of the game.

//2) Store cached element references.

//3) Upon loading, the game state should be initialized, and a function should
//   be called to render this game state.

//4) The state of the game should be rendered to the user.

//5) Define the required constants.

//6) Handle a player clicking a square with a `handleClick` function.

//7) Create Reset functionality.

/*---------------------------- Variables (state) ----------------------------*/

let board;
let turn;
let winner;
let tie;

// /*------------------------ Cached Element References ------------------------*/

const squareEls = document.querySelectorAll('.square');
const messageEl = document.getElementById('message');
const resetBtnEl = document.getElementById('resetBtn');

// /*-------------------------------- Functions --------------------------------*/
function init() {
	// console.log('Game initialized');
	board = ['', '', '', '', '', '', '', '', '', ''];
	turn = 'X';
	winner = false;
	tie = false;
	render();
}

window.onload = init;

function render() {
	updateBoard();
	updateMessage();
}

function updateBoard() {
	board.forEach((square, ind) => {
		if (squareEls[ind]) {
			squareEls[ind].textContent = square;
		}
	});
}
// /*-------------------------------- Constants --------------------------------*/

const winningCombos = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

function updateMessage() {
	// 	// let messageEl;

	if (winner === false && tie === false) {
		messageEl.textContent = 'Keep playing!';
	} else if (winner === false && tie === true) {
		messageEl.textContent = "It's a tie!";
	} else {
		messageEl.textContent = `Congratulation, ${winner} win!`;
	}
	return messageEl;
}

/*----------------------------- functions -----------------------------*/

function handleClick(e) {
	const squareInd = Array.from(squareEls).indexOf(e.target);
	if (board[squareInd] || winner) return;

	placePiece(squareInd);
	checkForWinner();
	checkForTie();
	switchPlayerTurn();
	render();
}
function placePiece(ind) {
	board[ind] = turn;
}

function checkForWinner() {
	for (const combo of winningCombos) {
		const [a, b, c] = combo;
		if (board[a] && board[a] === board[b] && board[b] === board[c]) {
			winner = board[a];
			return;
		}
	}
}

function checkForTie() {
	if (winner) return;
	tie = board.every((square) => square !== '');
}

function switchPlayerTurn() {
	if (!winner) {
		turn = turn === 'X' ? 'O' : 'X';
	}
}

//==================================//
/*----------------------------- Event Listeners -----------------------------*/

resetBtnEl.addEventListener('click', init);

squareEls.forEach((square) => {
	square.addEventListener('click', handleClick);
});
init();
