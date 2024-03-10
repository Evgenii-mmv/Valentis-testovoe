import { useEffect, useState } from 'react';
import Pagination from './components/Paginathions/Paginathions';
import OfferCard from './components/OfferCard/OfferCard';
import api from './utils/Api';

function App() {

  const [ids, setIds] = useState([]);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState(0);
  const [filterIds, setFilterIds] = ([]);
  const [filtredCards, setFiltredCards] = ([])
  const [field, setfield] = ([])

  // const [currentPage, setcurrentPage] = useState(1);
  // const [productPerPage] = useState(10);

  const formHandler = (e) => {
    setPrice(e.target.value)
    console.log(e.target.value)
  }

  const formSubmit = (e) => {
    e.preventDefault();
    console.log(price)
    api.getCardsWithFilter(price)
    .then((data) => {
      if (data) {
        console.log(data['result'])
        setFilterIds(unique(data['result']));
        api.getCards(filterIds).then((data) => {
          console.log('card')
          if(data) {
            setFiltredCards(data['result'])
            console.log(data['result'])
          }
        })
      }
      setLoading(false);
    })
    .catch((err) => console.log(err))
  }

  const unique = (idsDirty) => { //убираем повторяющиеся id
    const ClearIds = [];
    const idsSet = new Set(idsDirty);
    console.log(idsSet)
    idsSet.forEach((value) => ClearIds.push(value));
    console.log('uniq')
    return ClearIds;
}

  const onChange = (pagination) => {
    console.log(pagination)
     const items = api.getId(pagination)
     .then((data) => {
      if (data) {
        console.log(data['result'])
        setIds(unique(data['result']));
        api.getCards(ids).then((data) => {
          console.log('card')
          if(data) {
            setCards(data['result'])
            console.log(data['result'])
          }
        })
      }
      setLoading(false);
    })
    .catch((err) => console.log(err))

    console.log(items)
  }


  // useEffect(() => {

  //   setLoading(true);
  //   api.getId({offset: 0, limit: 50})
  //   .then((data) => {
  //     if (data) {
  //       console.log(data)
  //       setIds(data);

  //     }
  //     setLoading(false);
  //   })
  //   .catch((err) => console.log(err))

  // }, [])

  return (
    <>
    {/* {loading ? <h1> LOADING</h1>  } */}
    <h1>Here</h1>
    <div className='cards'>
    {cards.map(card => <OfferCard card={card} key={card.id} />)}
    </div>
    <Pagination onChange={onChange}/>
    <form onSubmit={formSubmit}>
      <h1>Price</h1>
      <input
        defaultValue={0}
        onChange={(e) => formHandler(e)}
        name='price'
        type='number'
        placeholder='Введите цену'
        value={price}>
      </input>
      <button type="submit" >Search</button>
    </form>
    </>
  );
}

export default App;
