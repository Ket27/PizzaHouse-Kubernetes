import React from 'react';
import {useState, useEffect} from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Button, Input, Stack, Text,useToast, SimpleGrid, Box } from '@chakra-ui/react'
import {NumberInput,NumberInputField,NumberInputStepper,NumberIncrementStepper,NumberDecrementStepper,} from '@chakra-ui/react'

const PizzaPage = () => {
    const [pizza, setPizza] = useState([]);
    const [number, setNumber] = useState(0);
    const [review, setReview] = useState("");
    const [mulReviews, setMulReviews] = useState([]);
    const {pizzaId} = useParams();
    const toast = useToast();


    const submitHandler = async() => {
      try{
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const {data} = axios.post(`/api/reviews/create/${pizzaId}`, {review, rating:number}, config);
        toast({
          title: "Thanks for the review",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        console.log({data});
      }
      catch(error){
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

    const onePizza = async(Id) => {
        try{
            const response = await axios.get(`/api/plans/getPizza/${Id}`);
            const res = await axios.get(`/api/reviews/get/${Id}`);
            console.log(res);
            console.log(response.data.data)
            setMulReviews(res.data.data);
            setPizza(response.data.data);
        }
        catch (error){
            console.log(error);
        }
    }

    useEffect(() => {
        onePizza(pizzaId); 
    },[pizzaId])

  return (
    <div className='pizzahome'>
      <div className="left">
        <div className='pizname'>
          <div className='pizzaimage'></div>
          <div className='nm'>{pizza.name}</div>
        </div>
        <div className='desc'>
          <Box maxH='75px' overflowY="scroll">
            <h5>{pizza.description}</h5>
          </Box>
        </div>
        <div className='pricerate'>
          <div className='price'>
          <Button colorScheme='teal' variant='outline'>
            Rs.{pizza.price}
          </Button>      
          </div>
          <h3>Ratings: {pizza.ratingsAverage}/5</h3>
        </div>
        <div className='review'>
          <div className='rate'>
            <Text as='cite' fontSize='xl'>How much do you rate this pizza?</Text>
            <NumberInput defaultValue={5} max={5} min={0} clampValueOnBlur={false} size='sm' maxW={20} border={5} value={number} onChange={(value) => setNumber(value)}>
              <NumberInputField/>
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </div>
          <div className='valueable'>
            <Stack spacing={3}>
            <Text as='cite' fontSize='2xl'>Your Review Will Be Valuable!</Text>
            <Input placeholder='Review' size='md' w="50%" value={review} onChange ={(event) => setReview(event.target.value)}/>
            <Button colorScheme='teal' variant='outline'w="50%" onClick={submitHandler}>
              Submit
            </Button>
            </Stack> 
          </div>
        </div>
      </div>
      <div className='right'>
        <Text as='cite' fontSize='2xl'>Reviews</Text>
        <Box maxH="690px" overflowY="scroll">
        <SimpleGrid columns={1} spacing={4} p={4}>
          {mulReviews.map((reviews) => {
            if (reviews.review.trim() !== '') {
              return (
                <Box key={review._id} p={4} borderWidth={2} borderRadius="md" bgColor="white" w={400} ml={4}>
                  <div key={review._id}>
                    <Text overflowWrap="break-word" className='view'>{reviews.review}</Text>
                  </div>
                </Box>
              );
            }
            return null;
          })}
          </SimpleGrid>
        </Box>
      </div>
    </div>
  )
}

export default PizzaPage
