import * as React from 'react';
import { useState } from 'react';
import { Button, useTheme, Modal, Center, Image, Flex, Heading, Box, Text } from "native-base";
import 'react-native-gesture-handler';
import data from '../openingDescriptions.json';

/* NICE TO HAVE:
1. figure out how to make buttons look selected or highlighted so choice is clear
2. hide opening options until player chooses a color
3. disable "START PLAYING" button until both choices are made */

const Practice = ({ navigation }) => {
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [showModal3, setShowModal3] = useState(false);
    const [colorChoice, setColorChoice] = useState();
    const [openingChoice, setOpening] = useState();
    const [text1, setText1] = useState(); 
    const [text2, setText2] = useState(); 
    const [text3, setText3] = useState(); 
    const [text4, setText4] = useState();
    const theme = useTheme();

    const pickColor = (color) => {
        setColorChoice(color);
        if (color === "black") {
            setText1("Queen's Gambit");
            setText2("Fried Liver"); 
            setText3("Ruy Lopez");
            setText4("Choose an Opening to Play Against:");
        }
        if (color === "white") {
            setText1("Sicilian Defense");
            setText2("French Defense"); 
            setText3("King's Indian Defense"); 
            setText4("Choose an Opening to Play:");
        }
        console.log(color)
        console.log(colorChoice)
};

    const pickOpening = (name) => {
            setOpening(name);
            setShowModal(false);
            setShowModal2(false);
            setShowModal3(false);
            console.log(name)
            console.log(openingChoice);
    };

    return (
        <Center>
            <Box h="100%" p={4} safeArea>
            <Box h="30%">
            <Heading>Choose a color:</Heading>
            <Flex direction="row" align="center" justify="space-evenly" h="70%" w="100%">
            <Button variant={'subtle'} onPress={() => pickColor("white")}><Image size="sm" source={require('../assets/wp.png')} alt={"white"} /></Button>
            <Button variant={'subtle'} onPress={() => pickColor("black")}><Image size="sm" source={require('../assets/bp.png')} alt={"black"} /></Button>
            </Flex>
            </Box>
            <Box h="50%">
            <Heading>Choose Opening to Play Against:</Heading>
            <Flex direction="column" align="center" justify="space-evenly" h="70%">
            {colorChoice && <Button onPress={() => setShowModal(true)}>{text1}</Button>}
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <Modal.Content maxWidth="400px">
                    <Modal.CloseButton />
                    <Modal.Header><Heading size={"md"}>{text1}</Heading></Modal.Header>
                    <Modal.Body>
                        <Text>{showModal && data[text1]["Summary"]}</Text>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button.Group space={2}>
                            <Button variant="unstyled" onPress={() => {setShowModal(false);}}>GO BACK</Button>
                            <Button onPress={() => {pickOpening(text1)}}>CHOOSE</Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
        
            {colorChoice && <Button onPress={() => setShowModal2(true)}>{text2}</Button>}
            <Modal isOpen={showModal2} onClose={() => setShowModal2(false)}>
                <Modal.Content maxWidth="400px">
                    <Modal.CloseButton />
                    <Modal.Header><Heading size={"md"}>{text2}</Heading></Modal.Header>
                    <Modal.Body>
                        <Text>{showModal2 && data[text2]["Summary"]}</Text>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button.Group space={2}>
                            <Button variant="unstyled" onPress={() => {setShowModal(false);}}>GO BACK</Button>
                            <Button onPress={() => {pickOpening(text2)}}>CHOOSE</Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>

            {colorChoice && <Button onPress={() => setShowModal3(true)}>{text3}</Button>}
            <Modal isOpen={showModal3} onClose={() => setShowModal3(false)}>
                <Modal.Content maxWidth="400px">
                    <Modal.CloseButton />
                    <Modal.Header><Heading size={"md"}>{text3}</Heading></Modal.Header>
                    <Modal.Body>
                        <Text>{showModal3 && data[text3]["Summary"]}</Text>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button.Group space={2}>
                            <Button variant="unstyled" onPress={() => {setShowModal(false);}}>GO BACK</Button>
                            <Button onPress={() => {pickOpening(text3)}}>CHOOSE</Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
            </Flex>
            </Box>
            <Flex direction="column" height="15%" align="center" justify="space-evenly">
            <Text>You're playing as {colorChoice}</Text>
            <Text>The opening is {openingChoice}</Text>
            <Button mt={2} onPress={() => navigation.navigate('Opening', {opening: openingChoice, color: colorChoice,})}>START PLAYING</Button>
            </Flex>
            </Box>
        </Center>
    )
};


export default Practice;