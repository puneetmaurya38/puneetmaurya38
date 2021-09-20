const weatherInfo = (state = {}, action) => {
    switch (action.type) {
        case "weather_Info":
            return {
                temp: action.payload.temp,
                des: action.payload.des
            }
        default: return state;
    };
}
export default weatherInfo;