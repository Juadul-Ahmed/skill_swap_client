import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#070709] text-white flex items-center justify-center px-4 relative overflow-hidden">

            {/* Ambient glows */}
            <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-emerald-500/5 blur-[160px] rounded-full pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-500/5 blur-[160px] rounded-full pointer-events-none" />

            <div className="max-w-md w-full text-center relative z-10">

                {/* Big gradient 404 */}
                <h1 className="text-7xl md:text-8xl font-black tracking-tight bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                    404
                </h1>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-6">
                    Page Not Found
                </div>

               
                <p className="text-zinc-400 text-sm leading-relaxed mb-10">
                    The page you're looking for doesn't exist, was moved, or never
                    made it past proposal stage. Let's get you back on track.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Link
                        href="/"
                        className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-black text-xs uppercase tracking-wider text-black bg-gradient-to-r from-emerald-400 to-cyan-400 hover:brightness-110 shadow-lg shadow-emerald-500/10 transition-all duration-200"
                    >
                        Back to Home
                    </Link>
                    <Link
                        href="/tasks"
                        className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-black text-xs uppercase tracking-wider text-white bg-white/5 border border-white/10 hover:bg-white/8 transition-all duration-200"
                    >
                        Browse Tasks
                    </Link>
                </div>
            </div>
        </div>
    );
}