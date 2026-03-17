# Aplikacja internetowa księgarni
    Aplikacja internetowa służąca do przeglądania i zamawiania książek online.

## Stos Technologii
    Frontend: 
        Next.js
        TypeScript
  
    Backend: 
        Spring Boot
        Spring Data JPA
        Lombok
        Spring Security + JWT
        Swagger / Springdoc OpenAPI
        Logback
  
    Database: PostgreSQL

## Struktura Projektu
    backend/ – część backendowa aplikacji
  
    frontend/ – część frontendowa aplikacji

## Sprint Plan
### Sprint 1 (Tydzień 1–2)
  Cel sprintu: Przygotowanie architektury projektu oraz implementacja podstawowej funkcjonalności katalogu książek.
  #### Backend:
    Inicjalizacja projektu backend
    Konfiguracja połączenia z bazą danych PostgreSQL
    Utworzenie encji Book
    Implementacja BookRepository
    Implementacja BookService
    Implementacja BookController z endpointami:
        GET /books/get
        GET /books/get/{id}
        POST /books/add
        PUT /books/update/{id}
        DELETE /books/delete/{id}
        GET /books/get/page?page=x&size=x
  #### Frontend:
    Inicjalizacja projektu frontend
    Konfiguracja struktury katalogów projektu
    Przygotowanie makiet UI w Figma
    Tworzenie strony głównej aplikacji
    Integracja API:
        Pobieranie listy książek z backendu
        Wyświetlanie książek na stronie głównej
        Obsługa paginacji
### Sprint 2 (Tydzień 3-4)
  Cel sprintu: Implementacja systemu użytkowników (rejestracja i logowanie).
  #### Backend:
    Utworzenie encji User
    Implementacja UserRepository
    Implementacja UserService
    Implementacja DTO(Data Transfer Object):
        RegisterRequest
        LoginRequest
        UserDTO
    Implementacja AuthController z endpointami:
        POST auth/register
        POST auth/login   
    Implementacja UserController: z endpointami
        GET users/get
        GET users/get/{id}
        PUT users/update/{id}
        DELETE users/delete/{id}
    Bezpieczeństwo:
        Implementacja szyfrowania haseł (BCrypt)
        Implementacja JWT
        Konfiguracja Spring Security
    Tworzenie ról:
        ROLE_USER
        ROLE_ADMIN
  #### Frontend:
    Tworzenie stron:
        LoginPage
        RegisterPage
        ProfilePage
    Integracja z API logowania i rejestracji
    Funkcjonalności:
        Logowanie / rejestracja  
        Zapisywanie tokenu JWT  
        Edycja profilu  
        Usuwanie konta  
### Sprint 3 (Tydzień 5–6)
  Cel sprintu: Rozbudowa katalogu książek oraz implementacja gatunków, wyszukiwania, paginacji i okładek.
  #### Backend:
    Implementacja encji Genre
    Aktualizacja encji Book (relacja ManyToMany z Genre)
    Rozszerzenie encji Book o pole coverUrl
    Tworzenie tabeli book_genres  
    Implementacja GenreRepository
    Implementacja GenreService
    Implementacja DTO:
        BookResponse
        BookSearchRequest
        GenreDTO
    Implementacja GenreController z endpointami:
        GET    /genres/get  
        POST   /genres/add  
        PUT    /genres/update/{id}  
        DELETE /genres/delete/{id}
    Rozszerzenie BookController o endpointy:
        GET /books/get/title?value=&page=x&size=x
        GET /books/get/author?value=&page=x&size=x
        GET /books/get/genre/{id}?page=x&size=x
        GET /books/get/search?title=x&author=x&genre=x&page=x&size=x
        GET /books/get/page?page=x&size=x&sort=title,asc
    Funkcjonalności:
        Filtrowanie książek po gatunku
        Wyszukiwanie książek (po title i author)
        Możliwość łączenia filtrów (search endpoint)
        Sortowanie książek
    Integracja z API (Open Library):
        Pobieranie okładek książek  
        Zapisywanie URL w polu coverUrl 
  #### Frontend:
    Tworzenie stron:
        BookDetailsPage  

    Funkcjonalności:
        Filtrowanie po gatunku  
        Wyszukiwanie książek  
        Wyświetlanie szczegółów książki  
        Pobieranie okładek książek na podstawie ISBN lub tytułu

### Sprint 4 (Tydzień 7-8)
  Cel sprintu: Implementacja koszyka, zamówień oraz panelu administratora.
  #### Backend:
    Implementacja encji:
          Cart
          CartItem
          Order
          OrderItem
    Implementacja CartRepository
    Implementacja CartService
    Implementacja CartController z endpointami:
        GET    /cart/get
        POST   /cart/add
        PUT    /cart/update
        DELETE /cart/delete/{id}
    Implementacja OrderRepository
    Implementacja OrderService
    Implementacja OrderController z endpointami:
        POST /orders/add
        GET  /orders/get
        GET  /orders/get/{id}
    
    Implementacja kontrolerów administratora:
        AdminOrderController:
            GET /admin/orders/get
            PUT /admin/orders/update/{id}
        AdminBookController:
            POST   /admin/books/add
            PUT    /admin/books/update/{id}
            DELETE /admin/books/delete/{id}
            
    Ograniczenie dostępu do metod POST/PUT/DELETE w BookController (ROLE_ADMIN)
    Logika magazynu:
        Sprawdzanie stockQuantity przed dodaniem do koszyka  
        Aktualizacja stockQuantity po zamówieniu  
        Blokada zakupu przy braku dostępności  

    Bezpieczeństwo:
        Użytkownik ma dostęp tylko do swoich zamówień
        Ograniczenie dostępu do /admin/** (ROLE_ADMIN)
  #### Frontend:
    Tworzenie stron:
        CartPage  
        CheckoutPage  
        OrdersPage  
        AdminPanelPage 
    Admin Panel (ROLE_ADMIN):
        Lista książek  
        Dodawanie książek  
        Edycja książek  
        Usuwanie książek  
        Zarządzanie zamówieniami (zmiana statusu)  

    Funkcjonalności:
        Koszyk (dodawanie, usuwanie, zmiana ilości)  
        Składanie zamówienia  
        Historia zamówień 
    
    



## Autorzy
  Artiom Prilepschi
  
  Nazar Pavlenko
