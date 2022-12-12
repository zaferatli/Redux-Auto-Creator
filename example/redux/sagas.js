import {
  takeLatest,
  put
} from 'redux-saga/effects';

const apiUrl = '127.0.0.1';

function* handler() {
    yield takeLatest($.GET_SLIDER, FUNC_GET_SLIDER);
}

function* FUNC_GET_SLIDER(action) {
  try {
    yield put({
      type: $.GET_SLIDER_REQUEST,
    });
    const response = yield axios.get( apiUrl + '/slider');
    if (response.data.status == 0) {
      yield put({
        type: $.GET_SLIDER_REQUEST_FAILURE,
        ERROR: response.data.message,
      });
    } else {
      yield put({
        type: $.GET_SLIDER_REQUEST_SUCCESS,
        DATA: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: $.GET_SLIDER_REQUEST_FAILURE,
      ERROR: error,
    });
  } finally {
    yield put({
      type: $.GET_SLIDER_REQUEST_END,
    });
  }
}


export {handler};
