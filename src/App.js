import React from 'react';
import {
  Routes, Route
} from "react-router-dom";
import './App.css';
import HomePage from './pages/homepage/homepage';
import HatsPage from './pages/hatspage/hatspage';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component"
import Header  from './components/header/header.component';
import { auth, db } from './firebase/firebase.utils';
import { onSnapshot, doc } from "firebase/firestore";

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      if (user) {
        onSnapshot(doc(db, `users/${user.uid}`), (doc) => {
          const snap = doc.data;
          const {id, ...props} = snap;
          this.setState({
            currentUser: {
              id,
              ...props
            }
          })
        });
        this.setState({currentUser: user});
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
      <Header currentUser={this.state.currentUser}/>
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/hats" element={<HatsPage />} />
      <Route path="/shop" element={<ShopPage />} />
      <Route path="/login" element={<SignInAndSignUpPage/>}/>
      <Route
      path="*"
      element={
        <main style={{ padding: "1rem" }}>
          <p>There's nothing here!</p>
        </main>
      }/>
      </Routes>
    </div>
    );
  }
}

export default App;
