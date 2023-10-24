import { useState } from 'react'
import {
  Header,
  Hero,
  Modal,
  SearchBar,
  ProfileCard,
  CardSkeleton,
  RequestError,
} from './components'
import { useGithub } from './hooks/useGithub'
import { Repository } from './types'

function App() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const { githubUser, loadingUser, userError } = useGithub()
  const [repositorySelected, setRepositorySelected] = useState<Repository>(
    {} as Repository,
  )

  function handleRepositorySelected() {
    setIsModalOpen(true)
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
        <RequestError />
      ) : (
        <Hero />
      )}
      <Modal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        repositorySelected={repositorySelected}
      />
    </>
  )
}

export default App
