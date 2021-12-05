import { SUCCESS_LOGIN } from "./actions";

const initialState = {
  isLoading: false,
  authenitcated:true,
  token: (null as unknown) as string,
  expires: (null as unknown) as Date,
};

const authentationReducer = (state = initialState, action: any) => {
  switch (action.type) {

    case SUCCESS_LOGIN:
        return { ...state, isLoading: false, authenitcated:true, token:'23232sdsd' };

    default:
      return state;
  }
};

export default authentationReducer;
