"use client"
import Modal from "@/components/Modal"
import { useRouter } from "next/router"
import ProjectForm from "@/components/ProjectForm"
import { getCurrentUser } from "@/lib/session"

const CreateProject = () => {
  const router = useRouter()
  const session = getCurrentUser()

  if (!session?.user) {
    router.push('/')
    return null
  }

  return (
    <Modal>
      <h3 className="modal-head-text"> Create A New Project </h3>

      <ProjectForm type="create" session={session} />
    </Modal>
  )
}

export default CreateProject