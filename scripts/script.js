function createPlayer(user, symbol) {
	let name = user;
	let marker = symbol;

	return { name, marker };
}

const gameField = (function () {
	//private
	let board = [
		["", "", ""],
		["", "", ""],
		["", "", ""],
	];

	//public
	return {
		displayBoard() {
			board.forEach((row) => console.log(row.join(" | ")));
		},
		placeMarker(boxId, marker) {
			switch (boxId) {
				case "id-0":
					if (board[0][0] === "") {
						board[0][0] = marker;
						console.log("Marker set in Box 0");
						return true;
					} else {
						console.log("Box 0 allready set!");
						return false;
					}
				case "id-1":
					if (board[0][1] === "") {
						board[0][1] = marker;
						console.log("Marker set in Box 1");
						return true;
					} else {
						console.log("Box 1 allready set!");
						return false;
					}
				case "id-2":
					if (board[0][2] === "") {
						board[0][2] = marker;
						console.log("Marker set in Box 2");
						return true;
					} else {
						console.log("Box 2 allready set!");
						return false;
					}
				case "id-3":
					if (board[1][0] === "") {
						board[1][0] = marker;
						console.log("Marker set in Box 3");
						return true;
					} else {
						console.log("Box 3 allready set!");
						return false;
					}
				case "id-4":
					if (board[1][1] === "") {
						board[1][1] = marker;
						console.log("Marker set in Box 4");
						return true;
					} else {
						console.log("Box 4 allready set!");
						return false;
					}
				case "id-5":
					if (board[1][2] === "") {
						board[1][2] = marker;
						console.log("Marker set in Box 5");
						return true;
					} else {
						console.log("Box 5 allready set!");
						return false;
					}
				case "id-6":
					if (board[2][0] === "") {
						board[2][0] = marker;
						console.log("Marker set in Box 6");
						return true;
					} else {
						console.log("Box 6 allready set!");
						return false;
					}
				case "id-7":
					if (board[2][1] === "") {
						board[2][1] = marker;
						console.log("Marker set in Box 7");
						return true;
					} else {
						console.log("Box 7 allready set!");
						return false;
					}
				case "id-8":
					if (board[2][2] === "") {
						board[2][2] = marker;
						console.log("Marker set in Box 8");
						return true;
					} else {
						console.log("Box 8 allready set!");
						return false;
					}
				default:
					console.log("wrong Box ID!");
					return false;
			}
		},
		getBoardInformation() {
			let showBoard = board;
			console.log("BOARD " + showBoard);
			return showBoard;
		},
		clearBoard() {
			board = [
				["", "", ""],
				["", "", ""],
				["", "", ""],
			];
		},
	};
})();

const gameRule = (function () {
	const rows = 3;
	const columns = 3;

	function checkLineWin(line) {
		return line.every((cell) => cell === line[0] && cell !== "");
	}

	function checkRows(board) {
		for (let i = 0; i < rows; i++) {
			if (checkLineWin(board[i])) {
				return true;
			}
		}
	}

	function checkColums(board) {
		for (let i = 0; i < columns; i++) {
			const column = [board[0][i], board[1][i], board[2][i]];
			if (checkLineWin(column)) {
				return true;
			}
		}
	}
	function checksDiagonal(board) {
		const diagonal1 = [board[0][0], board[1][1], board[2][2]];
		const diagonal2 = [board[0][2], board[1][1], board[2][0]];

		if (checkLineWin(diagonal1)) {
			return true;
		}
		if (checkLineWin(diagonal2)) {
			return true;
		}
	}
	function whichPlayer(marker) {
		if (marker === "X") {
			console.log("WIN PLAYER 1");
		} else {
			console.log("WIN PLAYER 2");
		}
	}
	function checkDraw(board) {
		let field = 0;
		const maxField = 9;
		board.forEach((row) => {
			row.forEach((cell) => {
				if (cell !== "") {
					field++;
				}
			});
		});
		if (field >= maxField) {
			console.log("Game is a Draw!");
			return true;
		}
	}
	return {
		checkBoard(board, marker) {
			if (checkRows(board) || checkColums(board) || checksDiagonal(board)) {
				whichPlayer(marker);
				return true;
			} else {
				return false;
			}
		},
		checkDraw,
	};
})();

const gameUi = (function () {
	const field = document.querySelector("#gameField");
	const inputPlayerOneName = document.querySelector("#inputPlayerOne");
	const inputPlayerTwoName = document.querySelector("#inputPlayerTwo");
	const btnSendPlayer = document.querySelector("#btnSendPlayer");

	const playerTurnTitel = document.querySelector("#playerTurn");

	const playerTitel = document.querySelector("#playerText");

	let playerAreCreated = false;

	function createGameFieldUI() {
		for (let i = 0; i < 9; i++) {
			let createDiv = document.createElement("div");
			createDiv.classList.add("box");
			createDiv.id = `id-${i}`;
			field.append(createDiv);
		}
	}
	function reset() {
		gameField.clearBoard();
		field.innerHTML = "";
		createGameFieldUI();
	}
	function setMarker(boxId, marker) {
		console.log("boxId is: " + boxId);
		const box = document.getElementById(boxId);
		box.innerText = marker;
	}
	function handleClick(event, marker) {
		let click = event.target;
		let boxId = click.id;
		switch (boxId) {
			case "id-0":
			case "id-1":
			case "id-2":
			case "id-3":
			case "id-4":
			case "id-5":
			case "id-6":
			case "id-7":
			case "id-8":
				setMarker(boxId, marker);
				break;
			default:
				console.log("Not a Box!");
		}
	}
	function clickABox(marker) {
		if (!playerAreCreated) {
			console.log("No player was created! Create first a player!");
			return;
		}
		field.addEventListener("click", (event) => handleClick(event, marker));
	}
	function removeClickABox(marker) {
		field.removeEventListener("click", (event) => handleClick(event, marker));
	}
	function togglePlayer() {
		if (playerAreCreated) {
			playerAreCreated = false;
			return false;
		} else {
			playerAreCreated = true;
			return true;
		}
	}

	function handleBtn() {
		console.log("clicked");
		let valuePlayerOneName = inputPlayerOneName.value;
		let valuePlayerTwoName = inputPlayerTwoName.value;

		const playerOne = createPlayer(valuePlayerOneName, "X");
		const playerTwo = createPlayer(valuePlayerTwoName, "O");

		togglePlayer();

		playerTitel.innerText = "";
		playerTitel.innerText = `Player One: ${playerOne.name} with marker: ${playerOne.marker}. Player Two: ${playerTwo.name} with marker: ${playerTwo.marker}.`;

		return { playerOne, playerTwo };
	}

	function createUser() {
		btnSendPlayer.addEventListener("click", () => {
			const players = handleBtn();
			gameFlow.handleGame(players);
		});
	}
	function setUiPlayerTurn(player) {
		playerTurnTitel.innerText = "";
		playerTurnTitel.innerText = `Player: ${player.name} turn!`;
	}
	return {
		createGameFieldUI,
		clickABox,
		removeClickABox,
		createUser,
		togglePlayer,
		setUiPlayerTurn,
		setMarker,
		reset,
	};
})();

const gameFlow = (function () {
	const btnReset = document.querySelector("#btnReset");
	const field = document.querySelector("#gameField");
	let currentPlayer = null;

	function startGame() {
		gameUi.createUser();
	}

	function handleGame(players) {
		gameUi.createGameFieldUI();
		currentPlayer = players.playerOne;
		gameUi.setUiPlayerTurn(currentPlayer);

		field.addEventListener("click", function gameMove(event) {
			const clickedElement = event.target;

			if (clickedElement.classList.contains("box")) {
				const boxId = clickedElement.id;

				if (gameField.placeMarker(boxId, currentPlayer.marker)) {
					gameUi.setMarker(boxId, currentPlayer.marker);
					// Check win condition
					if (
						gameRule.checkBoard(
							gameField.getBoardInformation(),
							currentPlayer.marker
						)
					) {
						winningGame(currentPlayer.name);
						return;
					}

					// Check draw condition
					if (gameRule.checkDraw(gameField.getBoardInformation())) {
						winningGame("draw");
						return;
					}

					// Switch players
					if (currentPlayer === players.playerOne) {
						currentPlayer = players.playerTwo;
					} else {
						currentPlayer = players.playerOne;
					}
					gameUi.setUiPlayerTurn(currentPlayer);
				}
			}
		});
	}
	function reset() {
		console.log("RESET");

		gameField.clearBoard();
		gameUi.reset();

		currentPlayer = null;

		document.querySelector("#inputPlayerOne").value = "Player 1";
		document.querySelector("#inputPlayerTwo").value = "Player 2";

		document.querySelector("#playerText").innerText = "";
		document.querySelector("#playerTurn").innerText = "";

		startGame();
	}

	function restartGame() {
		btnReset.addEventListener("click", reset);
	}

	function winningGame(winner) {
		gameField.clearBoard();
		console.log("winner/draw: " + winner);
		field.innerHTML = "";
		gameUi.createGameFieldUI();
	}

	return {
		startGame,
		handleGame,
		restartGame,
	};
})();

// TEST
gameFlow.startGame();
gameFlow.restartGame();