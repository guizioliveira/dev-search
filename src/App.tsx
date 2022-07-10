import { useState } from "react";
import { ProfileCard } from "./components/ProfileCard/index";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Modal } from "./components/Modal";
import { SearchBar } from "./components/SearchBar";
import { UserNotFound } from "./components/UserNotFound";
import { useGithub } from "./hooks/useGithub";
import { Repository } from "./types";
import { CardSkeleton } from "./components/ProfileCard/CardSkeleton";

function App() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { githubUser, loadingUser, userError } = useGithub();
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
      {loadingUser ? (
        <CardSkeleton />
      ) : Object.keys(githubUser).length > 0 ? (
        <ProfileCard
          setOpenModal={handleRepositorySelected}
          setRepository={setRepositorySelected}
        />
      ) : userError !== undefined ? (
        <UserNotFound />
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
