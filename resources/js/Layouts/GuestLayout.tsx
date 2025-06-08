import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light pt-4">
            
            <div className="mb-4">
                <Link href="/">
                    <ApplicationLogo  className="text-muted" />
                </Link>
            </div>

            <div className="card shadow-sm w-100" style={{ maxWidth: '400px' }}>
                <div className="card-body p-4">
                    {children}
                </div>
            </div>
        </div>
    );
}
