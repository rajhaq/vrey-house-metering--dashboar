import { ImgHTMLAttributes } from 'react';

export default function ApplicationLogo(props: ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img
            {...props}
            src="https://cdn.prod.website-files.com/66cef0ce31125278a5caf835/66cef20011e3a9026200516f_VREY%20Logo.png"
            alt="VREY Logo"
            style={{ height: '28px', width: 'auto' }} 
        />
    );
}
