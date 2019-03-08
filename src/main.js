import React from 'react'
import Header from './components/header'
import MenuTabs from './components/tabs'
import Footer from './components/footer'
import "./index.css";

class Main extends React.Component {
  render() {
    return (<div>
              <Header />
              <MenuTabs />
              <Footer />
            </div>)
  }
}

export default Main;