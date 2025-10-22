import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "../../style/layout.css"

const DefaultLayout = ({ children }) => {
  return (
    <div className='grid-container'>
      <header className="header">
        <Header />
      </header>
      <main className="main">
        {children}
      </main>
      <footer className="footer">
        <Footer />
      </footer>
    </div>
  )
}

export default DefaultLayout;
