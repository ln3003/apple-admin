import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hotel_id: "",
  room_id: "",
};

export const editSlice = createSlice({
  name: "edit",
  initialState,
  reducers: {
    setHotelId: (state, action) => {
      state.hotel_id = action.payload;
    },
    setRoomId: (state, action) => {
      state.room_id = action.payload;
    },
  },
});

export const { setHotelId, setRoomId } = editSlice.actions;

export default editSlice.reducer;
