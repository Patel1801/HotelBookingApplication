  import Header from "../components/Header";
  import Hero from "../components/Hero";
  import SearchBar from "../components/SearchBar";
  import Footer from "../components/Footer";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="">
      <Header></Header>
      <Hero></Hero>
      <SearchBar></SearchBar>
      </div>
      <div className="">{children}</div>
      <Footer></Footer>
    </div>
  );
};

export default Layout;