// Fungsi untuk mendapatkan data buku dari localStorage
function getBooksFromStorage() {
    const books = JSON.parse(localStorage.getItem('books'));
    return books === null ? [] : books;
  }
  
  // Fungsi untuk menyimpan data buku ke localStorage
  function saveBooksToStorage(books) {
    localStorage.setItem('books', JSON.stringify(books));
  }
  
  // Fungsi untuk menambahkan buku baru
  function addBook() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const year = parseInt(document.getElementById('year').value);
    const isComplete = document.getElementById('isComplete').checked;
    const id = +new Date();
    const book = {
      id,
      title,
      author,
      year,
      isComplete,
    };
    const books = getBooksFromStorage();
    books.push(book);
    saveBooksToStorage(books);
    renderBooks();
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('year').value = '';
    document.getElementById('isComplete').checked = false;
  }
  
  // Fungsi untuk memindahkan buku antar rak
  function moveBook(id) {
    const books = getBooksFromStorage();
    const index = books.findIndex(book => book.id === id);
    if (index !== -1) {
      books[index].isComplete = !books[index].isComplete; // Toggle status isComplete
      saveBooksToStorage(books);
      renderBooks();
    }
  }
  
  // Fungsi untuk menghapus buku
  function deleteBook(id) {
    const books = getBooksFromStorage();
    const filteredBooks = books.filter(book => book.id !== id);
    saveBooksToStorage(filteredBooks);
    renderBooks();
  }
  
  // Fungsi untuk mengembalikan buku dari "Selesai dibaca" ke "Belum selesai dibaca"
  function returnBook(id) {
    const books = getBooksFromStorage();
    const index = books.findIndex(book => book.id === id);
    if (index !== -1) {
      books[index].isComplete = false; // Ubah status buku menjadi belum selesai
      saveBooksToStorage(books);
      renderBooks();
    }
  }
  
  // Fungsi untuk menampilkan buku ke dalam rak
  function renderBooks() {
    const unfinishedList = document.getElementById('unfinished-list');
    const finishedList = document.getElementById('finished-list');
    unfinishedList.innerHTML = '';
    finishedList.innerHTML = '';
  
    const books = getBooksFromStorage();
    books.forEach(book => {
      const listItem = document.createElement('li');
      listItem.className = 'book-item';
      listItem.textContent = `${book.title} - ${book.author} (${book.year})`;
      const deleteButton = document.createElement('button');
      deleteButton.className = 'button button-delete';
      deleteButton.textContent = 'Hapus';
      deleteButton.onclick = () => deleteBook(book.id);
      listItem.appendChild(deleteButton);
  
      if (book.isComplete) {
        const returnButton = document.createElement('button');
        returnButton.className = 'button return-button';
        returnButton.textContent = 'Belum selesai dibaca';
        returnButton.onclick = () => returnBook(book.id);
        listItem.appendChild(returnButton);
        finishedList.appendChild(listItem);
      } else {
        const moveButton = document.createElement('button');
        moveButton.className = 'button';
        moveButton.textContent = 'Selesai Dibaca';
        moveButton.onclick = () => moveBook(book.id);
        listItem.appendChild(moveButton);
        unfinishedList.appendChild(listItem);
      }
    });
  }
  
// Fungsi untuk melakukan pencarian buku
function searchBooks() {
  const query = document.getElementById('search').value.toLowerCase();
  const filteredBooks = getBooksFromStorage().filter(book => {
    const { title, author, year } = book;
    return (
      title.toLowerCase().includes(query) ||
      author.toLowerCase().includes(query) ||
      parseInt(year).toString().includes(query)
    );
  });
  const unfinishedList = document.getElementById('unfinished-list');
  const finishedList = document.getElementById('finished-list');
  unfinishedList.innerHTML = '';
  finishedList.innerHTML = '';

  filteredBooks.forEach(book => {
    const listItem = document.createElement('li');
    listItem.className = 'book-item';
    listItem.textContent = `${book.title} - ${book.author} (${book.year})`;
    const deleteButton = document.createElement('button');
    deleteButton.className = 'button button-delete';
    deleteButton.textContent = 'Hapus';
    deleteButton.onclick = () => deleteBook(book.id);
    listItem.appendChild(deleteButton);

    if (book.isComplete) {
      const returnButton = document.createElement('button');
      returnButton.className = 'button return-button';
      returnButton.textContent = 'Belum selesai dibaca';
      returnButton.onclick = () => returnBook(book.id);
      listItem.appendChild(returnButton);
      finishedList.appendChild(listItem);
    } else {
      const moveButton = document.createElement('button');
      moveButton.className = 'button';
      moveButton.textContent = 'Selesai Dibaca';
      moveButton.onclick = () => moveBook(book.id);
      listItem.appendChild(moveButton);
      unfinishedList.appendChild(listItem);
    }
  });
}

// Memanggil fungsi searchBooks saat melakukan pencarian
document.getElementById('search').addEventListener('input', searchBooks);

// Memanggil fungsi searchBooks saat halaman pertama kali dimuat
renderBooks();

  