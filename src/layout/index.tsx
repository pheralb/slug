import Header from "@/components/header";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = (props: LayoutProps) => {
  return (
    <div className="container mx-auto px-4">
      <Header />
      {props.children}
    </div>
  );
};

export default Layout;
