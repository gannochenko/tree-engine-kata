import { Typography, Container, Box, Button } from "@mui/material";
import { useRef } from "react";
import { sampleGame } from "./sampleGame";
import { GameEngine } from "../lib/tree/engine";

const Home = () => {
  const engineRef = useRef(new GameEngine(sampleGame));

  return (
    <Box>
      <Container>
        <Button onClick={() => engineRef.current.start()}>Press me</Button>
      </Container>
    </Box>
  );
};

export default Home;
