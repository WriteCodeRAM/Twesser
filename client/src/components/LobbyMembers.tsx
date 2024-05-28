interface LobbyMemberProps {
  id: string;
  name: string;
}

interface LobbyMembersProps {
  members: LobbyMemberProps[];
}

const LobbyMembers = ({ members }: LobbyMembersProps) => {
  return (
    <div className="flex flex-wrap gap-4 w-3/4 justify-center">
      {members.map((member, index) => (
        <div
          className="text-white font-madimi text-center bg-black p-4 rounded w-48"
          key={index}
        >
          {member.name}
        </div>
      ))}
    </div>
  );
};
export default LobbyMembers;
