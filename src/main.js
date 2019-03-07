import React from 'react'
import ReactDOM from 'react-dom'
import Header from './components/header'
import MenuTabs from './components/tabs'
import Content from './components/content'
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