package com.bookstore.backend.Controllers;


import com.bookstore.backend.DTO.BookRequestDTO;
import com.bookstore.backend.DTO.BookResponseDTO;
import com.bookstore.backend.Models.Book;
import com.bookstore.backend.Services.BookService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/books")
@Tag(name = "BooksAPI", description = "API for managing books in project")
public class BookController {

    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping("/get")
    @Operation(summary = "Get all books list", description = "Method returns a list of all books in the database")
    public ResponseEntity<List<Book>> getAllBooks() {
        return ResponseEntity.ok(bookService.getAllBooks());
    }

    @GetMapping("/get/{id}")
    @Operation(summary = "Get book by ID", description = "Method returns a specific book by its ID")
    public ResponseEntity<Book> getBookById(@PathVariable Integer id) {
        return bookService.getBookById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/get/page")
    @Operation(summary = "Get paginated books", description = "Method returns a paginated list of books")
    public ResponseEntity<Page<Book>> getPaginatedBooks(@RequestParam(defaultValue = "0") int page,
                                                        @RequestParam(defaultValue = "5") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Book> booksPage = bookService.getBooksByPages(pageable);
        return ResponseEntity.ok(booksPage);

    }

    @PostMapping("/add")
    @Operation(summary = "Add new book", description = "Method creates a new book in the database")
    public ResponseEntity<BookResponseDTO> create(@RequestBody BookRequestDTO request) {
        return ResponseEntity.ok(bookService.createBook(request));
    }

    @PutMapping("/update/{id}")
    @Operation(summary = "Update book", description = "Method updates an existing book by ID")
    public ResponseEntity<BookResponseDTO> updateBook(@PathVariable Integer id, @RequestBody BookRequestDTO bookRequestDTO) {
        return bookService.update(id, bookRequestDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/delete/{id}")
    @Operation(summary = "Delete book", description = "Method deletes a specific book by its ID")
    public ResponseEntity<Book> deleteBook(@PathVariable Integer id) {
        if (bookService.deleteBook(id)) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
