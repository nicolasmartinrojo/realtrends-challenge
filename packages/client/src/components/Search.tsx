import {Button} from "@chakra-ui/button";
import {Image} from "@chakra-ui/image";
import {Input, InputGroup, InputRightElement} from "@chakra-ui/input";
import {Box, Grid, Text} from "@chakra-ui/layout";
import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from "@chakra-ui/react";

import {api} from "~/services";
import {IProduct} from "~/interfaces/IProduct";

interface Props {
  isOpen: boolean;
  close: (arg0?: IProduct) => void;
}
const Search: React.FC<Props> = ({isOpen, close}) => {
  const [value, setValue] = React.useState("");
  const handleChange = (event: any) => {
    setValue(event.target.value);
  };

  const checkEnter = (event: any) => {
    if (event.key === "Enter") {
      doSearch();
    }
  };
  const [elements, setElements] = React.useState<IProduct[]>([]);
  const doSearch = () => {
    api.queryProducts(value).then((res) => {
      setElements(res.results);
    });
  };
  const selectProduct = (prod?: IProduct) => {
    close(prod);
  };

  return (
    <>
      <Modal isOpen={isOpen} scrollBehavior="inside" size="xl" onClose={selectProduct}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <InputGroup size="md">
              <Input
                placeholder="Look for a product"
                value={value}
                onChange={handleChange}
                onKeyDown={checkEnter}
              />
              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  mr=".5rem"
                  size="sm"
                  onClick={() => {
                    doSearch();
                  }}
                >
                  Search
                </Button>
              </InputRightElement>
            </InputGroup>
          </ModalHeader>
          <ModalBody>
            <Grid gap={2} templateColumns="repeat(2, 1fr)">
              {elements.map((elem) => (
                <Box
                  key={elem.id}
                  _hover={{
                    background: "gray.200",
                  }}
                  alignItems="center"
                  border="1px"
                  borderColor="gray.200"
                  borderRadius="sm"
                  boxShadow="md"
                  d="flex"
                  flexDirection="column"
                  px="4"
                  py="2"
                  transition=".3s ease all"
                  onClick={() => {
                    selectProduct(elem);
                  }}
                >
                  <Image boxSize="100px" mb="2" objectFit="cover" src={elem.thumbnail} w={200} />
                  <Text>{elem.title}</Text>
                </Box>
              ))}
            </Grid>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={() => selectProduct()}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Search;
