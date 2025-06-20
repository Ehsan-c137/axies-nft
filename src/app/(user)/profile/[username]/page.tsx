import { ProfileScreen } from "@/screens/user/profile/profile-screen";

interface IProps {
  params: Promise<{ username: string }>;
}

export default async function Profile(props: IProps) {
  const { username } = await props.params;
  return <ProfileScreen username={username} />;
}
