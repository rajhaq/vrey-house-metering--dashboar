import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="alert alert-success" role="alert">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="mt-4">
                {/* Email */}
                <div className="mb-3">
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="text-danger mt-1" />
                </div>

                {/* Password */}
                <div className="mb-3">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="text-danger mt-1" />
                </div>

                {/* Remember Me */}
                <div className="mb-3 form-check">
                    <Checkbox
                        name="remember"
                        checked={data.remember}
                        onChange={(e) => setData('remember', e.target.checked)}
                        className="form-check-input"
                    />
                    <label className="form-check-label ms-2 text-sm text-muted">
                        Remember me
                    </label>
                </div>

                {/* Buttons */}
                <div className="d-flex justify-content-between align-items-center">
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="text-decoration-none text-primary small"
                        >
                            Forgot your password?
                        </Link>
                    )}

                    <PrimaryButton
                        className="btn btn-primary"
                        disabled={processing}
                    >
                        Log in
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
