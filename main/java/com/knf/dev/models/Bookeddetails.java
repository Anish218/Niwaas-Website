package com.knf.dev.models;

import lombok.Data;

@Data
public class Bookeddetails {
    private String name;
    private String checkindate;
    private String checkoutdate;
    private String price;
    private String mobilenumber;
    private  String roomtype;
    private String city;

//    public Bookeddetails(String name, String checkindate, String checkoutdate, String price,St) {
//        this.name = name;
//        this.checkindate = checkindate;
//        this.checkoutdate = checkoutdate;
//        this.price = price;
//    }

    public Bookeddetails(String name, String checkindate, String checkoutdate, String price, String mobilenumber, String roomtype, String city) {
        this.name = name;
        this.checkindate = checkindate;
        this.checkoutdate = checkoutdate;
        this.price = price;
        this.mobilenumber = mobilenumber;
        this.roomtype = roomtype;
        this.city = city;
    }
}
