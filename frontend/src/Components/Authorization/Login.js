import React from "react"
import { VStack, FormControl, FormLabel, Input, InputGroup, InputRightElement, Button, useToast } from "@chakra-ui/react"
import { useState} from "react"
import axios from 'axios'
import {useNavigate} from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();

    const submitHandler = async() => {
        if (!email || !password) {
            toast({
              title: "Please Fill all the Feilds",
              status: "warning",
              duration: 5000,
              isClosable: true,
              position: "bottom",
            });
            return;
        }
        try {
            const config = {
              headers: {
                "Content-type": "application/json",
              },
            };
      
            const { data } = await axios.post("/api/auth/login",{ email, password },config);
            toast({
              title: "Login Successful",
              status: "success",
              duration: 5000,
              isClosable: true,
              position: "bottom",
            });
    
            localStorage.setItem("userInfo", JSON.stringify(data));
            navigate("/home");

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
            return;
          }
    }

    return(
        <VStack mt="-20px">
            <FormControl id = "email" isRequired>
                <FormLabel>Email ID</FormLabel>
                <Input value = {email} type="email" placeholder="Enter your mail id" onChange = {(event) => setEmail(event.target.value)}/>
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

            <Button width="100%" mt="15px" mb="-7px" colorScheme="blue" onClick={submitHandler}>
                Login
            </Button>
        </VStack>
    )
}

export default Login;