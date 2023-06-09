import React from "react";
import { useEffect, useState } from "react";
import { getallEmployees, deleteEmployee } from "../Service/api";
import { Link,useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import '../css/style.css';
import web from "../img/web.png"

export const AllUsers = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState([]);
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await getallEmployees();
    setUser(response.data);
  };

  const deleteData = async (id) => {
    await deleteEmployee(id);
    getUsers();
  };

  const notify = () => {
    toast.error("Deleted Successfully!!",{position:toast.POSITION.TOP_CENTER});
  };

  

  return (
    <>
      <div className="container mx-auto py-3">
        <div className="content-wrapper flex-lg-row flex-column">
          {user.map((data) => (
            <Flippy flipOnHover={false} flipOnClick={true} flipDirection="horizontal" className='card-wrapper col-lg-3 col-sm-12'>
              <FrontSide className='d-flex align-items-center gap-3 flex-column'>
                <img src={data.imageUrl} alt={data.imageAlt} className='rounded-circle image-gray' width="160" height="160"/>
                <p className="h4 name">{data.Name}</p>
                <p className="h6 bio">{data.Bio}</p>
                <p className="h4 phone">{data.Phone}</p>
                <p className="h5 email">{data.Email}</p>                
              </FrontSide>
              <BackSide className="d-flex flex-column gap-3">
                <p className="h6 bio text-center">{data.Address}</p>
                <div className="d-flex gap-2 justify-content-center align-items-center">
                  <p className="h5 phone">{data.state}</p>
                  <p className="h5 phone">|</p>
                  <p className="h5 phone">{data.city}</p>
                </div>
                <p className="h5 email text-center">{data.Gender}</p>
                <div className="d-flex gap-2 justify-content-center align-items-center">
                <img src={web} width="20" height="20" alt="" />
                <Link className="h6 web text-center mb-1" to={data.Website}>{data.Website}</Link>
                </div>
                <div className="d-flex gap-3 justify-content-center">
                <button
                  variant="contained"
                  color="secondary"
                  onClick={() => { deleteData(data.id); notify();}}
                  className='button btn-delete'
                >
                  Delete
                </button>
                <button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate(`/edit/${data.id}`)}
                  className='button btn-edit'
                >
                  Edit
                </button>
                </div>
              </BackSide>
            </Flippy>
          ))}
        </div>
        <ToastContainer/>
      </div>
    </>
  );
};
