import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode, useState } from 'react';

export default function AuthenticatedLayout({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const user = usePage().props.auth.user;
    const [menuOpen, setMenuOpen] = useState(false);
    const current = route().current();

    return (
        <div className="d-flex min-vh-100 bg-light">
            {/* Sidebar */}
            <aside className="bg-white border-end" style={{ width: '220px' }}>
                <div className="p-3 border-bottom">
                    <Link
                        href="/"
                        className="navbar-brand d-flex align-items-center"
                    >
                        <ApplicationLogo style={{ height: '32px' }} />
                    </Link>
                </div>

                <div
                    className="nav  flex-column nav-pills px-3 pt-3"
                    role="tablist"
                    aria-orientation="vertical"
                >
                    <NavLink
                        href={route('dashboard')}
                        active={current === 'dashboard'}
                        className={`nav-link d-flex align-items-center ${
                            current === 'dashboard'
                                ? 'active text-white bg-primary'
                                : ''
                        }`}
                    >
                        <i className="bi bi-speedometer2 me-2" />
                        Dashboard
                    </NavLink>
                    <NavLink
                        href={route('houses')}
                        active={current === 'houses'}
                        className={`nav-link d-flex align-items-center ${
                            current === 'houses'
                                ? 'active text-white bg-primary'
                                : ''
                        }`}
                    >
                        <i className="bi bi-house-door me-2" />
                        Houses
                    </NavLink>
                    <NavLink
                        href={route('units')}
                        active={current === 'units'}
                        className={`nav-link d-flex align-items-center ${
                            current === 'units'
                                ? 'active text-white bg-primary'
                                : ''
                        }`}
                    >
                        <i className="bi bi-building me-2" />
                        Units
                    </NavLink>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-grow-1 d-flex flex-column">
                {/* Combined Navbar */}
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid ">
                        {/* Left: Page Header */}
                        <div className="h5">{header}</div>

                        {/* Right: User Dropdown */}
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button className="btn btn-link nav-link">
                                    {user.name} ▼
                                </button>
                            </Dropdown.Trigger>
                            <Dropdown.Content>
                                <Dropdown.Link href={route('profile.edit')}>
                                    Profile
                                </Dropdown.Link>
                                <Dropdown.Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                >
                                    Log Out
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </nav>

                {/* Main Page Content */}
                <main className="p-4 flex-grow-1">{children}</main>
            </div>
        </div>
    );
}
