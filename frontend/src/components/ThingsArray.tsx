import Thing from './Thing';
import { thingProp } from '../services/thingFetch';
import { useSelector } from 'react-redux';
import { selectAllThings } from '../store/things/selectors';
import createRandomText from '../utils/createRandomText';

export const ThingsArray = () => {
  const things = useSelector(selectAllThings);
  const isThingsExist = !!things.length;
  return (
    isThingsExist ?
    (
      <>
        {
          things.map((item: thingProp) => 
            <Thing
              thing={ item }
              key={ item._id ? item._id : createRandomText() }
            />)
        }
      </>
    ):( 
      <div className='empty'>Empty</div>
    )
  )
}
