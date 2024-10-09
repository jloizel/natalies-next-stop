import Header from '@/components/header/header';
import NavBar from '@/components/navbar/navbar';
import Link from 'next/link';

const Home = () => {
  return (
    <div>
      <Header/>
      <NavBar/>
      <h1>Welcome to Natalie's Travel Blog</h1>
      <h2>Continents</h2>
    </div>
  );
};

export default Home;
