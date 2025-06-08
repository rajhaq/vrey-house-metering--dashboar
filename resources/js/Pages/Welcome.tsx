import React from "react";
import Guest from "@/Layouts/GuestLayout";

export default function Home() {
    return (
        <Guest>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                }}
            >
                <h1>Welcome</h1>
                <p className="mt-4 text-center">
                    This app is for VREY, made with Laravel + React + Bootstrap
                </p>
            </div>
        </Guest>
    );
}
