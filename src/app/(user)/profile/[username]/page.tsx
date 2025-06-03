interface IProps {
  params: Promise<{ username: string }>;
}

export default async function Profile(props: IProps) {
  const { username } = await props.params;
  return (
    <>
      <p>{username}</p>
    </>
  );
}
