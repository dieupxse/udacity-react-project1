import BookItem from "./BookItem";
export default function BookShelf(props) {
    const name = props.name;
    const books = props.books || [];
    const shelf = props.shelf;
    const onShelfChange = props.onShelfChange;
    return(
        <div className="bookshelf">
            <h2 className="bookshelf-title">{name}</h2>
            <div className="bookshelf-books">
            <ol className="books-grid">
                {
                    books && books.filter(s=> s.shelf === shelf).map(b=> (
                        <li key={b.id}>
                            <BookItem book={b} shelf={shelf} onShelfChange={onShelfChange}/>
                        </li>
                    ))
                }
            </ol>
            </div>
        </div>
    )
}