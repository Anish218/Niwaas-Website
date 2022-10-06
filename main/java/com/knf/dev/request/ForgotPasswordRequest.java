package com.knf.dev.request;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class ForgotPasswordRequest {
    private String username;
    private String newpassword;
    private String confirmnewpassword;
}
