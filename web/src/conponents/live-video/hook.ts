import { useEffect, useRef } from "react";

export default (
    source: string = '',
) => {
    const hlsRef = useRef<any>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleInitHls = () => {
        const Hls = (window as any).Hls;
        const video = videoRef.current;
        if (Hls.isSupported() && video) {
            const hls = new Hls();
            hlsRef.current = hls;
        }
    }
    const handleDestoryHls = () => {
        const hls = hlsRef.current;
        if (hls) {
            hls.stopLoad();
            hls.destroy();
            hlsRef.current = null;
        }
    }
    const handleUpdateSource = async () => {
        handleDestoryHls();
        if (!source) {
            return;
        }
        handleInitHls();
        const hls = hlsRef.current;
        const video = videoRef.current;
        if (!hls || !video) {
            return;
        }
        hls.loadSource(source);
        hls.attachMedia(video);
    }
    useEffect(() => {
        handleInitHls();
        return handleDestoryHls;
    }, []);
    useEffect(() => {
        handleUpdateSource();
    }, [source]);
    return {
        videoRef,
    };
}