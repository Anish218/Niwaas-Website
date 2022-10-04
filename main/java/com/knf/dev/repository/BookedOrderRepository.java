package com.knf.dev.repository;

import com.knf.dev.models.Booking;
import com.knf.dev.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BookedOrderRepository extends JpaRepository<Booking,Long>{
//    @Query("FROM Booking b WHERE b.productid =?1")
//    Booking getConfrimBookingsById(Long productid);
    @Query("FROM Booking b WHERE b.bookedby =?1")
    List<Booking> getConfrimBookingsByBookedId(Long bookedby);
    @Query("FROM Booking b WHERE b.id =?1")
    Booking getConfrimBookingById(Long id);
}
