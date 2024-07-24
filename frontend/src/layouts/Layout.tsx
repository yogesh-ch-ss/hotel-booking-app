// The main layout of the webpage

import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";

// Define children prop
// The Props interface defines a children prop of type React.ReactNode, which is a common type for the children prop in React components.
// The Layout component takes children as a prop and renders it inside a div.
interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Hero />
      <div className="container mx-auto py-10 flex-1">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
