package com.knf.dev.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@NoArgsConstructor
@Table (name="product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private String mobilenumber;
    private String checkInDate;
    private String checkOutDate;
    private String city;
    private String roomtype;
    private Long userid;
    private int price;

    public Product(String name, String mobilenumber, String checkInDate, String checkOutDate, String city, String roomtype,Long userid,int price) {
        this.name = name;
        this.mobilenumber = mobilenumber;
        this.checkInDate = checkInDate;
        this.checkOutDate = checkOutDate;
        this.city = city;
        this.roomtype = roomtype;
        this.userid=userid;
        this.price=price;
    }

}
