import {useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faEraser,
  faRotateLeft,
  faRotateRight,
  faFileArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import cx from "classnames";
import styles from "./index.module.css";
import { MENU_ITEMS } from "@/constants";
import { menuItemClick, actionItemClick } from "@/slice/menuSlice";
import { socket } from "@/socket";

const Menu = () => {
  const dispatch = useDispatch();
  const activeMenuItem = useSelector((state) => state.menu.activeMenuItem);

  useEffect(() => {
    const handleSocketMenuItem = (itemName)=>{
      dispatch(menuItemClick(itemName));
    }

    const handleSocketActionItem = (itemName)=>{
      dispatch(actionItemClick(itemName));
    }
    
    socket.on('menuItem',handleSocketMenuItem);
    socket.on('actionItem',handleSocketActionItem);
    
    
    return () => {
      socket.off('menuItem',handleSocketMenuItem);
      socket.off('actionItem',handleSocketActionItem);
    }
  }, [dispatch])
  

  const handleMenuClick = (itemName) => {
    dispatch(menuItemClick(itemName));
    socket.emit('menuItem',itemName);
  };
  const handleActionItemClick = (itemName) => {
    dispatch(actionItemClick(itemName));
    socket.emit('actionItem',itemName);
  };

  return (
    <div className={styles.menuContainer}>
      <div
        className={cx(styles.iconWrapper, {
          [styles.active]: activeMenuItem === MENU_ITEMS.PENCIL,
        })}
        onClick={() => {
          handleMenuClick(MENU_ITEMS.PENCIL);
        }}
      >
        <FontAwesomeIcon icon={faPencil} className={styles.icon} />
      </div>
      <div
        className={cx(styles.iconWrapper, {
          [styles.active]: activeMenuItem === MENU_ITEMS.ERASER,
        })}
        onClick={() => {
          handleMenuClick(MENU_ITEMS.ERASER);
        }}
      >
        <FontAwesomeIcon icon={faEraser} className={styles.icon} />
      </div>
      <div
        className={styles.iconWrapper}
        onClick={() => {
          handleActionItemClick(MENU_ITEMS.UNDO);
        }}
      >
        <FontAwesomeIcon icon={faRotateLeft} className={styles.icon} />
      </div>
      <div
        className={styles.iconWrapper}
        onClick={() => {
          handleActionItemClick(MENU_ITEMS.REDO);
        }}
      >
        <FontAwesomeIcon icon={faRotateRight} className={styles.icon} />
      </div>
      <div
        className={styles.iconWrapper}
        onClick={() => {
          handleActionItemClick(MENU_ITEMS.DOWNLOAD);
        }}
      >
        <FontAwesomeIcon icon={faFileArrowDown} className={styles.icon} />
      </div>
    </div>
  );
};

export default Menu;
