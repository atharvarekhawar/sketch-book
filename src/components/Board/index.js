import { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const Board = () => {
  const canvasRef = useRef(null);

  const activeMenuItem = useSelector((state) => state.menu.activeMenuItem);
  const activeColor = useSelector(
    (state) => state.toolBox[activeMenuItem].color
  );
  const activeSize = useSelector((state) => state.toolBox[activeMenuItem].size);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    //when mounting
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, []);

  return <canvas ref={canvasRef}></canvas>;
};

export default Board;
