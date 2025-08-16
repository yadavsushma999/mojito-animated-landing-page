import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'
import { SplitText, ScrollTrigger } from "gsap/all";
import { useMediaQuery } from 'react-responsive';
gsap.registerPlugin(SplitText, ScrollTrigger);


const Hero = () => {
    const videoRef = useRef();
    const videoTimelineRef = useRef()
    const isMobile = useMediaQuery({ maxWidth: 767 })

    useGSAP(() => {
        const heroSplit = new SplitText('.title', { type: 'chars,words' });
        const paragraphSplit = new SplitText('.subtitle', { type: 'lines' });
        heroSplit.chars.forEach((char) => char.classList.add('text-gradient'));
        gsap.from(heroSplit.chars, {
            yPercent: 100,
            duration: 1.8,
            ease: 'expo.out',
            stagger: 0.06
        });

        gsap.from(paragraphSplit.lines, {
            opacity: 0,
            duration: 1.8,
            ease: 'expo.out',
            stagger: 0.06,
            delay: 1,
        });

        gsap.to(".left-leaf", {
            y: "+=20",
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
        });

        gsap.to(".right-leaf", {
            y: "-=20",
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
        });

        const startValue = isMobile ? 'top 50%' : 'center 60%';
        const endValue = isMobile ? '120% top' : 'bottom top';

        //Video animation timeline
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: 'video',
                start: startValue,
                end: endValue,
                scrub: true,
                pin: true,

            }
        })

        videoRef.current.onloadedmetadata = () => {
            tl.to(videoRef.current, {
                currentTime: videoRef.current.duration
            })

        }



    }, []);
    return (
        <>
            <section id="hero" className='noisy' >
                <h1 className='title'>MOJITO</h1>

                <img
                    src='/images/hero-left-leaf.png'
                    alt='left-leaf'
                    className='left-leaf' />

                <img
                    src='/images/hero-right-leaf.png'
                    alt='right-leaf'
                    className='right-leaf' />

                <div className='body  md:mt-40'>
                    <div className='content'>
                        {/* Left side (bottom-left on lg) */}
                        <div className="space-y-5 text-center lg:text-left">
                            <p className="text-lg tracking-wide uppercase opacity-80">Cool. Crisp. Classic.</p>
                            <p className="subtitle font-modern-negra text-3xl sm:text-5xl lg:text-6xl text-yellow">
                                Sip the Spirit <br /> of Summer
                            </p>
                        </div>

                        {/* Right side (bottom-right on lg) */}
                        <div className='view-cocktails text-center lg:text-right lg:max-w-md space-y-5'>
                            <p className='subtitle text-base sm:text-lg leading-relaxed hidden md:block'>
                                Every cocktail on our menu is a blend of premium ingredients, <br />
                                creative flair, and timeless recipes — designed to delight your senses.
                            </p>
                            <a
                                href='#cocktails'
                                className='inline-block px-6 py-3 rounded-full bg-yellow text-black font-semibold hover:opacity-90 transition'
                            >
                                View Cocktails
                            </a>
                        </div>
                    </div>
                </div>

            </section>
            <div className='video absolute inset-0'>
                <video
                    ref={videoRef}
                    src='/videos/output.mp4'
                    muted
                    playsInline
                    preload='auto'
                />

            </div>
        </>
    )
}

export default Hero