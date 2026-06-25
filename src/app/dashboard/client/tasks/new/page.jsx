import React from 'react';
import PostTaskForm from './PostTaskForm';
import { getLoggedInClientProfile } from '@/lib/api/clients';

const PostTaskPage = async () => {
  const client = await getLoggedInClientProfile()
  return (
    <div>
      <PostTaskForm client={client} />
    </div>
  );
};

export default PostTaskPage;