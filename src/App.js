import { AddContact, EditContact, Contacts, Error } from "./containers";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SharedLayout } from "./containers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SharedLayout />}>
          <Route index element={<Contacts />}></Route>
          <Route path='/contacts' element={<Contacts />}></Route>
          <Route path='/contacts/new' element={<AddContact />}></Route>
          <Route path='/contacts/edit/:id' element={<EditContact />}></Route>
        </Route>
        <Route path='*' element={<Error />} />
      </Routes>
      <ToastContainer position='top-right' autoClose={1500} />
    </BrowserRouter>
  );
}

export default App;
