import { useState } from "react";
import { Card } from "./components/Card";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Modal } from "./components/Modal";
import { SearchBar } from "./components/SearchBar";
import { GithubUser, Repository } from "./types";

function App() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [githubUser, setGithubUser] = useState<GithubUser>({} as GithubUser);
  const [repositorySelected, setRepositorySelected] = useState<Repository>(
    {} as Repository
  );
  function handleRepositorySelected() {
    setIsModalOpen(true);
  }

  return (
    <>
      <Header />
      <SearchBar setGithubUser={setGithubUser} />
      {githubUser.login !== undefined ? (
        <Card
          setOpenModal={handleRepositorySelected}
          setRepository={setRepositorySelected}
          user={githubUser}
        />
      ) : (
        <Hero />
      )}
      <Modal
        username={githubUser.login}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        repositorySelected={repositorySelected}
      />
    </>
  );
}

export default App;
