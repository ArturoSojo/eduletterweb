import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppProviders } from './providers/AppProviders';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Home from '@/pages/Home';
import Catalog from '@/pages/Catalog';
import BookDetails from '@/pages/BookDetails';
import Reader from '@/pages/Reader';
import Audio from '@/pages/Audio';
import Library from '@/pages/Library';
import Profile from '@/pages/Profile';
import Premium from '@/pages/Premium';
import NotFound from '@/pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <AppProviders>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/book/:id" element={<BookDetails />} />
          <Route path="/reader/:id" element={<Reader />} />
          <Route path="/audio/:id" element={<Audio />} />
          <Route path="/library" element={<Library />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/premium" element={<Premium />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </AppProviders>
    </BrowserRouter>
  );
}
