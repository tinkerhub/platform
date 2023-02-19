import { Box, Flex, Icon, Text, Link, Image } from '@chakra-ui/react';
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
        fontSize={{ base: '15px', md: '18px' }}
        textAlign={{ base: 'center', md: 'initial' }}
      >
        We are a community of tinkerers, makers, policy geeks & students and are working towards
        mapping and empowering people who share a passion to innovate.
      </Text>
    </Flex>
    <Flex minW="100px" justifyContent={{ base: 'space-around', md: 'left' }} mt="20px">
      {Social.map((el, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Link href={el.link} rel="noopener" key={index}>
          <Icon
            as={el.icon}
            fontSize={{ base: '15px', md: '18px' }}
            color="rgba(177, 177, 177, 1)"
            _hover={{ cursor: 'pointer', color: 'grey' }}
            ml={{ base: '0px', md: '15px' }}
          />
        </Link>
      ))}
    </Flex>
    <Flex
      justifyContent="space-between"
      mt="10px"
      flexDirection={{ base: 'column-reverse', md: 'row' }}
      alignItems="center"
    >
      <Link href="https://www.netlify.com" mt="20px">
        <Image
          src="https://www.netlify.com/v3/img/components/netlify-color-accent.svg"
          alt="Deploys by Netlify"
        />
      </Link>
      <Flex>
        <Text
          color="rgba(177, 177, 177, 1)"
          _hover={{ cursor: 'pointer', color: 'grey' }}
          mt={{ base: '20px', md: '0px' }}
          fontSize={{ base: '15px', md: '18px' }}
          alignSelf="center"
        >
          Made with 💙 by TinkerHub
        </Text>
      </Flex>
      <Flex justifyContent="space-between" minW="350px">
        <Text
          color="rgba(177, 177, 177, 1)"
          _hover={{ cursor: 'pointer', color: 'grey' }}
          onClick={() => window.location.reload()}
          fontSize={{ base: '15px', md: '18px' }}
        >
          tinkerhub.org
        </Text>
        <a href="https://www.notion.so/Philosophy-9b1485d8c4b944e5b18777a25af02f89">
          <Text
            color="rgba(177, 177, 177, 1)"
            _hover={{ cursor: 'pointer', color: 'grey' }}
            fontSize={{ base: '15px', md: '18px' }}
          >
            philosophy
          </Text>
        </a>
        <a href="https://tinkerhub-foundation.notion.site/Code-of-Conduct-25f2d4dd18bb4b93b5fbddd478cb7ee5">
          <Text
            color="rgba(177, 177, 177, 1)"
            _hover={{ cursor: 'pointer', color: 'grey' }}
            fontSize={{ base: '15px', md: '18px' }}
          >
            code of conduct
          </Text>
        </a>
      </Flex>
    </Flex>
  </Box>
);
