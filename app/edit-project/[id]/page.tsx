import { redirect } from 'next/navigation';

import { getCurrentUser } from '@/lib/session';
import Modal from '@/components/Modal';
import ProjectForm from '@/components/ProjectForm';
import { getProjectDetails } from '@/lib/action';
import { ProjectInterface } from '@/common.types';

const EditProject = async ({ params: { id } }: { params: { id: string } }) => {
  const session = await getCurrentUser();

  if (!session?.user) {
    redirect('/');
  }


    const result = await getProjectDetails(id) as {
      project?: ProjectInterface;
    };
  }

    return (
      <Modal>
        <h3 className="modal-head-text">Edit Project</h3>

        {/* Pass the project details to the ProjectForm */}
        <ProjectForm type="edit" session={session} project={result?.project} />
      </Modal>
    );
    }

export default EditProject;
