import RoleDetailUI from "@/components/ui/role/RoleDetailUI";

export default async function Home(props: { params: Promise<{ id: string }>}) {
   const params = await props.params;

  return (
    <RoleDetailUI id={Number(params.id)} />
  )
}