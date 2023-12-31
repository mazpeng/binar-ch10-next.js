"use client"

import {useRouter} from 'next/navigation'

import { Text, Container, Row, Button, Spacer, Card } from "@nextui-org/react";
import { Box } from "@/component/nextui/Box.jsx"
import background from './images/background.jpeg'
import background1 from './images/background1.jpg'

export default function ContentLandingPage() {
  const navigate = useRouter()
  
  return (
    <>
      <Container xl style={{
        backgroundImage: `url(${background.src})`,
        fontSize: '50px',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height: '100vh'
      }}>
        <Row>
          <Box css={{ px: "$12", mt: "$20", mb: "$10", pl: "$15", "@xsMax": { px: "$10" } }}>
            <Text h1 css={{
              textGradient: "45deg, $blue600 -20%, $pink600 50%",
            }}> Massive Choice of Games !</Text>
            <Text size={40} > Introducing GameStation</Text>
            <Text size={30} > One Stop Platform to Cloud Gaming.</Text>
            <Spacer y={0.5} />
            <Button css={{ mb: "$10" }} shadow bordered color="gradient" auto onClick={() => navigate.push("/register")}>
              Sign Up!
            </Button>
          </Box>
        </Row>
      </Container>

      <Container xl css={{
        backgroundColor: "white",
      }}>
        <Box css={{ px: "$12", mt: "$10", mb: "$10", "@xsMax": { px: "$10" } }}>

          <Row gap={1.3} justify="center" align="center">
            <Text css={{
              textGradient: "45deg, $yellow600 -20%, $red600 50%",
            }} size={50} > Featured Games</Text>
            <Spacer y={1} />

          </Row>
        </Box>
      </Container>

      <Container xl css={{
        backgroundImage: `url(${background1.src})`,
        fontSize: '50px',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height: '1000'
      }}>
        <Row justify="center" align="center">
          <Box css={{ px: "$12", mt: "$20", mb: "$20", pl: "$15", "@xsMax": { px: "$10" } }}>
            <Card css={{ $$cardColor: 'white' }}>
              <Card.Body>
                <Text h1>Rock Paper Scissors!</Text>
                <Text size={20} > intransitive hand game, usually played between two people, in which each player simultaneously forms one of three shapes with an outstretched hand. These shapes are "rock" (a closed fist), "paper" (a flat hand), and "scissors" (a fist with the index finger and middle finger extended, forming a V). The earliest form of "rock paper scissors"-style game originated in China and was subsequently imported into Japan, where it reached its modern standardized form, before being spread throughout the world in the early 20th century.</Text>
                <Spacer y={0.5} />
                <Button css={{ mb: "$10" }} shadow bordered color="gradient" auto onClick={() => navigate.push("/games")}>
                  Play Now!
                </Button>
              </Card.Body>
            </Card>
          </Box>
        </Row>
      </Container>

      <Container xl css={{
        backgroundColor: "white",
      }}>
        <Box css={{ px: "$12", mt: "$10", mb: "$10", "@xsMax": { px: "$10" } }}>

          <Row gap={1.3} justify="center" align="center">
            <Text css={{
              textGradient: "45deg, $yellow600 -20%, $red600 50%",
            }} size={50} > Contact Us</Text>
            <Spacer y={1} />

          </Row>
        </Box>
      </Container>

      <Container xl css={{
        backgroundColor: 'gray',
        fontSize: '50px',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height: '1000'
      }}>
        <Row justify="center" align="center">
          <Box css={{ px: "$12", mt: "$20", mb: "$20", "@xsMax": { px: "$10" } }}>
            <Card css={{ $$cardColor: 'black' }}>
              <Card.Body>
                <Text h6 size={30} color="white" css={{ m: 0 }}>
                  Email : GameStation@game.station.com
                </Text>
              </Card.Body>
            </Card>
          </Box>

        </Row>
      </Container>
    </>

  )
};
