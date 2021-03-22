import dotenv from 'dotenv';
import { useState, useEffect } from 'react';
import '../scss/App.scss';
import Header from './Header';
import Main from './Main';
import { thingProp } from '../services/thingFetch';
import { useDispatch } from 'react-redux';
import { getLimited } from '../store/things/actionCreators';
dotenv.config();

declare module 'react-redux' {
  interface DefaultRootState extends RootState {}
}

export interface RootState {
  data: {
    things: thingProp[];
  }
}

function App() {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function dataLoading() {
      await getLimited()(dispatch);
      setLoading(false);
    }
    dataLoading();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

return (
  <div className='app'>
    <Header />
    <Main loadingState={ isLoading } />
  </div>
);
}

export default App;
