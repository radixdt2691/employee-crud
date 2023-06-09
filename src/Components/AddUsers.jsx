import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import ".././css/style.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from 'yup' 

const AddUsers = () => {
  const Name = useRef("");
  const Email = useRef("");
  const Phone = useRef("");
  const Bio = useRef("");
  const Address = useRef("");
  const Zip = useRef("");
  const State = useRef("");
  const City = useRef("");
  const Website = useRef("");
  const Image = useRef("");
  
  // const [image, setImage] = useState(null);
  const [imageUrl,setImage] = useState(null);
  const [imageAlt,setAlt] = useState(null);
  const navigate = useNavigate();
  const male = useRef();
  const female = useRef();


  const algorithm = [
    {
      value: "Gujarat",
      label: "Gujarat",
    },
    {
      value: "Tamilnadu",
      label: "Tamilnadu",
    },
    {
      value: "West Bengal",
      label: "West Bengal",
    },
    {
      value: "Punjab",
      label: "Punjab",
    },
    {
      value: "Himachal",
      label: "Himachal",
    },
  ];

  const guj = [
    {
      value: "Ahmedabad",
      label: "Ahmedabad",
    },
    {
      value: "Surat",
      label: "Surat",
    },
    {
      value: "Vadodara",
      label: "Vadodara",
    },
    {
      value: "Jamnagar",
      label: "Jamnagar",
    },
  ];

  const tn = [
    {
      value: "Banglore",
      label: "Banglore",
    },
    {
      value: "Hydrabad",
      label: "Hydrabad",
    },
    {
      value: "Chennai",
      label: "Chennai",
    },
  ];

  const wb = [
    {
      value: "Kolkata",
      label: "Kolkata",
    },
    {
      value: "Bengal",
      label: "Bengal",
    },
  ];

  const pb = [
    {
      value: "Ludhiana",
      label: "Ludhiana",
    },
    {
      value: "Amritsar",
      label: "Amritsar",
    },
  ];

  const himachal = [
    {
      value: "Manali",
      label: "Manali",
    },
    {
      value: "Uttrakhand",
      label: "Uttrakhand",
    },
  ];

  const [selected, setSelected] = useState("");
  const [phone, setPhone] = useState("");
  // const [selectedFile, setSelectedFile] = useState(null);
  let type = [];

  if (selected === "Gujarat") {
    type = guj;
  } else if (selected === "Tamilnadu") {
    type = tn;
  } else if (selected === "West Bengal") {
    type = wb;
  } else if (selected === "Punjab") {
    type = pb;
  } else if (selected === "Himachal") {
    type = himachal;
  }

  // const [file, setFile] = useState();
  //   function handleChange(e) {
  //       console.log(e.target.files);
  //       setFile(URL.createObjectURL(e.target.files[0]));
  //   }

  // const changeSelectOptionHandler = (event) => {
  //   setSelected(event.value);
  // };

  let handleOnChange = (value) => {
    setPhone(value);
  };

  let handleOnChangephone = (e) => {
    setPhone(e.target.value);
  };

  // const changeHandler = (value) => {
  //   setValue(value);
  // };

  const onImageChange = (event) => {

    const { files } = document.querySelector('input[type="file"]')
    const formData = new FormData();
    formData.append('file', files[0]);
    // replace this with your upload preset name
    formData.append('upload_preset', 'vownweha');
    formData.append('folder','user_profiles');
    const options = {
      method: 'POST',
      body: formData,
    };

     // replace cloudname with your Cloudinary cloud_name
     return fetch('https://api.Cloudinary.com/v1_1/drmykupvw/image/upload', options)
     .then(res => res.json())
     .then(res => {
       setImage((res.secure_url))
       setAlt((res.original_filename))
     })
     .catch(err => console.log(err));

  };

  // const { register } = useForm();

  const userSchema = yup.object().shape({
    Name: yup.string().required("This Feild is Required!!"),
    Email: yup.string().email("Please enter an valid email!!").required("This Feild is Required!!"),
    Phone: yup.string().required("This Feild is Required!!"),
    Bio: yup.string().required("This Feild is Required!!"),
    Address: yup.string().required("This Feild is Required!!"),
    zip: yup.string().min(6).max(6).required("This Feild is Required!!"),
    Website: yup.string().url("Please enter an valid URL!!").required("This Feild is Required!!")
  })

  async function validateForm() {
    var validation = {
      Name: Name.current.value,
      Email: Email.current.value,
      Phone: Phone.current.value,
      Bio: Bio.current.value,
      Address: Address.current.value,
      zip: Zip.current.value,
      Website: Website.current.value,
    };

    const isValid = await userSchema.isValid(validation)

    if (isValid) {
      alert("Form is Valid")
      addUserDetails();
      notify();
    } else {
      alert('Form is Invalid');
      navigate("/invalid");
      validate();
    }
  }

  const addUserDetails = () => {
    const selectedRadio = male.current.checked
      ? male.current.value
      : female.current.value;
    debugger;

    var payload = {
      Name: Name.current.value,
      Email: Email.current.value,
      Phone: Phone.current.value,
      Bio: Bio.current.value,
      Address: Address.current.value,
      zip: Zip.current.value,
      state: State.current.value,
      city: City.current.value,
      Gender: selectedRadio,
      Website: Website.current.value,
      imageUrl,
      imageAlt,
    };

    
    axios.post("http://localhost:5000/employee", payload).then(() => {});
    navigate("/all");

  };
  // console.log(image);
  const notify = () => {
    toast.success("Registered Successfully!!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const validate = () => {
    toast.error("Invaild Form Data!!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-center">Register Yourself</h1>
      <form
        method="post"
        className="col-12 col-lg-5 d-flex flex-column gap-3 justify-center mx-auto"
      >
        <div className="form-group">
          <label htmlFor="Image">Image</label>
          <input
            type="file"
            id="Image"
            className="form-control mb-3"
            onChange={onImageChange}
            ref={Image}
          />
          <img src={imageUrl} alt={imageAlt} className="col-5 rounded-2" />
        </div>
        <div className="form-group">
          <label htmlFor="Name">Name</label>
          <input type="text" className="form-control" id="Name" ref={Name} />
        </div>
        <div className="form-group">
          <label htmlFor="Email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="Email"
            placeholder="name@example.com"
            ref={Email}
            required
          />
        </div>
        <div className="form-group">
          <label id="number-label">
            Phone Number
          </label>
          <PhoneInput
            country={"in"}
            ref={Phone}
            value={phone}
            onChange={handleOnChange}
            required
          />
          <input
            style={{ display: "none" }}
            placeholder="Enter a Valid Phone Number"
            autoCorrect="off"
            id="multipleErrorInput4"
            name="multipleErrorInput4"
            ref={Phone}
            value={phone}
            onChange={handleOnChangephone}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Bio">Bio</label>
          <input type="text" className="form-control" id="Bio" ref={Bio} required />
        </div>
        <div className="form-group d-flex flex-column">
          <label htmlFor="Address">Address</label>
          <textarea
            className="form-control"
            name="address"
            id="Address"
            cols="30"
            rows="5"
            ref={Address}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <div className="d-flex flex-column flex-lg-row justify-content-center gap-3">
            <div className="col-12 col-lg-3">
              <label htmlFor="Zip">Zip-Code</label>
              <input
                type="text"
                className="form-control"
                id="Zip"
                ref={Zip}
                required
              />
            </div>
            <div className="col-12 col-lg-3">
              <label htmlFor="State">State</label>
              <select
                ref={State}
                value={algorithm.value}
                className="form-control"
                onChange={(e) => setSelected(e.target.value)}
                required
                id="State"
              >
                {algorithm.map(({ value, label }, index) => (
                  <option value={value}>{label}</option>
                ))}
              </select>
            </div>
            <div className="col-12 col-lg-3">
              <label htmlFor="City">City</label>
              {/* <Select options={type} ref={City}></Select> */}
              <select
                value={type.value}
                ref={City}
                className="form-control"
                required
                id="City"
              >
                {type.map(({ value, label }, index) => (
                  <option value={value}>{label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="form-group">
          <div className="d-flex flex-wrap flex-lg-nowrap justify-content-start justify-content-lg-center align-items-center gap-4">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
                value="Male"
                ref={male}
                required
              />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                Male
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                value="Female"
                ref={female}
                required
              />
              <label className="form-check-label" htmlFor="flexRadioDefault2">
                Female
              </label>
            </div>
            <div>
              <h3 className="d-none d-lg-block">|</h3>
            </div>
            <div className="col-12 col-lg-5 d-flex gap-2 align-items-center">
              <label htmlFor="Website">Website</label>
              <input
                type="text"
                className="form-control"
                id="Website"
                ref={Website}
                required
              />
            </div>
          </div>
        </div>

        {/* <div className="form-group col-10">
            <div className="d-flex gap-2 align-items-start justify-content-center">
                <label htmlFor="img">Image</label>
                <input type="file" id="img" accept="image/*" ref={Image} onChange={handleChange} />
            </div>
        </div> */}

        <button
          type="submit"
          className="form-control btn btn-primary"
          onClick={() => {
            validateForm();
          }}
        >
          Add Emp
        </button>
      </form>
    </div>
  );
};
export default AddUsers;
