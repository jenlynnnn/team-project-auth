import { Box, Button, Paper, Stack, TextField, Typography } from '@mui/material';
import { useState } from "react";
import { signup, checkEmail, checkNickname } from '../api/authApi';
//  소문자 signup
import styles from "../../styles/Login.module.css";
import { useNavigate } from 'react-router';

function Signup() {
    //중복 체크
    const [nicknameError, setNicknameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    //상태
    const [emailStatus, setEmailStatus] = useState("idle");
    const [nicknameStatus, setNicknameStatus] = useState("idle");


    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: "",
        password: "",
        passwordConfirm: "",
        nickname: "",
    });

    //회원가입
    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async () => {
        if (emailError || passwordError) {
            alert("입력값을 다시 확인해주세요.");
            return;
        }
        if (form.password !== form.passwordConfirm) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        try {
            await signup(form);
            alert("회원가입 성공!");
            navigate("/login", { replace: true });
        } catch (e) {
            alert(e.response?.data?.message || "회원가입 실패");
        }
    };

    //이메일 중복 확인
    const handleEmailBlur = async (e) => {
        const email = e.target.value.trim();
        if (!email) {
            setEmailStatus("idle");
            setEmailError("");
            return;
        }
        setEmailStatus("checking");
        try {
            const res = await checkEmail(email);
            if (res.data.duplicated) {
                setEmailError("이미 사용 중인 이메일입니다.");
                setEmailStatus("error");
            } else {
                setEmailError("");
                setEmailStatus("success");
            }
        } catch {
            setEmailError("이메일 확인 중 오류가 발생했습니다.");
            setEmailStatus("error");
        }
    };

    //비밀번호 8자 이상 검증 확인
    const handlePasswordChange = (e) => {
        const value = e.target.value.trim();
        setForm((prev) => ({ ...prev, password: value }));
        if (value.length < 8) {
            setPasswordError("비밀번호는 8자 이상이어야 합니다.");
        } else {
            setPasswordError("");
        }
    };

    //닉네임 중복 확인
    const handleNicknameBlur = async (e) => {
        const nickname = e.target.value.trim();
        if (!nickname) {
            setNicknameStatus("idle");
            setNicknameError("");
            return;
        }
        setNicknameStatus("checking");
        try {
            const res = await checkNickname(nickname);
            if (res.data.duplicated) {
                setNicknameError("이미 존재하는 닉네임입니다.");
                setNicknameStatus("error");
            } else {
                setNicknameError("");
                setNicknameStatus("success");
            }
        } catch {
            setNicknameError("닉네임 확인 중 오류가 발생했습니다.");
            setNicknameStatus("error");
        }
    };



    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.logo}>
                    <span className={styles.qIcon}>GYC</span>
                    <h2>장모수건과 함께하는 AI 면접 플랫폼</h2>
                </div>

                <p className={styles.subtitle}>
                    환영합니다! 회원가입을 시작해볼까요?
                </p>

                <div className={styles.tab}>
                    <button className={styles.tabBtn} onClick={() => navigate("/login")}>로그인</button>
                    <button className={`${styles.tabBtn} ${styles.active}`}>회원가입</button>
                </div>

                <div className={styles.form}>
                    <input
                        type="email"
                        name="email"
                        placeholder="name@example.com"
                        onChange={handleChange}
                        onBlur={handleEmailBlur}
                    />
                    {emailStatus === "checking" && (
                        <p className={styles.checking}>확인 중...</p>
                    )}
                    {emailStatus === "success" && (
                        <p className={styles.success}>✔ 사용 가능한 이메일입니다.</p>
                    )}
                    {emailError && <p className={styles.error}>{emailError}</p>}



                    <input
                        type="password"
                        name="password"
                        placeholder="8자 이상 입력해주세요"
                        onChange={handlePasswordChange}
                    />
                    {passwordError && <p className={styles.error}>{passwordError}</p>}

                    <input
                        type="password"
                        name="passwordConfirm"
                        placeholder="비밀번호 확인"
                        onChange={handleChange}
                    />
                    <input
                        name="nickname"
                        placeholder="닉네임"
                        onChange={handleChange}
                        onBlur={handleNicknameBlur}
                    />
                    {nicknameStatus === "checking" && (
                        <p className={styles.checking}>확인 중...</p>
                    )}

                    {nicknameStatus === "success" && (
                        <p className={styles.success}>✔ 사용 가능한 닉네임입니다.</p>
                    )}
                    {nicknameError && (
                        <p className={styles.error}>{nicknameError}</p>
                    )}

                    <button className={styles.signupBtn} onClick={handleSubmit}>
                        가입하기 →
                    </button>
                </div>

                <span className={styles.back}>← 메인으로 돌아가기</span>
            </div>
        </div>
    );
}

export default Signup;