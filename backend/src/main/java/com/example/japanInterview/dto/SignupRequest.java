package com.example.japanInterview.dto;

import lombok.Getter;

@Getter
public class SignupRequest {

    private String email;
    private String password;
    private String nickname;
    private String passwordConfirm; // 비밀번호 확인 필드

}
