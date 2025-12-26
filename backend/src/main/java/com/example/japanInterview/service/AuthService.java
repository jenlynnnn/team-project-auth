package com.example.japanInterview.service;

import com.example.japanInterview.dto.LoginRequest;
import com.example.japanInterview.dto.SignupRequest;
import com.example.japanInterview.entity.User;
import com.example.japanInterview.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional (readOnly = true) // 기본적으로 읽기 전용 트랜잭션
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // 이메일, 닉네임 중복 체크 전용 메서드
    public boolean isNicknameDuplicated(String nickname){
        return userRepository.existsByNickname(nickname);
    }

    public boolean isEmailDuplicated(String email){
        return  userRepository.existsByEmail(email);
    }

    // 로그인...
    public String signup(SignupRequest request) {

        // 이메일 중복 체크
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("이미 존재하는 이메일입니다.");
        }

        // 닉네임 중복 체크
        if (userRepository.existsByNickname(request.getNickname())) {
            throw new IllegalArgumentException("이미 존재하는 닉네임입니다."); // 닉네임 중복
        }

        // 회원 생성
        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .nickname(request.getNickname())
                .build();

        // DB 저장
        userRepository.save(user);

        return "";
    }

    // 이메일, 비밀번호 확인 일치 여부
    public void login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("없는 이메일입니다."));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }

    }
}

