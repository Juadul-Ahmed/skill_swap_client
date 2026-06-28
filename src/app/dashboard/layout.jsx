import React from 'react';
import { DashboardSideBar } from '../components/DashboardComponents/DashboardSidebar';
export const dynamic = 'force-dynamic';
const DashboardLayout = ({children}) => {
  return (
    <div className='flex min-h-screen'>
    <DashboardSideBar/>
      <div className='flex-1'>{children}</div>
    </div>
  );
};

export default DashboardLayout;