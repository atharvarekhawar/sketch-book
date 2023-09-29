import { createSlice } from "@reduxjs/toolkit";
import { MENU_ITEMS } from "@/constants";

const initialState = {
  [MENU_ITEMS.PENCIL]: {
    color: "black",
    size: 5,
  },
  [MENU_ITEMS.ERASER]: {
    color: "white",
    size: 5,
  },
  [MENU_ITEMS.UNDO]: {},
  [MENU_ITEMS.REDO]: {},
  [MENU_ITEMS.DOWNLOAD]: {},
};

export const toolBoxSlice = createSlice({
  name: "toolBox",
  initialState,
  reducers: {
    changeColor : (state,value)=>{
        state[value.payload.item].color = value.payload.color;
    },
    changeBrushSize : (state,value)=>{
        state[value.payload.item].size = value.payload.size;
    }
  },
});

export const {changeColor,changeBrushSize} = toolBoxSlice.actions;

export default toolBoxSlice.reducer;
