import { Outlet } from 'react-router-dom';
import SideNavBar from './SideNavBar';
import TopNavBar from './TopNavBar';

export default function DashboardLayout() {
  return (
    <div className="bg-surface font-body text-on-surface antialiased min-h-screen flex">
      <SideNavBar />
      <TopNavBar />
      
      {/* Khung chứa nội dung chính */}
      <main className="ml-64 pt-24 pb-12 px-8 flex-1 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}