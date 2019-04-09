import { Dimensions} from 'react-native';

// 디바이스 스크린 사이즈 구하기
const { width, height} = Dimensions.get("screen");

export default {
    width,
    height
};