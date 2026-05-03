package com.bookstore.backend.Controllers;

import com.bookstore.backend.DTO.OrderResponseDTO;
import com.bookstore.backend.Models.Order;
import com.bookstore.backend.Services.OrderService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
@Tag(name = "Orders", description = "User order operations controller")
public class OrderController {

    private final OrderService orderService;

    @PostMapping("/add")
    public ResponseEntity<OrderResponseDTO> createOrder(Authentication authentication) {
        return ResponseEntity.ok(
                orderService.mapToDTO(
                        orderService.createOrder(authentication.getName()))
        );
    }

    @GetMapping("/get")
    public ResponseEntity<List<OrderResponseDTO>> getOrders(Authentication authentication) {
        return ResponseEntity.ok(
                orderService.getOrders(authentication.getName())
                        .stream()
                        .map(orderService::mapToDTO)
                        .toList()
        );
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<OrderResponseDTO> getOrder(Authentication authentication,
                                          @PathVariable Integer id) {
        return ResponseEntity.ok(
                orderService.mapToDTO(
                        orderService.getOrderById(authentication.getName(), id)
                )
        );
    }
}
