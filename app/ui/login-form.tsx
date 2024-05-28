'use client';

import { lusitana } from '@/app/ui/fonts';
import { 
    AtSymbolIcon,
    KeyIcon,
    ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from './button';
import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '../lib/actions';

export default function LoginForm() {
    const [errorMessage, dispatch] = useFormState(authenticate, undefined);

    return(
        <form action={dispatch} className='space y-3'>
            <div className='flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8'>
                <h1 className={`${lusitana.className} mb-3 text-2xl`}>
                    Please log in to continue.
                </h1>
            </div>
        </form>
    )
}