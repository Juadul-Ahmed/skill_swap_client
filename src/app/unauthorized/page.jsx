import Link from 'next/link';

const UnauthorizedPage = () => {
    return (
        <div className="min-h-screen bg-[#070709] text-white flex items-center justify-center">
            <div className="fixed top-0 left-1/4 w-[500px] h-[400px] bg-red-500/4 blur-[180px] rounded-full pointer-events-none" />

            <div className="max-w-md w-full bg-[#0E0E12]/90 border border-zinc-900/80 rounded-3xl p-10 text-center relative z-10">
                
                <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                    </svg>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-[10px] font-black text-red-400 uppercase tracking-widest mb-4">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-400 animate-pulse" />
                    Access Denied
                </div>

                <h1 className="text-2xl font-black text-white mb-3">
                    Unauthorized
                </h1>

                <p className="text-zinc-400 text-sm leading-relaxed mb-8">
                    You don't have permission to access this page. Please make sure you're logged in with the correct account role.
                </p>

                <div className="flex flex-col gap-3">
                    <Link
                        href="/"
                        className="w-full block bg-gradient-to-r from-emerald-400 to-teal-400 text-black font-black text-xs uppercase tracking-wider rounded-xl py-3 text-center hover:brightness-110 transition-all duration-200"
                    >
                        Go to Home
                    </Link>
                    <Link
                        href="/login"
                        className="w-full block bg-zinc-900 border border-zinc-800 text-zinc-400 font-black text-xs uppercase tracking-wider rounded-xl py-3 text-center hover:border-zinc-600 hover:text-white transition-all duration-200"
                    >
                        Sign In
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default UnauthorizedPage;