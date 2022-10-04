package com.knf.dev.request;

import com.knf.dev.models.Bookeddetails;
import lombok.Data;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;
@Data
@ToString
public class ConfirmorderRequest {
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
   // private Long productid;


}
