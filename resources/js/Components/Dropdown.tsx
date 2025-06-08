import { InertiaLinkProps, Link } from '@inertiajs/react';
import {
    createContext,
    Dispatch,
    PropsWithChildren,
    SetStateAction,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react';

const DropDownContext = createContext<{
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    toggleOpen: () => void;
}>({
    open: false,
    setOpen: () => {},
    toggleOpen: () => {},
});

const Dropdown = ({ children }: PropsWithChildren) => {
    const [open, setOpen] = useState(false);
    const toggleOpen = () => setOpen((prev) => !prev);

    return (
        <DropDownContext.Provider value={{ open, setOpen, toggleOpen }}>
            <div className="position-relative d-inline-block">{children}</div>
        </DropDownContext.Provider>
    );
};

const Trigger = ({ children }: PropsWithChildren) => {
    const { toggleOpen } = useContext(DropDownContext);
    return <div onClick={toggleOpen} style={{ cursor: 'pointer' }}>{children}</div>;
};

const Content = ({ children }: PropsWithChildren) => {
    const { open, setOpen } = useContext(DropDownContext);
    const contentRef = useRef<HTMLDivElement>(null);

    // Close dropdown if clicked outside
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (contentRef.current && !contentRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };

        if (open) document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [open]);

    if (!open) return null;

    return (
        <div
            ref={contentRef}
            className="dropdown-menu show position-absolute end-0 mt-2 shadow-sm"
            style={{ zIndex: 1050 }}
        >
            {children}
        </div>
    );
};

const DropdownLink = ({
    className = '',
    children,
    ...props
}: InertiaLinkProps & { className?: string }) => {
    return (
        <Link
            {...props}
            className={`dropdown-item ${className}`}
        >
            {children}
        </Link>
    );
};

Dropdown.Trigger = Trigger;
Dropdown.Content = Content;
Dropdown.Link = DropdownLink;

export default Dropdown;
