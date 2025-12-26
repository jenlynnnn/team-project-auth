import { useState } from "react";
import { login } from "../api/authApi";
import styles from "../../styles/Login.module.css";
import { useNavigate } from 'react-router';


function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            await login({ email, password });
            alert("로그인 성공");
        } catch (e) {
            alert(e.response?.data?.message || "로그인 실패");
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
                    다시 오셨군요! 면접 준비를 시작해볼까요?
                </p>

                <div className={styles.tab}>
                    <button className={`${styles.tabBtn} ${styles.active}`}>로그인</button>
                    <button className={styles.tabBtn} onClick={() => navigate("/signup")}>회원가입</button>
                </div>

                <div className={styles.form}>
                    <input
                        type="email"
                        placeholder="name@example.com"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="8자 이상 입력해주세요"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className={styles.loginBtn} onClick={handleLogin}>
                        로그인하기 →
                    </button>
                </div>

                <span className={styles.back} onClick={() => navigate("/")}>← 메인으로 돌아가기</span>
            </div>
        </div>
    );
}

export default Login;
