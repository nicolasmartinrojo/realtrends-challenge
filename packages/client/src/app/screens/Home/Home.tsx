import * as React from "react";
import SocketIO from "socket.io-client";
import {Box, Center, Container, Stack} from "@chakra-ui/layout";
import {Image} from "@chakra-ui/image";
import {Button} from "@chakra-ui/button";
import {useDisclosure} from "@chakra-ui/hooks";

import logo from "~/assets/logo.svg";
import Product from "~/components/Product";
import Search from "~/components/Search";
import {IProduct, chosenProduct} from "~/interfaces/IProduct";
import IVote from "~/interfaces/IVote";

const socket = SocketIO.io("http://localhost:5000");

interface socketIOMessage {
  votes: IVote[];
  products: chosenProduct[];
}
const Home: React.FC = () => {
  const [votes, setVotes] = React.useState<IVote[]>([]);
  const [products, setProducts] = React.useState<chosenProduct[]>([]);

  const {isOpen, onOpen, onClose} = useDisclosure();
  const [selectedOption, setSelectedOption] = React.useState<string>("");

  React.useEffect(() => {
    socket.on("message", (message: socketIOMessage) => {
      setVotes(message.votes);
      setProducts(message.products);
    });
  }, []);

  const resetVotes = () => {
    socket.emit("reset");
  };

  const openModal = (option: string) => {
    setSelectedOption(option);
    onOpen();
  };

  const closeModal = (product?: IProduct) => {
    if (product) {
      socket.emit("product", {...product, option: selectedOption});
    }
    onClose();
  };

  return (
    <Container>
      <Center>
        <Stack>
          <Search close={closeModal} isOpen={isOpen} />
          <Stack>
            <Box>
              <Center>
                <Image alt="RealTrends" src={logo} width={180} />
              </Center>
            </Box>
            <Box>
              <Stack direction={["column", "row"]}>
                {products.map((prod) => (
                  <Product
                    key={prod.id}
                    openModal={openModal}
                    option={prod.option}
                    product={prod}
                    votes={votes.filter((vote) => vote.vote === prod.option)}
                  />
                ))}
              </Stack>
            </Box>

            <Box>
              <Button onClick={() => resetVotes()}>Reset</Button>
            </Box>
          </Stack>
        </Stack>
      </Center>
    </Container>
  );
};

export default Home;
