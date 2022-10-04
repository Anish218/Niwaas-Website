package com.knf.dev.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;
@Data
@NoArgsConstructor

@Entity
@Table(name="confirmorder")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String orderid;
    private Long bookedby;
    private String transactionid;
    private String paymentdate;
    private String paymentproof;
    private String name;
    private String checkindate;
    private String checkoutdate;
    private  String price;
    private String mobilenumber;
    private String roomtype;
    private  String city;

    public Booking( String orderid, Long bookedby, String transactionid, String paymentdate, String paymentproof, String name, String checkindate, String checkoutdate, String price, String mobilenumber, String roomtype, String city) {
       // this.id = id;
        this.orderid = orderid;
        this.bookedby = bookedby;
        this.transactionid = transactionid;
        this.paymentdate = paymentdate;
        this.paymentproof = paymentproof;
        this.name = name;
        this.checkindate = checkindate;
        this.checkoutdate = checkoutdate;
        this.price = price;
        this.mobilenumber = mobilenumber;
        this.roomtype = roomtype;
        this.city = city;
        //this.productid=productid;

    }
}
