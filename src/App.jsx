import { useEffect, useState } from 'react'
import axios from 'axios'
import { Card, TextField, Button } from '@mui/material'
import './App.css'
import loader from './assets/loader.gif'
import logo from './assets/e-cart.png'
import { fetchProducts, addProduct, removeProduct } from './Redux/store'
import { useDispatch, useSelector } from 'react-redux'



const App = () => {

  const [product, setProduct] = useState('')

  const dispatch = useDispatch()
  const data = useSelector((state) => state.products.items)

  useEffect(() => {
    const fetchingProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products')

        dispatch(fetchProducts(response.data))

      } catch (error) {

        console.log('error', error);

      }
    }
    fetchingProducts()
  }, [dispatch])

  const shoppingImages = [
    'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    'https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg',
    'https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg',
    'https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg',
  ];

  const handleAddProduct = () => {
    if (product !== '') {
      const randomPrice = (Math.random() * 100).toFixed(2);
      const randomIndex = Math.floor(Math.random() * shoppingImages.length);
      dispatch(addProduct({ id: Date.now(), title: product, image: shoppingImages[randomIndex], price: randomPrice }))
      setProduct('')
     
    }else{

    }

  }

  const handleDelete = (id) => {
    dispatch(removeProduct(id))
  }



  return (
    <>
      <section className='header'>
        <img className='logo' src={logo} />
        <div>
          <TextField
            id="standard-search"
            placeholder='Add Product'
            type="text"
            variant="outlined"
            style={{ backgroundColor: 'white', borderRadius: '5px' }}
            size='small'
            value={product}
            onChange={(event) => setProduct(event.target.value)}
            sx={{ marginRight: '20px' }}

          />
          <Button variant='contained' style={{ marginRight: '10px' }} onClick={handleAddProduct}>+Add</Button>

        </div>

      </section>

      <section className='container'>
        {data.length === 0 ? <img src={loader} style={{ marginTop: '200px', backgroundColor: 'blue' }} /> : data?.map((eachObj) => (
          <Card key={eachObj.id} className='card'>
            <div className='card-content'>
              <img src={eachObj.image} alt={eachObj.title} />
              <p>{eachObj.title}</p>
              <span>${eachObj.price}</span>
              <p><a href='#'>Know more</a></p>
            </div>
            <div className='button-container'>
              <button onClick={() => handleDelete(eachObj.id)} >Delete</button>
            </div>
          </Card>
        ))}
      </section>

    </>

  );
}

export default App