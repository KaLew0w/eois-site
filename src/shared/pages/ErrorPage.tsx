import { Button } from "antd";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
    const navigate = useNavigate();

    return (
        <div
            style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'linear-gradient(135deg, #000000, #0d0d0d)',
                color: 'white',
                textAlign: 'center',
                padding: '2rem',
            }}
        >
            {/* Анимированный фон или "glow" */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'radial-gradient(circle at center, rgba(0,240,212,0.1), transparent 70%)',
                    filter: 'blur(200px)',
                    zIndex: 0,
                    pointerEvents: 'none',
                }}
            ></div>

            <div style={{ position: 'relative', zIndex: 1, maxWidth: '600px' }}>
                <h1
                    style={{
                        fontSize: '8rem',
                        fontWeight: 'bold',
                        margin: 0,
                        background: 'linear-gradient(90deg, #00EFFD, #32FFB1)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        lineHeight: '1',
                    }}
                >
                    404
                </h1>
                <h2 style={{ fontSize: '2rem', margin: '1rem 0', fontWeight: 300 }}>
                    Страница не найдена
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '2rem' }}>
                    Кажется, вы зашли не туда. Вернитесь на главную страницу или свяжитесь с поддержкой.
                </p>
                <Button
                    onClick={() => navigate('/')}
                    style={{
                        background: 'linear-gradient(90deg, #00EFFD, #32FFB1)',
                        border: 'none',
                        color: 'black',
                        fontWeight: 'bold',
                        padding: '0.75rem 2rem',
                        borderRadius: '9999px',
                        fontSize: '1rem',
                    }}
                >
                    На главную
                </Button>
            </div>
        </div>
    )
}