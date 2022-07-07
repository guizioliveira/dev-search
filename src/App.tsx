import { useState } from "react";
import { Card } from "./components/Card";
import { Header } from "./components/Header";
import { Modal } from "./components/Modal";
import { SearchBar } from "./components/SearchBar";

function App() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  return (
    <>
      <Header />
      <SearchBar />
      <Card />
      <Modal isModalOpen={isModalOpen} />
    </>
  );
}

export default App;
