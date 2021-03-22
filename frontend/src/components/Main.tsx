import '../scss/Main.scss';
import { ThingsArray } from './ThingsArray';
import { Loader } from './Loader';
import { useState } from 'react';
import { getLimited } from '../store/things/actionCreators';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllThings } from '../store/things/selectors';

function Main({ loadingState }: { loadingState: boolean }) {
  const things = useSelector(selectAllThings);
  const thingsCount = things.length;
  const [page, setPage] = useState(2);
  const nextPage = page + 1;
  const dispatch = useDispatch();
  const getLimitedThings = getLimited(thingsCount);
  
  const scrollEventHandler = async (e: any) => {
    const scroll = e.target.scrollTop + e.target.clientHeight;
    if (scroll >= e.target.scrollHeight) {
      setPage(nextPage);
      getLimitedThings(dispatch);
    }
  }

  return (
    <div className='Main'>
      {
        loadingState ? 
        (
          <Loader />
        ):(
          <div className='Main-container' onScroll={scrollEventHandler}>
            <ThingsArray />
          </div>
        )
      }
    </div>
  );
}

export default Main;
