import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRef } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

export const EditUser = () => {
  const Name = useRef("");
  const Email = useRef("");
  const Phone = useRef("");
  const Bio = useRef("");
  const Address = useRef("");
  const Zip = useRef("");
  const State = useRef("");
  const City = useRef("");
  const male = useRef();
  const female = useRef();
  const Website = useRef("");
  const Image = useRef("");
  const [imageUrl, setImage] = useState(null);
  // const options = useMemo(() => countryList().getData(), []);
  // const [setValue] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/employee/${id}`).then((response) => {
      Name.current.value = response.data.Name;
      Email.current.value = response.data.Email;
      Phone.current.value = response.data.Phone;
      Bio.current.value = response.data.Bio;
      Address.current.value = response.data.Address;
      Zip.current.value = response.data.zip;
      State.current.value = response.data.state;
      City.current.value = response.data.city;
      Website.current.value = response.data.Website;
      localStorage.setItem("Gender", response.data.Gender);
      localStorage.setItem("image", response.data.imageUrl);
      localStorage.setItem("City", response.data.city);
    });
  });

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
  const SelectedCity = localStorage.getItem("City");

  // const [setPhone] = useState("");
  let type = [
    {
      value:SelectedCity,
      label:SelectedCity
    }
  ];

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

  // let handleOnChange = (value) => {
  //   setPhone(value);
  // };

  // let handleOnChangephone = (e) => {
  //   setPhone(e.target.value);
  // };

  // const changeHandler = (value) => {
  //   setValue(value);
  // };

  const updateEmployee = () => {
    const selectedRadio = male.current.checked
      ? male.current.value
      : female.current.value;

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
    };

    axios
      .put(`http://localhost:5000/employee/${id}`, payload)
      .then((response) => {});
    navigate("/all");
  };
  const notify = () => {
    toast.success("Updated Successfully!!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const onImageChange = (event) => {
    const { files } = document.querySelector('input[type="file"]');
    const formData = new FormData();
    formData.append("file", files[0]);
    // replace this with your upload preset name
    formData.append("upload_preset", "vownweha");
    formData.append("folder", "user_profiles");
    const options = {
      method: "POST",
      body: formData,
    };

    // replace cloudname with your Cloudinary cloud_name
    return fetch(
      "https://api.Cloudinary.com/v1_1/drmykupvw/image/upload",
      options
    )
      .then((res) => res.json())
      .then((res) => {
        setImage(res.secure_url);
      })
      .catch((err) => console.log(err));
  };

  const imgSrc = localStorage.getItem("image");
  const Gender = localStorage.getItem("Gender");

  return (
    <div className="container mx-auto">
      <h1 className="text-center">Edit</h1>
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
          <div className="d-flex gap-2">
            <div className="d-flex flex-column">
              <p className="h6 text-success">New</p>
              <img src={imageUrl} className="col-5 rounded-2" />
            </div>
            <div className="d-flex flex-column">
              <p className="h6 text-danger">Current</p>
              <img src={imgSrc} className="col-5 rounded-2" />
            </div>
          </div>
        </div>
        <div class="form-group">
          <label htmlFor="Name">Name</label>
          <input type="text" class="form-control" id="Name" ref={Name} />
        </div>
        <div class="form-group">
          <label htmlFor="Email">Email address</label>
          <input
            type="email"
            class="form-control"
            id="Email"
            placeholder="name@example.com"
            ref={Email}
          />
        </div>
        <div class="form-group">
          <label id="number-label" htmlFor="number">
            Phone Number
          </label>
          <input type="text" id="number" className="form-control" ref={Phone} />
        </div>
        <div class="form-group">
          <label htmlFor="Bio">Bio</label>
          <input type="text" class="form-control" id="Bio" ref={Bio} />
        </div>
        <div class="form-group d-flex flex-column">
          <label htmlFor="Address">Address</label>
          <textarea
            className="form-control"
            name="address"
            id="Address"
            cols="30"
            rows="5"
            ref={Address}
          ></textarea>
        </div>

        <div class="form-group">
          <div className="d-flex flex-column flex-lg-row justify-content-center gap-3">
            <div className="col-12 col-lg-3">
              <label htmlFor="Zip">Zip-Code</label>
              <input type="text" class="form-control" id="Zip" ref={Zip} />
            </div>
            <div className="col-12 col-lg-3">
              <label htmlFor="State">State</label>
              <select
                ref={State}
                value={algorithm.value}
                className="form-control"
                onChange={(e) => setSelected(e.target.value)}
              >
                {algorithm.map(({ value, label }, index) => (
                  <option value={value}>{label}</option>
                ))}
              </select>
            </div>
            <div className="col-12 col-lg-3">
              <label htmlFor="City">City</label>
              <select ref={City} value={type.value} className="form-control">
                {type.map(({ value, label }, index) => (
                  <option value={value}>{label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="form-group">
          <div className="d-flex flex-wrap flex-lg-nowrap justify-content-start justify-content-lg-center align-items-center gap-4">
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
                value="Male"
                checked={Gender === "Male"}
                ref={male}
              />
              <label class="form-check-label" for="flexRadioDefault1">
                Male
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                value="Female"
                checked={Gender === "Female"}
                ref={female}
              />
              <label class="form-check-label" for="flexRadioDefault2">
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
                class="form-control"
                id="Website"
                ref={Website}
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
          class="btn btn-primary"
          onClick={() => {
            updateEmployee();
            notify();
          }}
        >
          Edit Emp
        </button>
      </form>
    </div>
  );
};
