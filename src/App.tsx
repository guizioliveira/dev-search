import { useEffect, useState } from "react";
import { Card } from "./components/Card";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Modal } from "./components/Modal";
import { SearchBar } from "./components/SearchBar";
import { useGithub } from "./hooks/useGithub";
import { Repository } from "./types";

function App() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { githubUser } = useGithub();
  const [repositorySelected, setRepositorySelected] = useState<Repository>(
    {} as Repository
  );

  function handleRepositorySelected() {
    setIsModalOpen(true);
  }

  return (
    <>
      <Header />
      <SearchBar />
      {Object.keys(githubUser).length > 0 ? (
        <Card
          setOpenModal={handleRepositorySelected}
          setRepository={setRepositorySelected}
        />
      ) : (
        <Hero />
      )}
      <Modal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        repositorySelected={repositorySelected}
      />
    </>
  );
}

export default App;
