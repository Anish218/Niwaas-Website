package com.knf.dev.repository;

import com.knf.dev.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product,Long> {
    @Query("FROM Product p WHERE p.userid =?1")
    List<Product> getBookingsByUserId(Long userid);
    @Query("FROM Product p WHERE p.id =?1")
    Product getBookingsById(Long id);

    @Modifying
    @Transactional
    @Query(value="DELETE FROM Product p where p.id=?1",nativeQuery = true)
            void  deleteProduct(@Param("id") Long id);

}
