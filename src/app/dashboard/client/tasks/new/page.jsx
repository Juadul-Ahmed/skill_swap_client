import React from 'react';
import PostTaskForm from './PostTaskForm';
import { getLoggedInClientProfile } from '@/lib/api/clients';
import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';
import Link from 'next/link';

const PostTaskPage = async () => {
  const user = await getUserSession();

  if (user?.role === 'freelancer') {
    redirect('/unauthorized');
  }

  const client = await getLoggedInClientProfile();

  if (!client) {
    return (
      <div className="bg-black border border-zinc-800 rounded-2xl p-12 flex flex-col items-center justify-center text-center min-h-[400px]">
        <div className="text-emerald-500 text-xs font-mono uppercase tracking-widest mb-3">
          // PROFILE_REQUIRED
        </div>
        <h2 className="text-white text-lg font-semibold mb-2">
          Set up your profile to post tasks
        </h2>
        <p className="text-zinc-500 text-sm max-w-md mb-6">
          Your client profile hasn't been created yet. Set it up before posting tasks.
        </p>
        <Link
          href="/dashboard/client/profile"
          className="inline-flex items-center gap-2 bg-emerald-500 text-black font-medium text-sm px-5 py-2.5 rounded-lg hover:bg-emerald-400 transition-colors"
        >
          Set up profile <span aria-hidden="true">→</span>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <PostTaskForm client={client} />
    </div>
  );
};

export default PostTaskPage;