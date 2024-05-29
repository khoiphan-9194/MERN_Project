import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import React, { useEffect, useState, useRef, createContext, useContext } from "react";
import { useMutation } from '@apollo/client';
import { ADD_DONATION } from '../utils/mutations';
import { useLazyQuery } from '@apollo/client';
import { QUERY_SINGLE_EVENT_DETAIL } from '../utils/queries';
import { SUBMIT_DONATION } from '../utils/queries';




function DonationPayment({ eventId, children }) {



  const [formState, setFormState] = useState({ nameOfdonator: '', donateAmount: '', message: '' });
  // const [amountDonate,setAmount]=useState()
  //const[DonationDetail,setDonationDetail] = useState({ nameDonator: '', amountDetail:'' ,memoDetail:'' });

  const [getCheckout, { data }] = useLazyQuery(SUBMIT_DONATION);
  const [getEvent, { eventData }] = useLazyQuery(QUERY_SINGLE_EVENT_DETAIL);

  useEffect(() => {
    if (data) {
      window.location.assign(data.donationCheckout.session);
     
     console.log(data.donationCheckout.session)
    }
  }, [data]);




  const [addDonation, { error }] = useMutation(ADD_DONATION);



  const handlePayment = async (event) => {
    event.preventDefault();
    console.log("clicked")

    const amount = 150;
    const nameOfdonator = "heo"

    await getCheckout({
      variables: {
        nameOfdonator,
        amount
      },
    });
    // clear form values

  };



  const handleFormSubmit = async (event) => {
    event.preventDefault();


    const { data } = await getEvent({
      variables: {
        eventId
      },
    });

    console.log(data.event.eventName)
    console.log(formState.nameOfdonator)
    const nameOfdonator = formState.nameOfdonator;
    const amount = parseInt(formState.donateAmount);
    const eventName = data.event.eventName;
    const event_ID = data.event._id;







    try {

      const DonationData = {
        formState,
        event_ID
      }
  
      //here we save the item in the sessionStorage.
  sessionStorage.setItem("DonationData", JSON.stringify(DonationData));
    
        

      console.log(formState.nameOfdonator)
      //   const nameOfdonator =formState.nameOfdonator;
      //   const amount = parseInt(formState.donateAmount);



      await getCheckout({
        variables: {
          eventName,
          nameOfdonator,
          amount
       
        },
      });



      setFormState({
        nameOfdonator: '',
        donateAmount: '',
        message: ''
      }
      )





      // setDonationDetail({
      //   DonationDetail:
      //   {
      //     nameDonator: formState.nameOfdonator,
      //     amountDetail:formState.donateAmount,
      //     memoDetail:formState.message
      //   }  

      // });




      //     const donateAmount = parseInt(formState.donateAmount);
      // const { data } = await addDonation({
      //   variables: { eventId,
      //             ...formState,
      //               donateAmount
      //                },
      // });

      // console.log(eventId)
      // // console.log(typeof(donateAmount))
      // // console.log(data.addDonation.donateAmount);
      // // console.log(eventId)


      // // const amount = data.addDonation.donateAmount;
      // // const donatorName = data.addDonation.nameOfdonator;

      // // console.log(donatorName)
      // // console.log(amount);
      // // console.log(eventId)

      // await getCheckout({
      //     variables: { 
      //       nameOfdonator,
      //       amount 
      //     },
      //   });




      // setFormState({
      //   nameOfdonator: '',
      //   donateAmount:null,
      //   message:''}
      // )
      // setAmount(null);

      //  window.location.reload();
    } catch (e) {
      console.error(e);
    }
  };






  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });

  };

  return (
    <>
  
        <form onSubmit={handleFormSubmit}>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Donator Name"
              aria-label="nameOfdonator"
              aria-describedby="basic-addon2"
              type="text"
              name="nameOfdonator"
              value={formState.nameOfdonator}
              onChange={handleChange}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Amount"
              aria-label="donateAmount"
              aria-describedby="basic-addon2"
              type="number"
              step="any"
              name="donateAmount"
              value={formState.donateAmount}
              onChange={handleChange}
            />
          </InputGroup>
          <InputGroup>
            <InputGroup.Text>Message for coffee owner</InputGroup.Text>
            <Form.Control as="textarea" aria-label="Message"
              placeholder="Message"
              name="message"
              aria-describedby="basic-addon2"
              type="text"
              value={formState.message}
              onChange={handleChange} />
          </InputGroup>
          <br />
          <button
            className="btn btn-block btn-primary"
            style={{ cursor: 'pointer' }}
            type="submit"
          >
            Donation
          </button>
        </form>
    </>
  );
}

export default DonationPayment;



{/* <br/><br/>

<form onSubmit={handlePayment}>

<button
  className="btn btn-block btn-primary"
  style={{ cursor: 'pointer' }}
  type="submit"
>
  Test
</button>
</form> */}