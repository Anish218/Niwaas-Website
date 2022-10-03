package com.knf.dev.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString
public class BookRequest {
    private String name;
    private String mobilenumber;
    private String checkInDate;
    private String checkOutDate;
    private String city;
    private String roomtype;
    private Long userid;
    private int price;
}
