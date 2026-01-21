import { notFound } from "next/navigation";
import ProjectDetailClient from "./ProjectDetailClient";
import { projectsData } from "@/lib/projects";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projectsData[slug];

  if (!project) return notFound();

  return <ProjectDetailClient project={project} />;
}
