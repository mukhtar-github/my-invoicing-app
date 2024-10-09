import { Box, Flex, Heading, Spacer, Button } from '@chakra-ui/react';
import { useAuth } from '../contexts/AuthContext';

export default function Header() {
  const { user } = useAuth();

  return (
    <Flex as="header" p={4} bg="teal.500" color="white">
      <Heading size="md">My Invoicing App</Heading>
      <Spacer />
      {user && <Button variant="ghost">Sign Out</Button>}
    </Flex>
  );
}