package com.knf.dev.controllers;

import com.knf.dev.models.Booking;
import com.knf.dev.repository.BookedOrderRepository;
import com.knf.dev.request.ConfirmorderRequest;
import com.knf.dev.response.MessageResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 4800)
@RestController
@RequestMapping("/api/auth")
public class ConfirmedOrderController {
    @Autowired
    private BookedOrderRepository bookedOrderRepository;

    public ConfirmedOrderController(BookedOrderRepository bookedOrderRepository) {
        this.bookedOrderRepository = bookedOrderRepository;
    }


    @PostMapping("/confirmorder")
    public ResponseEntity<?> addBookedorder(@RequestBody ConfirmorderRequest request){

            System.out.println("enter");
            Booking booking=new Booking(request.getOrderid(),
                    request.getBookedby(),request.getTransactionid(),
                    request.getPaymentdate(),request.getPaymentproof(),
                     request.getName(),
                    request.getCheckindate(),
                    request.getCheckoutdate(),
                    request.getPrice(),
                    request.getMobilenumber(),
                    request.getRoomtype(),
                    request.getCity()
                    );
            bookedOrderRepository.save(booking);



        return ResponseEntity.ok(booking);

    }
//    @GetMapping ("/getconfirmbookings/{productid}")
//    public ResponseEntity<Booking> getConfirmBookings(@PathVariable(value = "productid") Long productid){
//        //System.out.println(request.getBookeddetails().size());
//        System.out.println("yes");
//        Booking booking=bookedOrderRepository.getConfrimBookingsById(productid);
//
//
//
//        return ResponseEntity.ok().body(booking);
//
//    }
    @GetMapping("/getconfirmbookingdetails/{bookedby}")
    public ResponseEntity<List<Booking>> getConfirmBookingByUsername(@PathVariable(value = "bookedby") Long bookedby)
    {
        List<Booking> booking = bookedOrderRepository.getConfrimBookingsByBookedId(bookedby);
        if(booking == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(booking);
        //return new ResponseEntity<List<Product>> productRepository.getById(fetchProduct.getUserid());
    }
    @GetMapping("/getbookingdetail/{id}")
    public ResponseEntity<Booking> getConfirmBooking(@PathVariable(value = "id") Long id)
    {
        Booking booking = bookedOrderRepository.getConfrimBookingById(id);
        if(booking == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(booking);
        //return new ResponseEntity<List<Product>> productRepository.getById(fetchProduct.getUserid());
    }

}
