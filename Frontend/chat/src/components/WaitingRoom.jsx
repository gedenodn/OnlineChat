import { Heading, Text, Input } from "@chakra-ui/react";

export const WaitingRoom = () => {
  return (
    <form className="max-w-sm w-full bg-white p-8 rounded shadow-lg">
      <Heading>Online chat</Heading>
      <div className="mb-4">
        <Text fontSize={"sm"}>Username</Text>
        <Input name="username" placeholder="Enter username" />
      </div>
      <div className="mb-4">
        <Text fontSize={"sm"}>Chat room</Text>
        <Input name="chatRoom" placeholder="Enter chat room" />
      </div>
    </form>
  );
};