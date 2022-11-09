import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import { AiOutlineInstagram, AiOutlineTwitter, AiOutlineYoutube } from 'react-icons/ai';

const Social = [
  {
    link: 'https://www.instagram.com/tinkerhub/',
    icon: AiOutlineInstagram,
  },
  {
    link: 'https://www.youtube.com/c/TinkerHubFoundation',
    icon: AiOutlineYoutube,
  },
  {
    link: 'https://twitter.com/TinkerHub',
    icon: AiOutlineTwitter,
  },
];

export const Footer = () => (
  <Box>
    <Flex justifyContent="space-between" flexDirection={{ base: 'column-reverse', md: 'row' }}>
      <Text
        color="rgba(177, 177, 177, 1)"
        mt="20px"
        maxW="900px"
        fontSize="18px"
        textAlign={{ base: 'center', md: 'initial' }}
      >
        We are a community of tinkerers, makers, policy geeks & students and are working towards
        mapping and empowering people who share a passion to innovate.
      </Text>
      <Flex minW="100px" justifyContent={{ base: 'space-around', md: 'space-between' }} mt="38px">
        {Social.map((el, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <a href={el.link} rel="noopener" key={index}>
            <Icon
              as={el.icon}
              fontSize="20px"
              color="rgba(177, 177, 177, 1)"
              _hover={{ cursor: 'pointer', color: 'grey' }}
            />
          </a>
        ))}
      </Flex>
    </Flex>
    <Flex
      justifyContent="space-between"
      mt="10px"
      flexDirection={{ base: 'column-reverse', md: 'row' }}
      alignItems="center"
    >
      <Flex>
        <Text
          color="rgba(177, 177, 177, 1)"
          _hover={{ cursor: 'pointer', color: 'grey' }}
          mt={{ base: '20px', md: '0px' }}
        >
          Made with 💙 by TinkerHub
        </Text>
      </Flex>
      <Flex justifyContent="space-between" minW="350px">
        <Text
          color="rgba(177, 177, 177, 1)"
          _hover={{ cursor: 'pointer', color: 'grey' }}
          onClick={() => window.location.reload()}
        >
          tinkerhub.org
        </Text>
        <a href="https://www.notion.so/Philosophy-9b1485d8c4b944e5b18777a25af02f89">
          <Text color="rgba(177, 177, 177, 1)" _hover={{ cursor: 'pointer', color: 'grey' }}>
            philosophy
          </Text>
        </a>
        <a href="https://tinkerhub-foundation.notion.site/Code-of-Conduct-25f2d4dd18bb4b93b5fbddd478cb7ee5">
          <Text color="rgba(177, 177, 177, 1)" _hover={{ cursor: 'pointer', color: 'grey' }}>
            code of conduct
          </Text>
        </a>
      </Flex>
    </Flex>
  </Box>
);
