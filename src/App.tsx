import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Strategy from './pages/Strategy.tsx';
import Charts from './pages/Charts.tsx';
import Histogram from './pages/Histogram.tsx';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Charts />}></Route>
          <Route path="/strategy" element={<Strategy />}></Route>
          <Route path="/histogram" element={<Histogram />}></Route>
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}





