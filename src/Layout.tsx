import { Navigate, Outlet } from 'react-router-dom';
import SideBar from './components/SideBar';
import { SearchModal } from './components/SearchModal';
import { useCurrentUserStore } from './modules/current-user.state';

const Layout = () => {
  const { currentUser } = useCurrentUserStore();

  if (currentUser == null) return <Navigate replace to="signin" />;

  return (
    <div className="flex h-full">
      <SideBar onSearchButtonClicked={() => {}} />
      <main className="h-full flex-1 overflow-y-auto">
        <Outlet />
        <SearchModal
          isOpen={false}
          notes={[]}
          onItemSelect={() => {}}
          onKeywordChanged={() => {}}
          onClose={() => {}}
        />
      </main>
    </div>
  );
};

export default Layout;
