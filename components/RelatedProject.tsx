// Import necessary modules and types
import { UserProfile, ProjectInterface } from "@/common.types";
import { getUserProjects } from "@/lib/action";
import Link from "next/link";
import Image from "next/image";

// Define the Props type
type Props = {
  userId: string;
  projectId: string;
};

// Define the RelatedProject component
const RelatedProject = async ({ userId, projectId }: Props) => {
  // Fetch user projects
  const result = (await getUserProjects(userId)) as {
    user?: UserProfile;
  };

  // Filter out the current project from the user's projects
  const filteredProjects = result?.user?.projects?.edges?.filter(
    ({ node }: { node: ProjectInterface }) => node?.id !== projectId
  );

  // If there are no related projects, return null
  if (!filteredProjects || filteredProjects.length === 0) return null;

  return (
    <section className="flex flex-col mt-32 w-full">
      <div className="flexBetween">
        {/* Title and View All link */}
        <p className="text-base font-bold">More by {result?.user?.name}</p>
        <Link href={`/profile/${result?.user?.id}`} passHref>
          <a className="text-primary-purple text-base">View All</a>
        </Link>
      </div>

      <div className="related_projects-grid">
        {/* Map through filtered projects and display project cards */}
        {filteredProjects?.map(({ node }: { node: ProjectInterface }) => (
          <div
            key={node?.id}
            className="flexCenter related_project-card drop-shadow-card"
          >
            <Link href={`/project/${node?.id}`} 
              className="flexCenter group relative w-full h-full">
                <Image
                  src={node?.image} 
                  width={414}
                  height={314}
                  className="w-full h-full object-cover rounded-2xl"
                  alt="Project image"
                />
             <div className="hidden group-hover:flex related_project-card_title">
                 <p className="w-full">{node?.title}</p>
           </div>
              
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RelatedProject;
