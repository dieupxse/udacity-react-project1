import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {search} from '../BooksAPI'
import BookItem from "../components/BookItem";
export default function Search() {
    const [listBooks, setListBooks] = useState([])
    const [searchQuery, setSearchQuery] = useState('');
    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    }
    useEffect(() => {
        let query = (searchQuery+'').trim();
        if(query === '') {
            setListBooks([])
            return;
        };
        search(query, 20).then(rs => {
            if(rs.error) {
                setListBooks([])
            } else {
                setListBooks(rs);
            }
        })
    }, [searchQuery])
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
                                    <BookItem book={b} />
                                </li>
                            ))
                        }
                    </ol>
                </div>
            </div>
        </div>
    )
}