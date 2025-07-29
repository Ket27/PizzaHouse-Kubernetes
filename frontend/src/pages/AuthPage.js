import React from 'react';
import { Container, Box, Text } from '@chakra-ui/react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Login from '../Components/Authorization/Login.js';
import SignUp from '../Components/Authorization/SignUp.js';

const AuthPage = () => {
    return(
        <div className="auth">
            <Container maxW='xl' centerContent>
                <Box display="flex" justifyContent="center" p={3} m="40px 0 15px 0" borderRadius="lg" borderWidth="1px" boxShadow='inner' rounded='md' bg='maroon'>
                <Text fontSize="4xl" fontFamily="Work sans" color="yellow">
            PIZZA HOUSE
            </Text>
                </Box>
                <Box display="flex" justifyContent="center" bg = "white" w = "100%" p={4} boxShadow='inner' rounded='md'>
                <Tabs variant='soft-rounded' colorScheme="green">
                    <TabList mb = '1em'>
                        <Tab width="225px">Login</Tab>
                        <Tab width = "225px">SignUp</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Login/>
                        </TabPanel>
                        <TabPanel>
                            <SignUp/>
                        </TabPanel>
                    </TabPanels>
                    </Tabs>
                </Box>
            </Container>
        </div>
    )
}

export default AuthPage;
