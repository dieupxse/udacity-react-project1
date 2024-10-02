import {useEffect, useState  } from "react";
import {getAll} from '../BooksAPI'
import BookShelf from "../components/BookShelf";
import { Link } from "react-router-dom";
export default function Home() {
    const [listBooks, setListBooks] = useState([]);
    const shelves = [
            {
                name: 'Currently Reading',
                shelf: 'currentlyReading'
            },
            {
                name: 'Want to Read',
                shelf: 'wantToRead'
            },
            {
                name: 'Read',
                shelf: 'read'
            }
        ]
    const getBooks = () => getAll().then(rs => {
        setListBooks(rs);
    })
    useEffect(() => {
        getBooks();
    }, [])
    return (
        <div className="app">
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        {
                            shelves && shelves.map(s => 
                                    {
                                        const bookInShelf = listBooks.filter(b => b.shelf === s.shelf);
                                        return (
                                            <BookShelf key={s.shelf} name={s.name} books={bookInShelf} shelf={s.shelf} onShelfChange={getBooks} />
                                        )
                                    }
                                )
                        }
                    </div>
                </div>
                <div className="open-search">
                    <Link to="/search" >Add a book</Link>
                </div>
            </div>
        </div>
    )
}