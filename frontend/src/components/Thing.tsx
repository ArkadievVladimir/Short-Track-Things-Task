import '../scss/Thing.scss';
import editIcon from '../svg/edit.svg';
import saveIcon from '../svg/save.svg';
import deleteIcon from '../svg/delete.svg';
import { thingProp } from '../services/thingFetch';
import { paginationLimit } from '../services/thingFetch';
import { useState, useEffect, useRef } from 'react';
import { Button } from './Button';
import { formatDate } from '../utils/formatDate';
import { useDispatch, useSelector } from 'react-redux';
import { addNew, deleteByID, deleteEmpty, getLimited, updateByID } from '../store/things/actionCreators';
import { selectAllThings } from '../store/things/selectors';

function Thing({ thing }: { thing: thingProp }) {
  const things = useSelector(selectAllThings);
  const dispatch = useDispatch();
  const thingName = thing.name ? thing.name : '';
  const _id = thing._id;
  const skip = 0;
  const thingsCount = things.length;
  const thingEl = useRef<HTMLInputElement>(null);
  const [editableMode, setEditableMode] = useState<boolean>(false);
  const [blurTimeStamp, setBlurTimeStamp] = useState<number>(0);
  const [inputThingName, setInputThingName] = useState(thingName);
  const timeStamp = thing.createdAt ? `Created ${formatDate(thing.createdAt)} ago` : '';
  const thingClassName: string = editableMode ? 'Thing thing_edit-mod' : 'Thing';
  const iconMode: string = editableMode ? saveIcon : editIcon;
  const isEmptyThing: boolean = !thing.name;
  const editBtnConfig = {
    btnClass: 'edit-button',
    btnDescription: 'Edit thing',
    btnIconClass: 'edit-icon',
    onClickHandler: clickBtnEditThing,
    iconSrc: iconMode
  }
  const deleteBtnConfig = {
    btnClass: 'delete-button',
    btnDescription: 'Delete thing',
    btnIconClass: 'delete-icon',
    onClickHandler: clickBtnDelThing,
    iconSrc: deleteIcon
  }
  setFocus();

  useEffect(() => {
    if (isEmptyThing) {
      setEditableMode(true);
    }
  }, [isEmptyThing]);

  async function clickBtnDelThing() {
    const deleteThingByID = deleteByID(_id);
    const getLimitedThings = getLimited(skip, false);
    await deleteThingByID(dispatch);
    if (thingsCount <= paginationLimit) {
      getLimitedThings(dispatch);
    }
  }

  function clickBtnEditThing (e: React.MouseEvent): void {
    const timeBetweenBlurAndClick = e.nativeEvent.timeStamp - blurTimeStamp;
    if (timeBetweenBlurAndClick > 500) {
      editableModeToggle();
    }
  }

  function thingAction() {
    setEditableMode(false);
    if (!inputThingName) {
      updateThingEmptyInputMode();
    } else if (inputThingName !== thingName) {
      updateThing();
    }
  }

  function updateThingEmptyInputMode() {
    const deleteEmptyThing = deleteEmpty();
    if (thingName) {
      setInputThingName(thingName);
    } else {
      deleteEmptyThing(dispatch);
    }
  }

  function updateThing() {
    const deleteEmptyThing = deleteEmpty();
    const addNewThing = addNew(inputThingName);
    if (isEmptyThing) {
      deleteEmptyThing(dispatch);
      addNewThing(dispatch);
    } else {
      const newThing = { name: inputThingName };
      const updateThingByID = updateByID({ _id, newThing });
      updateThingByID(dispatch);
    }
  }
  
  function editableModeToggle() {
    editableMode ? setEditableMode(false) : setEditableMode(true);
  }

  function setFocus() {
    const element: HTMLInputElement | null = thingEl.current;
    setTimeout(() => {
      if (element) {
        element!.focus();
      }
    }, 0);
  }
  
  const blurHandler = (e: React.FocusEvent): void => {
    setBlurTimeStamp(e.nativeEvent.timeStamp);
    thingAction();
  }

  const keyDownHandler = (e: React.KeyboardEvent): void => {
    if (e.key === 'Enter') {
      thingAction();
    }
  }

  return (
    <div className={thingClassName}>
      <input 
        className='Thing__name'
        type='text'
        ref={thingEl}
        onBlur={blurHandler}
        onKeyDown={keyDownHandler}
        disabled={!editableMode}
        value={inputThingName}
        placeholder='Leave a thing name..'
        onChange={e => setInputThingName(e.target.value)}
      />
      <div className='Thing__buttons'>
        <Button btnConfig={ editBtnConfig } />
        <Button btnConfig={ deleteBtnConfig } />
      </div>
      <span className='Thing_timeStamp'>{ timeStamp }</span>
    </div>
  );
}

export default Thing;
