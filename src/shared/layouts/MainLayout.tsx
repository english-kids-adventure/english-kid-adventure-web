import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-[#FDFCF0] flex flex-col">
      <Header />
      <main className="grow container mx-auto p-4 md:p-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
export default MainLayout;
