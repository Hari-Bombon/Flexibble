"use Client"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"

const ProjectAction = ({ projectId}: {projectId : string}) => {
    const handleDelete = async() => {
        const [isDeleting, setIsDeleting] = useState<boolean>(false)
    const router = useRouter()

    
    const handleDeleteProject = async () => {
        setIsDeleting(true)
        
        const { token } = await fetchToken();

        try {
            await deleteProject(projectId, token);
            
            router.push("/");
        } catch (error) {
            console.error(error)
        } finally {
            setIsDeleting(false)
        }
    }
}
  return (
    <>
        <Link href={`/edit-project/${projectId}`} className="flexCenter edit-action_btn">
            <Image src="/pencile.svg" width={15} height={15} alt="edit"/>
        </Link>
        <button type="button" className={`flexCenter delete-action_btn ${isDeleting ? 'bg-gray' : 'primary-primary-purple'}`}>
            <Image src='/trash.svg' width={15} height={15} alt="delete"/>
        </button>
    </>
  )
}

export default ProjectAction

function fetchToken(): { token: any } | PromiseLike<{ token: any }> {
    throw new Error("Function not implemented.")
}
function deleteProject(projectId: string, token: any) {
    throw new Error("Function not implemented.")
}

