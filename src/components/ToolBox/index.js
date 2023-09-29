import { useSelector } from "react-redux";
import styles from "./index.module.css";
import { COLORS, MENU_ITEMS } from "@/constants";
const Toolbox = () => {
  const activeMenuItem = useSelector((state) => state.menu.activeMenuItem);
  const updateBrushSize = (e) => {};
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
                className={`${styles.colorBox} w-5 h-5 cursor-pointer rounded-full`}
                style={{ backgroundColor: color }}
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
            min={1}
            max={10}
            step={1}
            onChange={updateBrushSize}
            className="cursor-pointer"
          />
        </div>
      </div>

    </div>
  );
};

export default Toolbox;
