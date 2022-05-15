import React from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { api } from "../utils/Api";
import * as auth from "../utils/auth";
import { currentUserContext } from "../contexts/CurrentUserContext";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import InfoToolTip from "./InfoTooltip";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeletePlacePopup from "./DeletePlacePopup";
import Login from "./Login";
import Register from "./Register";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false); /* profile-edit-popup */
  const [isCardDeletePopupOpen, setIsCardDeletePopupOpen] = React.useState(false); /* card-delete-popup */
  const [isNewAvatarPopupOpen, setIsNewAvatarPopupOpen] = React.useState(false); /* new-avatar-popup */
  const [isCardAddPopupOpen, setIsCardAddPopupOpen] = React.useState(false); /* card-add-popup */

  /* (loaders && other) */
  const [isEditProfilePopupLoading, setIsEditProfilePopupLoading] = React.useState(false);
  const [isCardDeletePopupLoading, setIsCardDeletePopupLoading] = React.useState(false);
  const [isNewAvatarPopupLoading, setIsNewAvatarPopupLoading] = React.useState(false);
  const [isCardAddPopupLoading, setIsCardAddPopupLoading] = React.useState(false);
  const [selectedCardToDelete, setSelectedCardToDelete] = React.useState("");
  /*_____________________*/

  /*_states_of_image|imagePopup______*/
  const [selectedCard, setSelectedCard] = React.useState({
    name: "",
    link: "",
  });
  const [isElementPopupOpen, setIsElementPopupOpen] = React.useState(false);
  /*---------------------------*/

  /* currentUser_state */
  const [currentUser, setCurrentUser] = React.useState({
    avatar: "",
    name: "",
    description: "",
    id: "",
  });
  /*---------------------------*/

  /*_state_of_loggedIn || currentEmail (user)______*/
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentEmail, setCurrentEmail] = React.useState("example@mail.com");
  /*---------------------------*/

  /* info-tool-tip */
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
  const [statusOfInfoToolTip, setStatusOfInfoToolTip] = React.useState(true);
  /*---------------------------*/

  /*_state_of_cardList______*/
  const [cards, setCards] = React.useState([]);
  /*---------------------------*/

  const navigate = useNavigate();

  React.useEffect(() => {
    if (localStorage.getItem("jwt")) {
      let token = localStorage.getItem("jwt");
      auth
        .checkToken(token)
        .then((info) => {
          if (info.data.email) {
            setCurrentEmail(info.data.email);
            setLoggedIn(true);
          } else {
            localStorage.clear(
              "jwt"
            ); /* защита уязвимости */
          }
        })
        .catch((err) => {
          showStatus(false);
          localStorage.clear("jwt");
          console.log(err);
        });
    }
    function close(e) {
      if (e.keyCode === 27) closeAllPopups();
    }
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  React.useEffect(() => {
    if(loggedIn){
      let token = localStorage.getItem("jwt");
      Promise.all([api.getInfoAboutUser(token), api.getInitialCards(token)])
      .then(([userData, cards]) => {
        setCurrentUser({
          ...currentUser,
          avatar: userData.data.avatar,
          name: userData.data.name,
          description: userData.data.about,
          id: userData.data._id,
        });
        setCards(cards.data);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [loggedIn]);

  /* functions_for_auth */
  function showStatus(status) {
    setStatusOfInfoToolTip(status);
    setIsInfoToolTipOpen(true); 
  }

  function handleAuthRegister(info) {
    auth
      .register(info.email, info.password)
      .then((res) => {
        if (res.email) {
          showStatus(true);
          navigate("/sign-in");
        } else {
          showStatus(false);
        }
      })
      .catch((err) => {
        showStatus(false);
        console.log(err);
      });
  }
  function handleAuthLogin(info) {
    auth
      .authorize(info.email, info.password)
      .then(() => {
        if (localStorage.getItem("jwt")) {
          let token = localStorage.getItem("jwt");
          auth
            .checkToken(token)
            .then((info) => {
              setCurrentEmail(info.data.email);
              setLoggedIn(true);
            })
            .catch((err) => {
              showStatus(false);
              console.log(err);
            });
        } else {
          showStatus(false);
        }
      })
      .catch((err) => {
        showStatus(false);
        console.log(err);
      });
  }

  function onUserLeave() {
    setLoggedIn(false);
    localStorage.clear("jwt");
  }
  /*---------------------------*/

  /* functions_for_user-data-submits */
  function handleUpdateUserInfo(newUserInfo) {
    setIsEditProfilePopupLoading(true);
    let token = localStorage.getItem("jwt");
    api
      .setInfoAboutUser(newUserInfo, token)
      .then((res) => {
        setCurrentUser({
          ...currentUser,
          name: res.data.name,
          description: res.data.about,
        });
        setIsEditProfilePopupOpen(false);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsEditProfilePopupLoading(false);
      });
  }

  function handleUpdateUserAvatar(info) {
    setIsNewAvatarPopupLoading(true);
    let token = localStorage.getItem("jwt");
    api
      .uploadNewAvatar(info, token)
      .then((res) => {
        setCurrentUser({
          ...currentUser,
          avatar: res.data.avatar,
        });
        setIsNewAvatarPopupOpen(false);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsNewAvatarPopupLoading(false);
      });
  }
  /*---------------------------*/

  /* functions_for_cards && card-add-submit */
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser.id);
    let token = localStorage.getItem("jwt");
    api.changeLikeCardStatus(card._id, !isLiked, token).then((info) => {
      setCards((state) => state.map((c) => (c._id === card._id ? info.data : c)));
    });
  }

  function handleCardDelete(id) {
    setIsCardDeletePopupLoading(true);
    let token = localStorage.getItem("jwt");
    api
      .deleteCard(id, token)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== id));
        setIsCardDeletePopupOpen(false);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsCardDeletePopupLoading(false);
      });
  }

  function handleAddPlaceSubmit(card) {
    setIsCardAddPopupLoading(true);
    let token = localStorage.getItem("jwt");
    api
      .addNewCard(card, token)
      .then((newCard) => {
        setCards([newCard.data, ...cards]);
        setIsCardAddPopupOpen(false);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsCardAddPopupLoading(false);
      });
  }
  /*---------------------------*/

  /* popup_functions (open | close) */
  function closeAllPopups() {
    setIsInfoToolTipOpen(false);
    setStatusOfInfoToolTip(true);
    setIsEditProfilePopupOpen(false);
    setIsNewAvatarPopupOpen(false);
    setIsCardDeletePopupOpen(false);
    setIsCardAddPopupOpen(false);
    setIsElementPopupOpen(false);
    setSelectedCard({ name: "", link: "" });
  }

  function handleOpenProfilePopup() {
    setIsEditProfilePopupOpen(true);
  }

  function handleOpenCardAddPopup() {
    setIsCardAddPopupOpen(true);
  }

  function handleOpenNewAvatarPopup() {
    setIsNewAvatarPopupOpen(true);
  }

  /*---------------------------*/
  return (
    <div className="App page">
      <currentUserContext.Provider value={currentUser}>
        <Header onUserLeave={onUserLeave} email={currentEmail} />
        <Routes>
          <Route
            path="/main"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Main
                  onEditProfile={handleOpenProfilePopup}
                  onCardAddButton={handleOpenCardAddPopup}
                  onNewAvatar={handleOpenNewAvatarPopup}
                  onCardClick={(name, link) => {
                    setSelectedCard({ name: name, link: link });
                    setIsElementPopupOpen(true);
                  }}
                  onCardLike={(card) => {
                    handleCardLike(card);
                  }}
                  onCardDelete={(card) => {
                    setIsCardDeletePopupOpen(true);
                    setSelectedCardToDelete(card._id);
                  }}
                  cardList={cards}
                  loggedIn={loggedIn}
                />
                <Footer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sign-in"
            element={
              !loggedIn ? (
                <Login onAuthLogin={handleAuthLogin} />
              ) : (
                <Navigate to="/main" />
              )
            }
          />
          <Route
            path="/sign-up"
            element={
              !loggedIn ? (
                <Register onAuthRegister={handleAuthRegister} />
              ) : (
                <Navigate to="/main" />
              )
            }
          />
          <Route
            exact
            path="/"
            element={
              loggedIn ? <Navigate to="/main" /> : <Navigate to="/sign-in" />
            }
          />
          <Route
            exact
            path="*"
            element={
              loggedIn ? <Navigate to="/main" /> : <Navigate to="/sign-in" />
            }
          />
        </Routes>

        {/*___________overlays_____________*/}
        {/*.info-tool-tip (popup).*/}
        <InfoToolTip
          isOpen={isInfoToolTipOpen}
          onClose={closeAllPopups}
          status={statusOfInfoToolTip}
        />
        {/*.new-avatar-popup.*/}
        <EditAvatarPopup
          isOpen={isNewAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateUserAvatar={(info) => {
            handleUpdateUserAvatar(info);
          }}
          isLoading={isNewAvatarPopupLoading}
        />

        {/*.profile-edit-popup.*/}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          isLoading={isEditProfilePopupLoading}
          onUpdateUserInfo={(newInfo) => {
            handleUpdateUserInfo(newInfo);
          }}
        />

        {/*.card-add-popup.*/}
        <AddPlacePopup
          isOpen={isCardAddPopupOpen}
          onClose={closeAllPopups}
          isLoading={isCardAddPopupLoading}
          onAddPlace={(card) => {
            handleAddPlaceSubmit(card);
          }}
        />

        {/*.card-delete-popup.*/}
        <DeletePlacePopup
          isOpen={isCardDeletePopupOpen}
          onClose={closeAllPopups}
          isLoading={isCardDeletePopupLoading}
          onDeletePlace={() => {
            handleCardDelete(selectedCardToDelete);
          }}
        />

        {/*.element-popup.*/}
        <ImagePopup
          onClose={closeAllPopups}
          isOpen={isElementPopupOpen}
          card={selectedCard}
        />
      </currentUserContext.Provider>
      {/* весь код отформатирован при помощи prettier(vs-code) */}
    </div>
  );
}

export default App;
