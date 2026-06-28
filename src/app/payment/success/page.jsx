import { stripe } from '@/lib/stripe';
import { redirect } from 'next/navigation';
import Link from 'next/link';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const PaymentSuccessPage = async ({ searchParams }) => {
    const { session_id, proposalId, taskId, token } = await searchParams;

    if (!session_id) redirect('/dashboard/client/proposals');

    
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.status === 'open') redirect('/');

    if (session.status === 'complete') {
        const res = await fetch(`${baseUrl}/api/proposals/${proposalId}/accept`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { authorization: `Bearer ${token}` } : {}),
            },
        });
        const result = await res.json();
        console.log("accept result:", result);
    }

    return (
        <div className="min-h-screen bg-[#070709] text-white flex items-center justify-center">
            <div className="fixed top-0 left-1/4 w-[500px] h-[400px] bg-emerald-500/4 blur-[180px] rounded-full pointer-events-none" />
            <div className="max-w-md w-full bg-[#0E0E12]/90 border border-zinc-900/80 rounded-3xl p-10 text-center relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-4">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Payment Successful
                </div>
                <h1 className="text-2xl font-black text-white mb-3">Project Started!</h1>
                <p className="text-zinc-400 text-sm leading-relaxed mb-8">
                    Your payment was processed successfully. The freelancer has been notified and the task is now{' '}
                    <strong className="text-emerald-400">In Progress</strong>.
                </p>
                <Link
                    href="/dashboard/client/proposals"
                    className="w-full block bg-gradient-to-r from-emerald-400 to-teal-400 text-black font-black text-xs uppercase tracking-wider rounded-xl py-3 text-center hover:brightness-110 transition-all duration-200"
                >
                    View Proposals
                </Link>
            </div>
        </div>
    );
};

export default PaymentSuccessPage;