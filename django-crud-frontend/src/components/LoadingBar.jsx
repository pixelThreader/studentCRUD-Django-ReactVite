import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

const LoadingBar = () => {
    const location = useLocation();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const handleStart = () => {
            setLoading(true);
            NProgress.start();
        };

        const handleStop = () => {
            setLoading(false);
            NProgress.done();
        };

        const timeout = setTimeout(() => {
            handleStop();
        }, 1000);

        handleStart();

        return () => {
            clearTimeout(timeout);
            handleStop();
        };
    }, [location]);

    return null;
};

export default LoadingBar;
