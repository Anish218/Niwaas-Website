package com.knf.dev.controllers;

import com.knf.dev.models.Product;
import com.knf.dev.repository.ProductRepository;
import com.knf.dev.request.BookRequest;
import com.knf.dev.request.FetchProduct;
import com.knf.dev.response.MessageResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 4800)
@RestController
@RequestMapping("/api/auth")
public class BookController {
    @Autowired
 private ProductRepository productRepository;

    @PostMapping("/addBookings")
    public ResponseEntity<?> addBookings(@RequestBody BookRequest request){
        Product product=new Product(request.getName(),request.getMobilenumber(),request.getCheckInDate(),
                request.getCheckOutDate(),request.getCity(),request.getRoomtype(),request.getUserid(),request.getPrice());
        productRepository.save(product);
        return ResponseEntity.ok(new MessageResponse("user registered successfully!"));

    }
    @GetMapping("/booking/{userid}")
    public ResponseEntity<List<Product>> getProducts(@PathVariable(value = "userid") Long userid)
    {
        List<Product> product = productRepository.getBookingsByUserId(userid);
        if(product == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(product);
        //return new ResponseEntity<List<Product>> productRepository.getById(fetchProduct.getUserid());
    }
    @DeleteMapping("/deleteproduct/{id}")
    public ResponseEntity<?> deleteProducts(@PathVariable(value = "id") Long id)
    {
         productRepository.deleteProduct(id);
        return ResponseEntity.ok(new MessageResponse("Booking deleted successfully!"));
        //return new ResponseEntity<List<Product>> productRepository.getById(fetchProduct.getUserid());
    }
    @GetMapping("/bookingdetails/{id}")
    public ResponseEntity<?> getBookingPrice(@PathVariable(value = "id") Long id)
    {
        Product product = productRepository.getBookingsById(id);
        System.out.println(product);
        if(product == null) {
            return ResponseEntity.notFound().build();
        }
        else{
            System.out.println("yes");
            return ResponseEntity.ok().body(product);
        }

        //return new ResponseEntity<List<Product>> productRepository.getById(fetchProduct.getUserid());
    }
}
