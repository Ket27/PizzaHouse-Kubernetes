import React from 'react';
import {useState, useEffect} from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Button, Input, Stack, Text } from '@chakra-ui/react'
import {NumberInput,NumberInputField,NumberInputStepper,NumberIncrementStepper,NumberDecrementStepper,} from '@chakra-ui/react'

const PizzaPage = () => {
    const [pizza, setPizza] = useState([]);
    const [number, setNumber] = useState(0);
    const [review, setReview] = useState("");
    const {pizzaId} = useParams();

    const onePizza = async(Id) => {
        try{
            const response = await axios.get(`/api/plans/getPizza/${Id}`);
            console.log(response.data.data)
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
    <div className='home'>
      <div className='pizname'>
      <div className='pizzaimage'></div>
        {pizza.name}
      </div>
      <div className='desc'>
        <h5>{pizza.description}</h5>
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
        <Stack spacing={3}>
      <Text as='cite' fontSize='3xl'>Your Review Will Be Valuable!</Text>
        <Input placeholder='Review' size='md' w="50%" value={review} onChange ={(event) => setReview(event.target.value)}/>
        <Button colorScheme='teal' variant='outline'w="50%">
          Submit
        </Button>
        </Stack> 
      </div>
    </div>
  )
}

export default PizzaPage
