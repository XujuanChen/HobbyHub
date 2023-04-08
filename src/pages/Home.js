import supabase from '../config/supabaseClient'
import { useEffect, useState } from 'react'
import SmoothieCard from '../components/SmoothieCard'


const Home = () => {
  const [fetchError, setFetchError] = useState(null)
  const [smoothies, setSmoothies] = useState(null)
  const [orderBy, setOrderBy] = useState('created_at')
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  const handleDelete = (id) => {
    setSmoothies(prevSmoothies => {
      return prevSmoothies.filter(sm => sm.id !== id)
    })
  }

  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, error } = await supabase
        .from('recipes')
        .select()
        .order(orderBy, {ascending: false})
      
      if (error) {
        setFetchError('Could not fetch the smoothies')
        setSmoothies(null)
      }
      if (data) {
        setSmoothies(data)
        setFetchError(null)
      }
    }
    fetchSmoothies()
  }, [orderBy])

  const handleInputChange = (searchValue) => {
    setSearchInput(searchValue);
    if (smoothies) {
      let fdata = smoothies.filter(item=>{
        return (item.title.toLowerCase().includes(searchValue.toLowerCase()))
      })
      setFilteredResults(fdata)
    }
  };

  return (
    <div className="page home">
      {fetchError && (<p>{fetchError}</p>)}
      {smoothies && (
        <div className="smoothies">
          <div className="order-by">
            <p>Order by:</p>
            <button onClick={() => setOrderBy('created_at')}>Time Created</button>
            <button onClick={() => setOrderBy('title')}>Title</button>
            <button onClick={() => setOrderBy('rating')}>Rating</button>
            <input className="searchbar" type="text" placeholder='search' value={searchInput} onChange={ e => handleInputChange(e.target.value) } />
          </div>
          <div className="smoothie-grid">
            {
              filteredResults.length>0 
              ? 
              (filteredResults.map(smoothie=>(<SmoothieCard key={smoothie.id} smoothie={smoothie} onDelete={handleDelete} />))) 
              :
              (smoothies.map(smoothie => (<SmoothieCard key={smoothie.id} smoothie={smoothie} onDelete={handleDelete} />)))
            }
          </div>
        </div>
      )}
    </div>
  )
}

export default Home