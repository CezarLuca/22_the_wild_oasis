import { useEffect } from "react";

export function useOutsideClick(handler, ref, listenCapturing = true) {
    useEffect(() => {
        const handleClick = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                // console.log("click outside");
                handler();
            }
        };

        document.addEventListener("click", handleClick, listenCapturing);

        return () =>
            document.removeEventListener("click", handleClick, listenCapturing);
    }, [handler, ref, listenCapturing]);
}
