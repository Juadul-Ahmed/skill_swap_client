import React, { use } from 'react';
import ClientProfileForm from './ClientProfile';
import { getUserSession } from '@/lib/core/session';
import { getClientProfile } from '@/lib/api/clients';
import { redirect } from 'next/navigation';

const CLientProfilePage = async () => {
const user = await getUserSession();

if (!user) {
    redirect('/auth/signin');
  }

const clientProfile = await getClientProfile(user?.id)

  return (
    <div>
      <ClientProfileForm client={user} clientProfile={clientProfile}/>
    </div>
  );
};

export default CLientProfilePage;