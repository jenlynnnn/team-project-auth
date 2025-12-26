package com.example.japanInterview.controller;

import com.example.japanInterview.dto.LoginRequest;
import com.example.japanInterview.dto.SignupRequest;
import com.example.japanInterview.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequiredArgsConstructor
@RequestMapping("/auth/")
public class AuthController {

    private final AuthService authService;

    //중복 체크 api 만들기
    @GetMapping("/check-nickname")
    public  ResponseEntity<?> checkNickname(@RequestParam String nickname){
        boolean duplicated = authService.isNicknameDuplicated(nickname);
        return  ResponseEntity.ok().body(
            Map.of("duplicated", duplicated)
        );
    }

    @GetMapping("/check-email")
    public ResponseEntity<?> checkEmail(@RequestParam String email){
        boolean duplicated = authService.isEmailDuplicated(email);
        return  ResponseEntity.ok().body(
          Map.of("duplicated", duplicated)
        );
    }

    // 회원가입 메서드
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest request) {
        authService.signup(request);
        return ResponseEntity.ok("회원가입 성공");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest request) {
        authService.login(request);
        return ResponseEntity.ok("로그인 성공");
    }

    /**
     * 로그인 페이지 뷰를 반환합니다.
     *
     * @return "login.html"
     */
    @GetMapping("/login")
    public String loginPage(Model model, String error) {
        // 로그인 실패 시 (error=true) 메시지를 모델에 추가
        if (error != null) {
            model.addAttribute("loginError", "이메일 또는 비밀번호가 올바르지 않습니다.");
        }
        return "login"; // templates/login.html
    }


}
