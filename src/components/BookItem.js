import {update} from '../BooksAPI'
export default function BookItem(props) {
    const book = props.book;
    const shelf = props.shelf || book.shelf || 'none';
    const onShelfChange = props.onShelfChange;
    const handleChangeShelf = (e) => {
        update(book, e.target.value).then(rs => {
            alert('Add book to shelf success');
            onShelfChange && onShelfChange(book, e.target.value);
        })
    }
    return (
        <div className="book">
            <div className="book-top">
            <div
                className="book-cover"
                style={{
                width: 128,
                height: 188,
                backgroundImage: `url("${book.imageLinks?.thumbnail}")`,
                }}
            ></div>
            <div className="book-shelf-changer">
                <select onChange={handleChangeShelf} defaultValue={shelf}>
                <option value="" disabled>
                    Move to...
                </option>
                <option value="currentlyReading">
                    Currently Reading
                </option>
                <option value="wantToRead" >Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
                </select>
            </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors?.join(',') || 'Unknown'}</div>
        </div>
    );
}