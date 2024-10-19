"use client";
import React, { useEffect, useState } from 'react';

export default function NearestHospital() {
    const [userLocation, setUserLocation] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ latitude, longitude });
                    setLoading(false);
                },
                (error) => {
                    console.error('Error getting location:', error);
                    setLoading(false);
                }
            );
        } else {
            console.error('Geolocation is not supported by your browser.');
            setLoading(false);
        }
    }, []);

    return (
        <div className="my-3">
            {loading ? (
                <div className="flex justify-center h-screen items-center">
                    Loading...
                </div>
            ) : userLocation ? (
                <iframe
                    width="100%"
                    height="100%"
                    className="h-[90vh]"
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps/embed/v1/directions?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY}&origin=${userLocation.latitude},${userLocation.longitude}&destination=hospital near me`}
                ></iframe>
            ) : (
                <div className="flex justify-center h-screen items-center mb-12">
                    <p>Unable to fetch location. Please check your location settings and try again.</p>
                </div>
            )}
        </div>
    );
}
