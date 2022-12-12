import * as $ from './actions';

const initialState = {
  GET_SLIDER: [],
  GET_SLIDER_REQUEST_STATUS: 0,
  GET_SLIDER_REQUEST_ERROR: false,

  //end
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

    
    // BUSINESS_PHONE_CHECK
    case $.GET_SLIDER_REQUEST: {
      return {
        ...state,
        GET_SLIDER_REQUEST_STATUS: 1,
      };
    }
    case $.GET_SLIDER_REQUEST_SUCCESS: {
      return {
        ...state,
        GET_SLIDER_REQUEST_STATUS: 2,
        GET_SLIDER: action.DATA,
      };
    }
    case $.GET_SLIDER_REQUEST_FAILURE: {
      return {
        ...state,
        GET_SLIDER_REQUEST_STATUS: 3,
        GET_SLIDER_REQUEST_ERROR: action.ERROR,
      };
    }
    case $.GET_SLIDER_REQUEST_END: {
      return {
        ...state,
        GET_SLIDER_REQUEST_STATUS: 0,
      };
    }
    
default:
      return state;
  }
};

export {reducer};
