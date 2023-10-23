import {Flex, Heading, Icon, Text, useToast} from "@chakra-ui/react";
import {MdOutlineContentCopy} from "react-icons/md";

export function CopyText({label, text}: {label: string, text: string}) {
    const toast = useToast();
    const copyMembershipId =  () =>
        toast.promise(window.navigator.clipboard.writeText(text), {
            loading: {title: 'Copying to clipboard'},
            success: {title: 'Copied to clipboard'},
            error: {title: 'Failed to copy to clipboard'},
        });

    return (
        <Flex mt={{ base: '14px', md: '0px' }} ml={{ sm: '0px', lg: '30px' }}>
            <Heading as="h2" fontSize={{ base: '16px', md: 'md' }} pl={{ base: '0px', md: '5' }}>
                <Text fontSize="14px" fontWeight="normal">
                    {label}
                </Text>
                {text}
            </Heading>

            <Icon
                as={MdOutlineContentCopy}
                onClick={copyMembershipId}
                w={4}
                h={4}
                ml={3}
                alignSelf="end"
                _hover={{ cursor: 'pointer', color: 'grey' }}
            />
        </Flex>
    );
}
