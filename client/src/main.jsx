import ReactDOM from 'react-dom/client';
import App from './App';
import NavTabs from "./components/NavTabs";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Login from "./components/Login"
import Contact from "./components/Contact";
import Homepage from './components/Homepage';
import Upload from './components/Upload';
import Error from './components/Error';
import Signup from './components/Signup';
import DonationPayment from './components/DonationPayment';
import SingleEvent from './components/SingleEvent';
import SingleCoffeeHouse from './components/SingleCoffeeHouse'
import CreateCoffeeHouse from './components/CreateCoffeeHouse'
import { DateTime } from "./components/Date";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Profile from './components/Profile';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
// import StudentApp from './components/StudentApp';
// import StudentList from './components/StudentList';
import Success from './components/Success';






const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Homepage />,
        },

        {
          path: '/coffeehouses/:coffeeId',
          element: <SingleCoffeeHouse />,
        },

        {
          path: '/events/:eventId',
          element: <SingleEvent />,
        },

        {
          path:`/:eventName/:nameOfdonator/:amount/:CHECKOUT_SESSION_ID`,
          
          element: <Success />,
        },

        {
          path: '/Login',
          element: <Login />,
        },

        {
          path: '/Upload',
          element: <Upload />,
        },

        {
          path: '/me/:ownerId',
          element: <Profile />
        }, 

        {
          path: '/createCoffeehouse',
          element: <CreateCoffeeHouse />
        }, 
        
        // {
        //   path: '/stu',
        //   element: <StudentApp />
        // }, 

        {
          path: '/profiles/:profileId',
          element: <Profile />
        },
        
        {
          path: '/Signup',
          element: <Signup />,
        },
  
  
        {
          path: '/Contact',
          element: <Contact />,
        }

      ],
    },
  ]);
  
  ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
  );
  



//ReactDOM.createRoot(document.getElementById('root')).render(<App />);
