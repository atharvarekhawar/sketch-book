import { useSelector, useDispatch } from "react-redux";
import styles from "./index.module.css";
import { COLORS, MENU_ITEMS } from "@/constants";
import { changeBrushSize, changeColor } from "@/slice/toolBoxSlice";
import cx from "classnames";
import { socket } from "@/socket";

const Toolbox = () => {
  const dispatch = useDispatch();
  const activeMenuItem = useSelector((state) => state.menu.activeMenuItem);
  const activeColor = useSelector((state)=>state.toolBox[activeMenuItem].color);
  const activeSize = useSelector((state)=>state.toolBox[activeMenuItem].size);

  const updateBrushSize = (e) => {
    dispatch(changeBrushSize({ item: activeMenuItem, size: e.target.value }));
    socket.emit("changeConfig",{activeColor,size:e.target.value});
  };
  const updateColor = (color) => {
    dispatch(changeColor({ item: activeMenuItem, color: color }));
    socket.emit("changeConfig",{color:color,activeSize});
  };


  return (
    <div className={styles.toolBoxContainer}>
      {/* Stroke */}
      {activeMenuItem === MENU_ITEMS.PENCIL && (
        <div className={styles.toolItem}>
          <h4 className={styles.Text}>Stroke color</h4>
          <div className={styles.itemContainer}>
            {COLORS.map((color) => (
              <div
                key={color}
                className={cx(
                  `${styles.colorBox} w-5 h-5 cursor-pointer rounded-full`, { [styles.active]: activeColor === color }
                )}
                style={{ backgroundColor: color }}
                onClick={() => {
                  updateColor(color);
                }}
              ></div>
            ))}
          </div>
        </div>
      )}

      {/* Brush */}
      <div className={styles.toolItem}>
        <h4 className={styles.Text}>Brush size</h4>
        <div className={styles.itemContainer}>
          <input
            type="range"
            name="size"
            min={0}
            max={50}
            step={2}
            value={activeSize}
            onChange={updateBrushSize}
            className="cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default Toolbox;
