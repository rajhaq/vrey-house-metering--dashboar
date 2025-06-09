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

export default function Guest({ children }: Props) {
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
                                <Link
                                    href="/register"
                                    className="btn btn-primary"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light pt-4">
                <main
                    className="card shadow-sm w-100"
                    style={{ maxWidth: '800px' }}
                >
                    <div className="card-body p-4">{children}</div>
                </main>
            </div>
        </div>
    );
}
