import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {search, getAll} from '../BooksAPI'
import BookItem from "../components/BookItem";
export default function Search() {
    const [listBooks, setListBooks] = useState([])
    const [searchQuery, setSearchQuery] = useState('');
    const location = useLocation();
    const books = location.state?.listBooks || [];
    const [myBooks, setMyBooks] = useState(books)
    const getMyBooks = () => getAll().then(rs => {
        setMyBooks(rs);
    })
    if (!myBooks) {
       getMyBooks();
    }
    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    }
    const handleShelfChange = (book, shelf) => {
        const exist = myBooks.find(b => b.id === book.id);
        if(exist) {
            book.shelf = shelf;
            setMyBooks(myBooks.map(b => b.id !== book.id ? b: book))
        } else {
            setMyBooks([...myBooks, book]);
        }
    }
    useEffect(() => {
        console.log('useEffect running')
        let query = (searchQuery+'').trim();
        if(query === '') {
            setListBooks([])
            return;
        };
        search(query, 20).then(rs => {
            if(rs.error) {
                setListBooks([])
            } else {
                rs = rs.map(b => {
                    let book = myBooks.find(s=>s.id === b.id);
                    b.shelf = book?.shelf || 'none';
                    return b;
                });
                setListBooks(rs);
            }
        })
    }, [searchQuery, myBooks])
    return (
        <div className="app">
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                    <input
                        type="text"
                        placeholder="Search by title, author, or ISBN"
                        onInput={handleSearch}
                    />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {
                            listBooks && listBooks.map(b => (
                                <li key={b.id}>
                                    <BookItem book={b} onShelfChange={handleShelfChange} />
                                </li>
                            ))
                        }
                    </ol>
                </div>
            </div>
        </div>
    )
}