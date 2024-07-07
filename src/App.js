import React, { useEffect, useState } from "react";
import './App.css';
import axios, { all } from "axios";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
const App=()=>{
  let [id, updateid] = useState();
  let [Fileimage, updateImage] = useState();
  let [data,updatprodata] = useState([]);
  let [product, updatproduct] = useState({id:'',name:'', price:'', category:'', company:''});

  useEffect(function(){
    async function allproducts(){
      var response = await axios.get('http://127.0.0.1:8000/api/products/');
      updatprodata(response.data)
    }
    allproducts()
  },[])

  function proform(e){
    updatproduct({...product, [e.target.name]:e.target.value})
  }
  
    function addupdateproduct(e){
      // e.preventDefault();
     if(product.id==='')
      {
        async function createprod(){
          var response = await axios.post('http://127.0.0.1:8000/api/products/',product);
          if(response.status===200)
            {
              alert("Products saved successfully!");
            }
        }
        createprod();
      }else{
        async function updateprod(){
          var response = await axios.put(`http://127.0.0.1:8000/api/products/${product.id}/`,product);
          if (response.status===200){
            alert("Product Updated Successfully!")
          }
        }
        updateprod();
      }
    }
    
    function getId(e)
    {
      var id = e.target.value;
      updateid(id);
    }

    

  return (
    <>
    <div className="container">
      Search <input type="number" name="id" onChange={getId}/> 
      <button onClick={()=>{
        async function search(){
          var response = await axios.get(`http://127.0.0.1:8000/api/products/${id}/`);
          updatprodata([response.data])
          console.log([response.data])
        }
        search();
      }}>Search</button>

      <h1>Add Products</h1>
      <form onSubmit={addupdateproduct}>
        Name <input type="text" name="name" value={product.name} onChange={proform}/> <br/><br/>
        Price <input type="number" name="price" value={product.price} onChange={proform} /> <br/><br/>
        Company <input type="text" name="company" value={product.company} onChange={proform}/> <br/><br/>
        Category <input type="text" name="category" value={product.category} onChange={proform}/> <br/><br/>
        <input type="submit" value="AddUpdate" />
      </form>
    </div>
    
      
        <h1 align="center">Products</h1>
      <table className="table">
          <thead className="table-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Company</th>
              <th scope="col">Category</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((v)=>{
              return(
                
                  <tr key={v.id}>
                      <th scope="row">{v.id}</th>
                      <td>{v.name}</td>
                      <td>{v.price}</td>
                      <td>{v.company}</td>
                      <td>{v.category}</td>
                      <td><img src={v.pic} width="100px" alt=""></img></td>
                      <td><button className="btn btn-danger" onClick={()=>{
                        async function deletepro(){
                           var id = v.id
                           var response = await axios.delete(`http://127.0.0.1:8000/api/products/${id}/`);
                           if (response.status===204){
                            alert("Product deleted successfully!");
                           }
                        }
                        deletepro();
                      }}>Delete</button></td>
                      <td><button onClick={()=>{
                        updatproduct({...product,name:v.name, price:v.price, category:v.category, company:v.company, id:v.id})
                      }}>Edit</button></td>
                  </tr>
              )
            })}
          </tbody>
        </table>
    </>
  );
}

export default App;
