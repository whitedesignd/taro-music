import { GET_TAGS } from './action.js';
const INIT_STATE = {
    hotTags: wx.getStorageSync('hotTags') || null,
}
export default function rootReducer(state = INIT_STATE,action) {
    switch (action.type) {
        case GET_TAGS:
            return state.hotTags;
        default:
            return state;
    }
};
