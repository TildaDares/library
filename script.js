const bookDiv = document.querySelector(".book");
let library = JSON.parse(localStorage.getItem("myLibrary") || "[]");
const form = document.getElementsByTagName("form")[0];
form.addEventListener("submit", addBookToLibrary);

class Book {
	constructor(title, author, numOfPages, isRead) {
		this.title = title;
		this.author = author;
		this.numOfPages = numOfPages;
		this.isRead = isRead;
	}
}

function createChildDiv() {
	let childDiv = document.createElement("div");
	childDiv.className = "books-child border-success card p-3 w-100 m-3";
	bookDiv.appendChild(childDiv);
	return childDiv;
}

function renderBook(bookObj) {
	let childDiv = createChildDiv();
	let readBtn = document.createElement("button");
	let delBtnDiv = document.createElement("div");
	let readBtnDiv = document.createElement("div");
	readBtn.className = "btn read";
	delBtnDiv.className = "float-right mt-2";
	readBtnDiv.className = "float-left mt-2";
	let deleteBtn = document.createElement("button");
	deleteBtn.className = "btn btn-danger remove float-right";
	deleteBtn.textContent = "Remove";
	childDiv.id = library.indexOf(bookObj);
	for (let key in bookObj) {
		if (key === "isRead") {
			hasRead(bookObj[key], readBtn);
			continue;
		}

		let par = document.createElement("p");
		let span = document.createElement("span");
		par.textContent = `${titleCase(key)}: `;
		span.textContent = bookObj[key];
		childDiv.appendChild(par);
		par.appendChild(span);
	}

	delBtnDiv.appendChild(deleteBtn);
	readBtnDiv.appendChild(readBtn);
	childDiv.appendChild(readBtnDiv);
	childDiv.appendChild(delBtnDiv);
	deleteBtn.addEventListener("click", deleteBtnFunc(bookObj));
	readBtn.addEventListener("click", readBtnFunc(bookObj));
}

function displayAllBooks() {
	for (let i = 0; i < library.length; i++) {
		renderBook(library[i]);
	}
}

let readBtnFunc = function (bookObj) {
	return function (e) {
		if (bookObj["isRead"]) {
			e.target.textContent = "not read";
			e.target.classList.add("btn-outline-danger");
			e.target.classList.remove("btn-outline-success");
			bookObj["isRead"] = false;
		} else {
			e.target.textContent = "read";
			e.target.classList.add("btn-outline-success");
			e.target.classList.remove("btn-outline-danger");
			bookObj["isRead"] = true;
		}

		localStorage.setItem("myLibrary", JSON.stringify(library));
	};
};

function hasRead(bool, readBtn) {
	if (bool) {
		readBtn.classList.add("btn-outline-success");
		readBtn.textContent = "read";
	} else {
		readBtn.classList.add("btn-outline-danger");
		readBtn.textContent = "not read";
	}
}

let deleteBtnFunc = function (bookObj) {
	return function (e) {
		if (!confirm("Are you sure you want to delete this book?")) {
			return;
		}

		library.splice(library.indexOf(bookObj), 1);
		localStorage.setItem("myLibrary", JSON.stringify(library));
		location.reload();
	};
};

function addBookToLibrary(e) {
	let title = document.querySelector("#title").value;
	let author = document.querySelector("#author").value;
	let pages = document.querySelector("#numOfPages").value;
	let isChecked = document.querySelector(".modal-checkbox").checked;
	book = new Book(title, author, pages, isChecked);
	library.push(book);
	localStorage.setItem("myLibrary", JSON.stringify(library));
	renderBook(book);
}

function titleCase(bookLibKey) {
	switch (bookLibKey) {
		case "title":
			return "Title";
			break;
		case "author":
			return "Author";
			break;
		case "numOfPages":
			return "Number of Pages";
			break;
	}
}
displayBooks();
