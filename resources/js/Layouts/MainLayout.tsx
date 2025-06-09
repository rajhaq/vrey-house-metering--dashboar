import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';

interface Props {
    children: React.ReactNode;
}

interface PageProps {
    auth: {
        user: {
            name: string;
            email: string;
        } | null;
    };
}

export default function MainLayout({ children }: Props) {
    const { auth } = usePage<PageProps>().props;

    return (
        <div className="min-vh-100">
            {/* Header */}
            <header className="shadow-sm bg-white">
                <div className="container d-flex align-items-center justify-content-between py-2">
                    {/* Left: Logo */}
                    <Link
                        href="/"
                        className="d-flex align-items-center text-decoration-none"
                    >
                        <ApplicationLogo className="text-muted" />
                    </Link>

                    {/* Right: Auth */}
                    <div>
                        {auth.user ? (
                            <form
                                method="post"
                                action="/logout"
                                className="m-0"
                            >
                                <button
                                    type="submit"
                                    className="btn btn-outline-danger btn-sm"
                                >
                                    Logout
                                </button>
                            </form>
                        ) : (
                            <>
                                <Link href="/login" className="btn">
                                    Login
                                </Link>
                                <Link href="/login" className="btn btn-primary">
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="py-4">
                <div className="container">{children}</div>
            </main>
        </div>
    );
}
