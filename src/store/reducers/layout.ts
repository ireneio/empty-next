import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LayoutState {
  snackbar: {
    title: string;
    text: string;
    show: boolean;
    timeoutId: NodeJS.Timeout | null;
  };
}

const initialState: LayoutState = {
  snackbar: {
    title: 'Alert',
    text: '',
    show: false,
    timeoutId: null,
  },
};

export const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    showSnackbar: (
      state,
      action: PayloadAction<{ text: string; title: string }>,
    ) => {
      // if (state.snackbar.timeoutId) {
      //   clearTimeout(state.snackbar.timeoutId);
      // }
      // const tid = setTimeout(() => {
      //   clearTimeout(tid);
      //   state.snackbar = {
      //     title: '',
      //     text: '',
      //     show: false,
      //     timeoutId: null,
      //   };
      // }, 2500);
      state.snackbar = {
        text: action.payload.text,
        title: action.payload.title,
        show: true,
        timeoutId: null,
        // timeoutId: tid,
      };
    },
    closeSnackbar: (state) => {
      // if (state.snackbar.timeoutId) {
      //   clearTimeout(state.snackbar.timeoutId);
      // }
      state.snackbar = {
        title: '',
        text: '',
        show: false,
        timeoutId: null,
      };
    },
  },
});

export const { showSnackbar, closeSnackbar } = layoutSlice.actions;

export default layoutSlice.reducer;
