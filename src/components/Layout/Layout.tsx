import React from "react";
import Nav from "../Nav/Nav";
import { Container } from "semantic-ui-react";
import Footer from "../Footer/Footer";

interface LayoutProps {
  children: React.ReactElement;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <section>
      <Nav />
      <Container className='min-height-100 mt-2'>{children}</Container>
      <Footer />
    </section>
  );
};

export default Layout;
