"use client"
import Modal from "@/components/Modal"
import { redirect } from "next/navigation"
import ProjectForm from "@/components/ProjectForm"
import { getCurrentUser } from "@/lib/session"

const CreateProject = () =>{
    const session = await getCurrentUser();

    if(!session?.user) redirect('/')
    return(
        <Modal>
           <h3 className="modal-head-text">Create a new project</h3>
           <ProjectForm type='create' session={}/>
            </Modal>
    )
}
export default CreateProject