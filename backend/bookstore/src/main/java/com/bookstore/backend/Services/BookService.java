package com.bookstore.backend.Services;

import com.bookstore.backend.DTO.BookRequestDTO;
import com.bookstore.backend.DTO.BookResponseDTO;
import com.bookstore.backend.Models.Book;
import com.bookstore.backend.Models.Genre;
import com.bookstore.backend.Repositories.BookRepository;
import com.bookstore.backend.Repositories.GenreRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BookService{

    private static final Logger logger = LoggerFactory.getLogger(BookService.class);


    private final BookRepository bookRepository;
    private final GenreRepository genreRepository;



    public List<Book> getAllBooks(){
        logger.info("Getting all books");
        return bookRepository.findAll();
    }

    public Optional<Book> getBookById(Integer id){
        logger.info("Getting book by id {}", id);
        return bookRepository.findById(id);
    }

    public BookResponseDTO createBook(BookRequestDTO dto) {
        List<Genre> genres = genreRepository.findAllById(dto.getGenreIds());

        Book book = new Book();

        book.setTitle(dto.getTitle());
        book.setAuthor(dto.getAuthor());
        book.setDescription(dto.getDescription());
        book.setCoverUrl(dto.getCoverUrl());
        book.setPublicationYear(dto.getPublicationYear());
        book.setPrice(dto.getPrice());
        book.setStockQuantity(dto.getStockQuantity());
        book.setGenres(genres);
        Book saved = bookRepository.save(book);

        return mapToDTO(saved);
    }

    public Optional<BookResponseDTO> update(Integer id, BookRequestDTO dto) {

        return bookRepository.findById(id).map(book -> {

            if (dto.getTitle() != null)
                book.setTitle(dto.getTitle());

            if (dto.getAuthor() != null)
                book.setAuthor(dto.getAuthor());

            if (dto.getDescription() != null)
                book.setDescription(dto.getDescription());

            if (dto.getCoverUrl() != null)
                book.setCoverUrl(dto.getCoverUrl());

            if (dto.getPublicationYear() != null)
                book.setPublicationYear(dto.getPublicationYear());

            if (dto.getPrice() != null)
                book.setPrice(dto.getPrice());

            if (dto.getStockQuantity() != null)
                book.setStockQuantity(dto.getStockQuantity());

            if (dto.getGenreIds() != null) {
                List<Genre> genres = genreRepository.findAllById(dto.getGenreIds());
                book.setGenres(genres);
            }

            Book updated = bookRepository.save(book);

            return mapToDTO(updated);
        });
    }

    @Transactional
    public Page<Book> getBooksByPages(Pageable pageable) {
        logger.info("Getting books by pages {}", pageable.getSort());
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

    public BookResponseDTO mapToDTO(Book book) {
        return BookResponseDTO.builder()
                .id(book.getId())
                .title(book.getTitle())
                .author(book.getAuthor())
                .description(book.getDescription())
                .coverUrl(book.getCoverUrl())
                .publicationYear(book.getPublicationYear())
                .price(book.getPrice())
                .stockQuantity(book.getStockQuantity())
                .genres(
                        book.getGenres().stream()
                                .map(Genre::getName)
                                .toList()
                )
                .build();
    }

}
