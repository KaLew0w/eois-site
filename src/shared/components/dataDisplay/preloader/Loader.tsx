import LogoAnim from '@/assets/videos/logo-anim.webm';
import './preloaderStyle.css';

export default function Loader() {
    return(
        <div id="preloader">
            <video id="preloader-video" autoPlay muted playsInline>
                <source src={LogoAnim} type="video/webm" />
            </video>
        </div>
    )
}