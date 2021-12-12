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
import { signOut } from "firebase/auth";
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';

class App extends React.Component {

  unsubscribeFromAuth = null;
  logout = false;

  componentDidMount() {

    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      if (user) {
        onSnapshot(doc(db, `users/${user.uid}`), (doc) => {
          const snap = doc.data();
          setCurrentUser(snap);
        });
      }
      this.logout ? setCurrentUser(null) : setCurrentUser(user);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  userSignOut = async() => {
    signOut(auth).then(() => {
      this.logout = true;
    }).catch((error) => {
      alert("There was an error during the logout");
    });
  }

  render() {
    return (
      <div>
      <Header userSignOut={this.userSignOut}/>
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/hats" element={<HatsPage />} />
      <Route path="/shop" element={<ShopPage />} />
      <Route exact path="/login" element={<SignInAndSignUpPage/>}/>
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

const mapStateToProps = ({user}) => ({
  currentUser: user.curretUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
