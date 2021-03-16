import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { userContext } from '../../App';
import './Shipment.css';

const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = data => console.log(data);

  console.log(watch("example")); // watch input value by passing the name of it
  const [loggedInUser,setLoggedInUser] = useContext(userContext);

  return (

    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
   
      <input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })}  placeholder="Your Name"/>
      {errors.name && <span className="error">Name is required</span>}

      <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })}  placeholder="Your Email"/>
      {errors.name && <span className="error">Email is required</span>}

      <input name="address" ref={register({ required: true })}   placeholder="Your Address"/>
      {errors.name && <span className="error">TAddress is required</span>}

      <input name="phone" ref={register({ required: true })}  placeholder="Your Phone"/>
      {errors.name && <span className="error">Phone Number is required</span>}

      <input type="submit" />
    </form>
  );
};

export default Shipment;