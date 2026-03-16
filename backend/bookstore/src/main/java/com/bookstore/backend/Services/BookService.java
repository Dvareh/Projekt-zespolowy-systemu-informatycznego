package com.bookstore.backend.Services;

import com.bookstore.backend.Models.Book;
import com.bookstore.backend.Repositories.BookRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class BookService{

    private static final Logger logger = LoggerFactory.getLogger(BookService.class);


    private final BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public List<Book> getAllBooks(){
        logger.info("Getting all books");
        return bookRepository.findAll();
    }

    public Optional<Book> getBookById(Integer id){
        logger.info("Getting book by id {}", id);
        return bookRepository.findById(id);
    }

    @Transactional
    public Book addBook(Book book){
        logger.info("Adding book {}", book.getTitle());
        return bookRepository.save(book);
    }

    @Transactional
    public Optional<Book> updateBook(Integer id, Book updatedBook) {
        return bookRepository.findById(id).map(existingBook -> {
            logger.info("Updating book with id {}", id);
            existingBook.setTitle(updatedBook.getTitle());
            existingBook.setAuthor(updatedBook.getAuthor());
            existingBook.setDescription(updatedBook.getDescription());
            existingBook.setPublicationYear(updatedBook.getPublicationYear());
            existingBook.setPrice(updatedBook.getPrice());
            existingBook.setGenre(updatedBook.getGenre());

            return bookRepository.save(existingBook);
        });
    }

    @Transactional
    public Page<Book> getBooksByPages(Pageable pageable) {
        return bookRepository.findAll(pageable);
    }

    @Transactional
    public boolean deleteBook(Integer id) {
        if (bookRepository.existsById(id)) {
            bookRepository.deleteById(id);
            logger.info("Deleted book with id {}", id);
            return true;
        }
        logger.warn("Attempted to delete non-existing book with id {}", id);
        return false;
    }

}
