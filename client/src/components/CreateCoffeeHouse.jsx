import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import { Link } from 'react-router-dom';
import { ADD_COFFEE_HOUSE } from '../utils/mutations';
import { useMutation } from '@apollo/client';
import { useState } from 'react';
import axios from 'axios';

import Auth from '../utils/auth';

const CreateCoffeeHouse = () => {
  const { profileId } = useParams();

  const [newPostImage, setNewPostImage] = useState(null);
  const [newPostImageName, setNewPostImageName] = useState('');
  const [addCoffeeHouse, { error, }] = useMutation(ADD_COFFEE_HOUSE);
  const [formState, setFormState] = useState({
    coffeeName: '',
    address: '',
    bio: '',
  });


  

  const handleChange = (event) => {
    const { name, value } = event.target;
    
    setFormState({
      ...formState,
      [name]: value,
    });

    
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (!file) return;
    setNewPostImage(file);
    setNewPostImageName(file.name);
    console.log(file.name);
  
      console.log(newPostImage)
      console.log(newPostImageName)

  };


  const upload =(e)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', newPostImage);
    axios.post('http://localhost:3001/upload', formData)
    .then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    });
  }
  



  const { loading, data } = useQuery(profileId ? QUERY_USER : QUERY_ME, {
    variables: { profileId: profileId },
  });
  console.log(data)


  const profile = data?.me || data?.profile || {};
  if (
    Auth.loggedIn() &&
    /* Run the getProfile() method to get access to the unencrypted token value in order to retrieve the user's username, and compare it to the userParam variable */
    Auth.getProfile().data._id === profileId
  ) {
    console.log(data.me.coffeehouse)
    return <Navigate to={`/me/${Auth.getProfile().data._id}`} />;

  }




  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(newPostImage);

    


   

    try {

      // const formData = new FormData();
      // formData.append('file',newPostImageName);
      // axios.post('http://localhost:3001/upload', formData)
      // .then((res) => {
      //   console.log(res);
      // }).catch((err) => {
      //   console.log(err);
      // });

      upload(event);

      const { data } = await addCoffeeHouse({
        variables: {
          ownerId: profile._id,
          ...formState,
          image: newPostImageName
        },
        
      });


      console.log(data)

      setFormState({
        coffeeName: '',
        address:'',
        bio:''}
      )

      document.location.href=`http://localhost:3000/me/${profile._id}`;

    } catch (e) {
      console.error(e);
    }
  };



  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profile?.userName) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!

      </h4>
    );
  }

  

  return (
    <div>
      <div className="flex-row justify-center mb-3">
        <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
          Viewing {`${profile.userName}'s`} profile.
          <br />
          Id: {`${profile._id}`}
        </h2>
      </div>

   


      <form onSubmit={handleFormSubmit}>
        <div data-mdb-input-init class="form-outline mb-4">
          <input type="text" class="form-control" name="coffeeName"
          value={formState.coffeeName} onChange={handleChange}/>
          <label class="form-label">Coffee House Name</label>
        </div>
        <div data-mdb-input-init class="form-outline mb-4">
          <input type="text" class="form-control" name="address"
          value={formState.address} onChange={handleChange}/>
          <label class="form-label">Address</label>
        </div>
        <div data-mdb-input-init class="form-outline mb-4">
          <textarea class="form-control" rows="4" name="bio" 
          value={formState.bio} onChange={handleChange}></textarea>
          <label class="form-label" for="form6Example7">Tell more about your coffee story</label>
        </div>
        <div data-mdb-input-init class="form-outline mb-4">
     

      <br /> <br />

      <input type="file" accept="image/*" onChange={handleImageChange} />
        {newPostImageName && (
          <div>
            <h6>Selected Image: {newPostImageName}</h6>
            <img
              style={{ width: '50%' }}
              src={URL.createObjectURL(newPostImage)}
              alt={newPostImageName}
            />
      
          </div>
        )}

        </div>
        
     
        <button data-mdb-ripple-init type="submit" class="btn btn-primary btn-block mb-4">Submit
         
        
              
             
        </button>
      </form>
     


        <br />





  
      <br />  <br />  <br />
    </div>

  );
};

export default CreateCoffeeHouse;

/*
        /*
  <div className="col-12 col-md-10 mb-5">
          <CoffeeList
            coffeehouses={ownerId.coffeehouses}
            title={`${user.userName}'s coffeehouses...`} 
          />
        </div>


            {Object.keys(data.me.coffeehouse).map(key => {
            return <li>{data.me.coffeehouse[key].coffeeName}</li>
          })}
*/




{/* <form onSubmit={upload}>
<input type="file" accept="image/*" onChange={handleImageChange} />
{newPostImageName && (
  <div>
    <h6>Selected Image: {newPostImageName}</h6>
    <img
      style={{ width: '50%' }}
      src={URL.createObjectURL(newPostImage)}
      alt={newPostImageName}
    />

  </div>
)}
<button type="submit">Upload</button>
</form> */}