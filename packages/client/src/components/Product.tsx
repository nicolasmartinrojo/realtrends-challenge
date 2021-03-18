import React from "react";
import {Image} from "@chakra-ui/image";
import {Box, Center, List, ListItem, Stack, Text} from "@chakra-ui/layout";
import {Skeleton} from "@chakra-ui/skeleton";
import styled from "@emotion/styled";
import {EditIcon} from "@chakra-ui/icons";

import IVote from "~/interfaces/IVote";
import {IProduct} from "~/interfaces/IProduct";

interface Props {
  product: IProduct;
  option: string;
  votes: IVote[];
  openModal: (arg0: string) => void;
}

const BackgroundBox = styled(Box)`
  transition: 1s all ease;
`;

const Product: React.FC<Props> = ({product, option, votes, openModal}) => {
  let percent;
  const hasVotes: boolean = votes.length > 0;

  if (hasVotes) {
    percent = (votes.filter((vote) => vote.vote === option).length * 100) / votes.length;
  } else {
    percent = 0;
  }

  const [imageLoad, setImageLoad] = React.useState<boolean>(false);

  return (
    <Box
      alignItems="center"
      borderRadius="sm"
      boxShadow="base"
      d="flex"
      flexDirection={"column"}
      p={4}
      pos="relative"
      w={300}
      zIndex="0"
    >
      <BackgroundBox
        border="1"
        bottom="0"
        hidden={!hasVotes}
        left="0"
        pos="absolute"
        right="0"
        style={{backgroundColor: `hsl(${percent},100%,50%)`}}
        top={`${100 - percent}%`}
        zIndex="-1"
      />
      <Box
        _hover={{
          background: "whiteAlpha.700",
          opacity: 1,
        }}
        alignItems="center"
        background="transparent"
        bottom="0"
        display="flex"
        justifyContent="center"
        left="0"
        opacity={0}
        pointerEvents={"auto"}
        pos="absolute"
        right="0"
        top="0"
        transition="0.4s ease all"
        onClick={() => {
          openModal(option);
        }}
      >
        <Text color="blackAlpha.700" fontSize="1.5rem">
          <EditIcon /> Edit Product
        </Text>
      </Box>
      <Image
        alt={product.title}
        fallback={
          <Stack>
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
          </Stack>
        }
        height={200}
        objectFit={"contain"}
        src={product.thumbnail}
        w={200}
        onLoad={() => {
          setImageLoad(true);
        }}
      />
      {imageLoad && (
        <Center>
          <Box>
            <Text align="center" bg="white" borderRadius="3" display="inline" mt="-4" px="2" py="1">
              {product.title}({percent.toFixed(2)} %)
            </Text>
            <Box maxHeight={200} mt={8} overflow={"auto"}>
              <List spacing={3}>
                {votes.map(
                  (vote, index) =>
                    vote.description && (
                      <ListItem key={index}>
                        <Text>
                          <b>{vote.user}</b> {vote.description}
                        </Text>
                      </ListItem>
                    ),
                )}
              </List>
            </Box>
          </Box>
        </Center>
      )}
    </Box>
  );
};

export default Product;
