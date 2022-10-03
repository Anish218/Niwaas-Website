package com.knf.dev.request;

import lombok.Data;

@Data
public class FetchProduct {
    private int userid;

    public FetchProduct(int userid) {
        this.userid = userid;
    }
}
