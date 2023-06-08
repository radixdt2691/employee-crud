import axios from 'axios';


const url = " http://localhost:5000/employee";

export const getallEmployees = async (id) => {
    id = id || '';
    return await axios.get(`${url}/${id}`);
}

export const addEmployee = async (emp) => {
    return await axios.post(url,emp);
}

export const editEmployee = async (id, emp) => {
    return await axios.put(`${url}/${id}`,emp);
}


export const deleteEmployee = async (id) => {
    return await axios.delete(`${url}/${id}`);
}