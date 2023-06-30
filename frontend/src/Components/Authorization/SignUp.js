import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { VStack,FormControl, Button, FormLabel, Input, InputGroup, InputRightElement, useToast } from '@chakra-ui/react'
import axios from 'axios'

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");
    const [show, setShow] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();

    const submitHandler = async() => {
        if(!name || !email || !password || !confirmpassword){
            toast({
                title: "Please Fill all the Feilds",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            })
            return;
        }
        if(password !== confirmpassword){
            toast({
                title: "Passwords Do Not Match",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }
        try{
            const config = {
                headers :{ 
                    "Content-type": "application/json",
                },
            }
            const {data} = await axios.post("/api/auth/signup",
                {
                    name, email, password
                }, config
            )
            toast({
                title: "Registration Successful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            localStorage.setItem("userInfo", JSON.stringify(data));
            navigate("/home")
        }
        catch (error) {
            toast({
              title: "Error Occured!",
              description: error.response.data.message,
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "bottom",
            });
          }
    }

    return(
        <VStack mt="-20px">
            <FormControl id="name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input value={name} type="text" placeholder="Enter your name" onChange={(event) => setName(event.target.value)}/>
            </FormControl>
            <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input value={email} type="email" placeholder="Enter your mail id" onChange={(event) => setEmail(event.target.value)}/>
            </FormControl>
            <FormControl id = "password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup size="md">
                    <Input value = {password} type={show? "text" : "password"} placeholder="Enter your password" onChange = {(event) => setPassword(event.target.value)}/>
                    <InputRightElement>
                        <Button h="1.75rem" size="md" mr="5" onClick={()=> setShow(!show)}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl id = "password" isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup size="md">
                    <Input value = {confirmpassword} type={show? "text" : "password"} placeholder="Confirm password" onChange = {(event) => setConfirmpassword(event.target.value)}/>
                    <InputRightElement>
                        <Button h="1.75rem" size="md" mr="5" onClick={()=> setShow(!show)}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <Button colorScheme="blue" width="100%" style={{ marginTop: 15 }} onClick = {submitHandler}>
            Sign Up
        </Button>
        </VStack>
    )
}

export default SignUp;