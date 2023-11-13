import { useEffect, useState } from 'react'
import axios from 'axios'
import { Card, TextField, InputAdornment } from '@mui/material'
import './App.css'
import SearchIcon from '@mui/icons-material/Search';


const App = () => {
  const [data, setData] = useState([])
  const [searchText, setSearchText] = useState('')
  const [filterData, setFilterData] = useState([])
  useEffect(() => {
    fetchingData()
  }, [])

  const fetchingData = async () => {
    const response = await axios.get('https://fakestoreapi.com/products')
   
    setData(response.data)
    setFilterData(response.data)
    window.localStorage.setItem('products', JSON.stringify(response.data))

  }

  const handleChange =async (event) => {
    setSearchText(event.target.value)
    const filteredItems = data?.filter((each) => (each.title.toLowerCase().includes(event.target.value.toLowerCase())))
    setFilterData(filteredItems)
  }


  return (
    <>
      <section className='header'>
        <h1 className='logo'>E-Commerce</h1>
        <TextField
          id="standard-search"
          label="Search By Name"
          type="search"
          variant="outlined"
          size='small'
          value={searchText}
          onChange={handleChange}
          sx={{ marginRight: '20px' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </section>
      <section className='container'>
        {filterData?.map((eachObj) => (
          <Card key={eachObj.id} className='card'>
            <div className='card-content'>
              <img src={eachObj.image} alt={eachObj.title} />
              <p>{eachObj.title}</p>
              <span>${eachObj.price}</span>
              <p><a href='#'>Know more</a></p>
            </div>
            <div className='button-container'>
              <button>Add to Cart</button>
              <button>Add to Wishlist</button>
            </div>
          </Card>
        ))}
      </section>

    </>

  );
}

export default App