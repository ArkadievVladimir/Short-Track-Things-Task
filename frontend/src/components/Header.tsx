import '../scss/Header.scss';
import randomIcon from '../svg/random.svg';
import addIcon from '../svg/add.svg';
import createRandomText from '../utils/createRandomText';
import { Button } from './Button';
import { useDispatch, useSelector } from 'react-redux';
import * as thing from '../store/things/actionCreators';
import { totalThingsCount } from '../store/things/selectors';

function Header() {
  const dispatch = useDispatch();
  const thingsCount = useSelector(totalThingsCount);
  const randomBtnConfig = {
    btnClass: 'random-button',
    btnDescription: 'Add random thing',
    btnIconClass: 'random-icon',
    onClickHandler: clickBtnAddRandomThing,
    iconSrc: randomIcon
  }
  const addNewBtnConfig = {
    btnClass: 'add-thing-button',
    btnDescription: 'Add new thing',
    btnIconClass: 'add-icon',
    onClickHandler: clickBtnAddNew,
    iconSrc: addIcon
  }

  async function clickBtnAddNew() {
    thing.addNewEmpty()(dispatch);
  }

  async function clickBtnAddRandomThing() {
    const randomName = createRandomText();
    thing.addNew(randomName)(dispatch);
  }

  return (
    <div className='header'>
      <h2>your<span>things</span></h2>
      <span className='things-counter'>Total count: { thingsCount }</span>
      <div className='control-buttons'>
        <Button btnConfig={ randomBtnConfig } />
      </div>
      <Button btnConfig={ addNewBtnConfig } />
    </div>
  );
}

export default Header;
