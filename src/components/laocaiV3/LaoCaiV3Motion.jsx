import React, { useEffect, useRef, useState } from 'react';

// Kiểm tra người dùng có bật chế độ giảm chuyển động của hệ điều hành hay không
const prefersReducedMotion = () =>
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Hook theo dõi phần tử đi vào khung nhìn (chỉ kích hoạt 1 lần)
export const useInView = ({ threshold = 0, rootMargin = '0px 0px -8% 0px' } = {}) => {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;
        if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
            setInView(true);
            return;
        }
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.disconnect();
                }
            },
            { threshold, rootMargin }
        );
        observer.observe(node);
        return () => observer.disconnect();
    }, [threshold, rootMargin]);

    return [ref, inView];
};

// Khối hiển thị mượt khi cuộn tới: variant = up | left | right | zoom | fade
export const Reveal = ({ as: Tag = 'div', variant = 'up', delay = 0, className = '', style, children, ...rest }) => {
    const [ref, inView] = useInView();
    return (
        <Tag
            ref={ref}
            className={`lc3-reveal lc3-reveal-${variant} ${inView ? 'lc3-in' : ''} ${className}`}
            style={{ transitionDelay: `${delay}ms`, ...style }}
            {...rest}
        >
            {children}
        </Tag>
    );
};

// Số liệu tăng dần khi cuộn tới (easeOutCubic)
export const CountUp = ({ end, decimals = 0, suffix = '', duration = 1600 }) => {
    const [ref, inView] = useInView({ threshold: 0.4 });
    const [value, setValue] = useState(0);

    useEffect(() => {
        if (!inView) return;
        if (prefersReducedMotion()) {
            setValue(end);
            return;
        }
        let frame;
        const start = performance.now();
        const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(end * eased);
            if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [inView, end, duration]);

    return (
        <span ref={ref} className="tabular-nums">
            {value.toLocaleString('vi-VN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
            {suffix}
        </span>
    );
};

// Thanh tiến trình đọc trang mảnh màu vàng hổ phách ở mép trên màn hình
export const ScrollProgressBar = () => {
    const barRef = useRef(null);

    useEffect(() => {
        let frame;
        const update = () => {
            const doc = document.documentElement;
            const max = doc.scrollHeight - doc.clientHeight;
            const ratio = max > 0 ? doc.scrollTop / max : 0;
            if (barRef.current) barRef.current.style.transform = `scaleX(${ratio})`;
        };
        const onScroll = () => {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(update);
        };
        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
        };
    }, []);

    return (
        <div className="fixed top-0 left-0 right-0 h-[3px] z-[1000] pointer-events-none">
            <div
                ref={barRef}
                className="h-full origin-left bg-gradient-to-r from-amber-400 via-amber-500 to-[#991b1b]"
                style={{ transform: 'scaleX(0)' }}
            />
        </div>
    );
};

// Toàn bộ keyframes & class hiệu ứng của trang chủ V3
export const LaoCaiV3Styles = () => (
    <style>{`
        .lc3-reveal {
            opacity: 0;
            transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
            will-change: opacity, transform;
        }
        .lc3-reveal-up { transform: translateY(28px); }
        .lc3-reveal-left { transform: translateX(-28px); }
        .lc3-reveal-right { transform: translateX(28px); }
        .lc3-reveal-zoom { transform: scale(0.96); }
        .lc3-reveal.lc3-in { opacity: 1; transform: none; }

        .lc3-heading-bar { width: 0; transition: width 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.2s; }
        .lc3-in .lc3-heading-bar { width: 2.75rem; }

        .lc3-card {
            transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.35s ease;
        }
        .lc3-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 16px 32px -12px rgba(15, 76, 129, 0.18), 0 4px 8px -4px rgba(15, 23, 42, 0.06);
        }

        @keyframes lc3RotateCW { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes lc3RotateCCW { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
        @keyframes lc3Float {
            0%, 100% { transform: translateY(0) rotate(45deg); opacity: 0.35; }
            50% { transform: translateY(-8px) rotate(45deg); opacity: 0.75; }
        }
        @keyframes lc3Sweep {
            0% { transform: translateX(-160%) skewX(-25deg); opacity: 0; }
            25%, 70% { opacity: 0.28; }
            100% { transform: translateX(260%) skewX(-25deg); opacity: 0; }
        }
        @keyframes lc3FadeDown { from { opacity: 0; transform: translateY(-16px); } to { opacity: 1; transform: none; } }
        @keyframes lc3KenBurns { from { transform: scale(1.08); } to { transform: scale(1); } }
        @keyframes lc3TextIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: none; } }
        @keyframes lc3Progress { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @keyframes lc3VerticalTicker { from { transform: translateY(0); } to { transform: translateY(-50%); } }
        @keyframes lc3Ping { 0% { transform: scale(1); opacity: 0.6; } 100% { transform: scale(2.4); opacity: 0; } }
        @keyframes lc3Shine { from { transform: translateX(-120%) skewX(-20deg); } to { transform: translateX(220%) skewX(-20deg); } }

        .lc3-rotate-cw { animation: lc3RotateCW 60s linear infinite; }
        .lc3-rotate-ccw { animation: lc3RotateCCW 80s linear infinite; }
        .lc3-float { animation: lc3Float 5s ease-in-out infinite; }
        .lc3-sweep { animation: lc3Sweep 9s ease-in-out infinite; }
        .lc3-fade-down { animation: lc3FadeDown 0.8s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .lc3-kenburns { animation: lc3KenBurns 7s ease-out both; }
        .lc3-text-in { animation: lc3TextIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .lc3-ping { animation: lc3Ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite; }
        .lc3-shine { overflow: hidden; }
        .lc3-shine::after {
            content: ''; position: absolute; inset: 0; width: 40%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent);
            transform: translateX(-120%) skewX(-20deg); pointer-events: none;
        }
        .lc3-shine:hover::after { animation: lc3Shine 0.9s ease; }

        @keyframes lc3Drift {
            0%, 100% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(40px, 24px) scale(1.12); }
        }
        .lc3-drift { animation: lc3Drift 14s ease-in-out infinite; }

        .lc3-stagger { opacity: 0; }
        .lc3-in .lc3-stagger { animation: lc3TextIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) both; }

        .lc3-thin-scroll { scrollbar-width: thin; scrollbar-color: rgba(15, 76, 129, 0.25) transparent; }
        .lc3-thin-scroll::-webkit-scrollbar { width: 5px; }
        .lc3-thin-scroll::-webkit-scrollbar-thumb { background: rgba(15, 76, 129, 0.25); border-radius: 9999px; }

        @media (prefers-reduced-motion: reduce) {
            .lc3-stagger, .lc3-in .lc3-stagger { opacity: 1; animation: none; }
            .lc3-drift { animation: none; }
            .lc3-reveal, .lc3-reveal.lc3-in { opacity: 1; transform: none; transition: none; }
            .lc3-heading-bar { width: 2.75rem; transition: none; }
            .lc3-rotate-cw, .lc3-rotate-ccw, .lc3-float, .lc3-sweep, .lc3-kenburns,
            .lc3-text-in, .lc3-ping, .lc3-fade-down, .lc3-ticker { animation: none !important; }
            .lc3-progress { animation: none !important; }
        }
    `}</style>
);
