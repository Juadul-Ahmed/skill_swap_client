import { getFreelancerProfile } from '@/lib/actions/freelancers';
import { getUserSession } from '@/lib/core/session';
import FreelancerProfileForm from './FreelancerProfileForm';


const FreelancerProfilePage = async () => {
  const user = await getUserSession();
  const freelancerProfile = await getFreelancerProfile(user?.id);

  return (
    <div>
      <FreelancerProfileForm user={user} freelancerProfile={freelancerProfile} />
    </div>
  );
};

export default FreelancerProfilePage;