import { Route, Routes } from "react-router-dom"
import Header from "./Newslists/Header"
import Newslist from "./Newslists/Newslist"

function App() {

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Newslist />} />
          <Route path="/favorite" element={<Newslist showLikedOnly={true}/>} />
        </Routes>
      </main >
    </>
  )
}

export default App
